const express = require('express');
const router = express.Router();
const tixController = require('./controllers/ticketController');

// Manager Actions
router.get('/', (req, res) => {});
router.patch('/approve:id', (req, res) => {});
router.patch('/deny/:id', (req, res) => {});

// User Actions
router.post('/', (req, res) => {});
router.get('/tickets', (req, res) => {});

module.exports = router;
