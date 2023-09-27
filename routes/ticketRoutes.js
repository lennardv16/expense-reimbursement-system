const router = require('express').Router();
const ticket = require('../controllers/ticketController');
const auth = require('../middleware/auth');

// General Access
router.get('/', auth.isAuthenticated, ticket.getTickets);
router.get('/users/:username', auth.isAuthenticated, ticket.getUserTickets);


// Manager Access
router.get('/pending', auth.isManager, ticket.getPendingTickets);
router.get('/:ticketId', auth.isManager, ticket.getTicketById);

router.patch('/:ticketId/approve', auth.isManager, ticket.approveTicket);
router.patch('/:ticketId/deny', auth.isManager, ticket.denyTicket);

router.delete('/:ticketId', auth.isManager, ticket.deleteTicket);

// User Access
router.post('/', auth.isEmployee, ticket.createTicket);

module.exports = router;
