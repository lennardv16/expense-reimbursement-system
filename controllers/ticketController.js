const dao = require('../dao/ticket');
const uuid = require('uuid');

const createTicket = async (req, res) => {
  const username = req.username;
  const amount = req.body.amount;
  const description = req.body.description;

  if (!amount) {
    return res.status(400).json({ message: 'Please enter an amount' });
  } else if (!description) {
    return res.status(400).json({ message: 'Please enter a description' });
  }

  const ticketId = uuid.v4();

  try {
    await dao.createTicket({
      ticketId,
      username,
      amount,
      description,
      status: 'pending', // Default status
    });
    await dao.getTicketById(ticketId);
    return res.status(201).json({ message: 'Ticket created successfully', ticketId });
  } catch (err) {
    return res.status(500).json({ message: 'Error creating ticket', error: err.message });
  }
};

const getTickets = async (req, res) => {
  const username = req.username;
  const manager = req.role;

  if (!manager || manager !== 'manager') {
    return res.status(403).json({ message: 'You are not a manager!!!' });
  }
  try {
    const tickets = await dao.getPendingTickets();
    return res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving tickets.', error: err.message });
  }
};

const getPendingTickets = async (req, res) => {
  const manager = req.role;

  try {
    if (!manager || manager !== 'manager') {
      const pendingTickets = await dao.tickets.getPendingTickets();
      return res.status(200).json({ data: pendingTickets });
    }
  } catch (err) {
    console.error('Error fetching pending tickets:', err);
    return res.status(500).json({ message: 'Failed to retrieve tickets' });
  }
};

const getUserTickets = async (req, res) => {
  const username = req.username;

  try {
    const data = await dao.getUserTickets(username);
    return res.status(200).json(data.Items);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error retrieving tickets for ${username}.`, error: err.message });
  }
};

const getTicketById = async (req, res) => {
  const id = req.params.ticketId;
  try {
    const ticket = await dao.getTicketById(id);
    if (ticket.Item) {
      res.status(200).json(ticket.Item);
    } else {
      res.status(404).json({ message: 'Ticket not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving ticket.', error: err.message });
  }
};

const processTicket = async (req, res) => {
  const manager = req.role;
  const ticketId = req.params.ticketId;
  const newStatus = req.body.status;

  if (!manager || manager !== 'manager') {
    return res.status(403).json({ message: 'Only managers can process tickets' });
  }

  try {
    const ticketDetails = await dao.getTicketById(ticketId);

    if (!ticketDetails.Item || ticketDetails.Item.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending tickets can be processed' });
    }

    if (newStatus === 'approved') {
      await dao.approveTicket(ticketId);
      return res.status(200).json({ message: 'Ticket approved.' });
    } else if (newStatus === 'denied') {
      await dao.denyTicket(ticketId);
      return res.status(200).json({ message: 'Ticket denied.' });
    } else {
      return res.status(400).json({ message: 'Invalid action provided.' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error processing ticket' });
  }
};

const deleteTicket = async (req, res) => {
  const id = req.params.ticketId;
  try {
    await dao.deleteTicket(id);
    res.status(200).json({ message: 'Ticket deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting ticket.', error: err.message });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getPendingTickets,
  getUserTickets,
  getTicketById,
  processTicket,
  deleteTicket,
};
