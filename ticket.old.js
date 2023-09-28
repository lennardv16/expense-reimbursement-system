const approveTicket = async (req, res) => {
  const ticketId = req.params.ticketId;
  const status = req.params.status;

  try {
    const ticketDetails = await dao.getTicketById(ticketId);

    if (!ticketDetails.Item || ticketDetails.Item.status !== 'pending') {
      return res.status(400).json({ message: 'Ticket is not pending' });
    }

    if (ticketDetails.Item.status === 'pending') {
      await dao.approveTicket(ticketId);
      return res.status(200).json({ message: 'Ticket approved.' });
    } else if (status === 'denied') {
      await dao.denyTicket(ticketId);
      return res.status(200).json({ message: 'Ticket denied.' });
    } else {
      return res.status(400).json({ message: 'Invalid action provided.' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error processing ticket' });
  }
};

const denyTicket = async (req, res) => {
  const ticketId = req.params.ticketId;
  const status = req.params.status;

  try {
    await dao.denyTicket(id);
    res.status(200).json({ message: 'Ticket denied.' });
  } catch (err) {
    res.status(500).json({ message: 'Error denying ticket.', error: err.message });
  }
};
