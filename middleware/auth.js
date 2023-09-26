const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.username = decoded.UserInfo.username;
    req.role = decoded.UserInfo.role;
    next();
  });
};

const isManager = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (decoded.UserInfo.role !== 'manager') {
      return res.status(401).json({ message: 'You are not a manager!!!' });
    }

    req.username = decoded.UserInfo.username;
    req.role = decoded.UserInfo.role;
    next();
  });
};

const isEmployee = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.username = decoded.UserInfo.username;
    req.role = decoded.UserInfo.role;
    next();
  });
};

module.exports = {
  isAuthenticated,
  isManager,
  isEmployee,
};
