const dao = require('../dao/ticket');
const uuid = require('uuid');

const createTicket = async (req, res) => {
  const username = req.username;
  const amount = req.body.amount;
  const description = req.body.description;

  if (!amount || !description) {
    return res.status(400).json({ message: 'Amount and Description required' });
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
    return res.status(201).json({ message: 'Ticket created successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error creating ticket', error: err.message });
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await dao.getTickets();
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving tickets.', error: err.message });
  }
};

const getPendingTickets = async (req, res) => {
  const status = req.query.status;

  if (status !== 'pending') {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const pendingTickets = await dao.getPendingTickets();
    return res.status(200).json({ data: pendingTickets });
  } catch (err) {
    console.error('Error fetching pending tickets:', err);
    return res.status(500).json({ message: 'Failed to retrieve tickets' });
  }
};

const getUserTickets = async (req, res) => {
  const username = req.params.username;

  try {
    const data = await dao.getUserTickets(username);
    res.status(200).json(data.Items);
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

const approveTicket = async (req, res) => {
  const id = req.params.ticketId;
  try {
    await dao.approveTicket(id);
    res.status(200).json({ message: 'Ticket approved successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving ticket.', error: err.message });
  }
};

const denyTicket = async (req, res) => {
  const id = req.params.ticketId;
  try {
    await dao.denyTicket(id);
    res.status(200).json({ message: 'Ticket denied.' });
  } catch (err) {
    res.status(500).json({ message: 'Error denying ticket.', error: err.message });
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
  approveTicket,
  denyTicket,
  deleteTicket,
};
