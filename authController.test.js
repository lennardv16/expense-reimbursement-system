const dao = require('./userDao.test');
const bcrypt = require('bcrypt');
const user = require('./userController.test');

const register = async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = await dao.getUser(username);
  if (existingUser.Item) {
    return res.status(400).json({ message: 'Username already exists.' });
  }

  // Hash the password and set default role
  const hashedPassword = await bcrypt.hash(password, 10);
  await user.createUser({ username, password: hashedPassword, role: 'employee' });

  res.status(200).json({ message: 'Registration successful!' });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.getUser(username);
  if (!user.Item || !(await bcrypt.compare(password, user.Item.password))) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  // In a real-world scenario, you'd probably issue a JWT or session here
  res.status(200).json({ message: 'Logged in successfully!', user: user.Item });
};

module.exports = {
  register,
  login,
};
