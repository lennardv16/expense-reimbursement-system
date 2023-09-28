const jwt = require('jsonwebtoken');
const jwtUtil = require('../utils/jwtUtil');

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1]; //['Bearer', '<token>'];

  try {
    const decoded = await jwtUtil.verifyTokenAndReturnPayload(token);

    req.role = decoded.role;

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Failed to authenticate' });
  }
};

const isManager = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; //['Bearer', '<token>'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = await jwtUtil.verifyTokenAndReturnPayload(token);

    req.username = decoded.username;
    req.role = decoded.role;

    if (req.role !== 'manager') {
      return res.status(403).json({ message: 'You are not a manager!!!' });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden' });
  }
};

const isEmployee = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; //['Bearer', '<token>'];

  try {
    const decoded = await jwtUtil.verifyTokenAndReturnPayload(token);

    req.username = decoded.username;
    req.role = decoded.role;

    if (req.role !== 'employee') {
      return res.status(403).json({ message: 'Forbidden: Not an employee' });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden' });
  }
};

module.exports = {
  isAuthenticated,
  isManager,
  isEmployee,
};
