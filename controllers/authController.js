const dao = require('../dao/user');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'thisisasecret';

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

    // Check if user exists and if password matches
    if (existingUser && existingUser.Item && existingUser.Item.password === password) {
      // Generate JWT token
      const token = jwt.sign(
        {
          username: existingUser.Item.username,
          role: existingUser.Item.role,
        },
        SECRET_KEY,
        {
          expiresIn: '1d', // Token expires in 1 day
        },
      );

      return res
        .status(200)
        .json({ message: 'Login Successful', user: existingUser.Item.username, token });
    } else {
      return res.status(401).json({ message: 'Invalid Username or Password' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

module.exports = {
  register,
  login,
};
