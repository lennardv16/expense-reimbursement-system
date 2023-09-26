const router = require('express').Router();
const ticket = require('../controllers/ticketController');
const auth = require('../middleware/auth');

// General Access
router.get('/', ticket.getTickets);

// Manager Access
router.get('/Pending', ticket.getPendingTickets);
router.get('/:ticketId', ticket.getTicketById);
router.get('/:username', ticket.getUserTickets);
router.put('/approve/:ticketId', ticket.approveTicket);
router.put('/deny/:ticketId', ticket.denyTicket);
router.delete('/:ticketId', ticket.deleteTicket);

// User Access
router.post('/submit', ticket.createTicket);

module.exports = router;
