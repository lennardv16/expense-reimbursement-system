const router = require('express').Router();
const ticket = require('../controllers/ticketController');
const auth = require('../middleware/auth');

// General Access
router.get('/', auth.isAuthenticated, ticket.getTickets);

// Manager Access
router.patch('/:ticketId', auth.isAuthenticated, ticket.processTicket);
// router.patch('/:ticketId', auth.isManager, ticket.denyTicket);

// User Access
router.post('/', auth.isEmployee, ticket.createTicket);
router.get('/:username', auth.isEmployee, ticket.getUserTickets);

module.exports = router;
