const dao = require('../models/user');
const jwtUtil = require('../utils/jwtUtil');

const register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and Password required' });
  }

  try {
    const existingUser = await dao.getUser(username);

    if (existingUser && existingUser.Item) {
      return res.status(400).json({ message: 'This username is already taken' });
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
      // Successful Login
      // Generate JWT token
      const token = jwtUtil.createJWT(existingUser.Item.username, existingUser.Item.role);

      return res.status(200).json({ message: `Welcome ${username}`, token });
    } else {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to authenticate user' });
  }
};

module.exports = {
  register,
  login,
};
