const router = require('express').Router();

const tixController = require('../controllers/ticketController');

// Manager Actions
router.get('/', (req, res) => {});
router.patch('/approve:id', (req, res) => {});
router.patch('/deny/:id', (req, res) => {});

// User Actions
router.post('/tickets', tixController.createTicket);
router.get('/');

module.exports = router;
