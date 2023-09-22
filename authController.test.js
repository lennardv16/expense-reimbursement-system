const bc = require('bcrypt');
const dao = require('./userDao.test');

const register = async (req, res) => {
    try {
        const {username, password} = req.body;

        const existingUser = await dao.getUser(username);
        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPass = await bcrypt.hash(password, 10);
    }
}

const login = async (req, res) => {
    try {

    }
}

module.exports = {
  register,
  login,
};
