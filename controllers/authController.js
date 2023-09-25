const dao = require('../dao/user');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and Password required' });
  }

  try {
    const existingUser = await dao.getUser(username);

    if (existingUser && existingUser.Item) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    await dao.createUser({ username, password, role: 'employee' });
    return res.status(201).json({ message: 'Registration Successful' });
  } catch (err) {
    res.status(500).json({ message: 'Registration Failed', error: err.message });
  }
};

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }

  try {
    const existingUser = await dao.getUser(username);
    if (existingUser && existingUser.Item && existingUser.Item.password === password) {
      return res.status(200).json({ message: 'Login Successful' });
    } else {
      return res.status(400).json({ message: 'Invalid Username or Password' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }

  // In a real-world scenario, you'd probably issue a JWT or session here
  res.status(200).json({ message: 'Logged in successfully!', user: user.Item });
};

module.exports = {
  register,
  login,
};
