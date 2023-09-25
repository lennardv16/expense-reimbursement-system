const bc = require('bcrypt');
const dao = require('./userDao.test');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and Password required' });
  }

  try {
    const existingUser = await dao.getUser(username);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    } else {
      const newUser = dao.createUser(username, password,);
    }
  } catch (err) {
    console.error('Error creating user', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and Password required' });
  }

  try {
    const existingUser = await dao.getUser(username);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const passMatch = await bc.compare(password, user.password);

    if (!passMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
};
