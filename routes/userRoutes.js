const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');

// router.post('/register', (req, res) => {
//   try {
//     const { username, password } = req.body;
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.post('/login', (req, res) => {
//   try {
//     const { username, password } = req.body;
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.post('/tickets', (req, res) => {});

// module.exports = router;
