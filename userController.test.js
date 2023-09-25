const dao = require('./userDao.test');

const getUsers = async (req, res) => {
  try {
    const users = await dao.getUsers();
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Failed to get users' };
  }
};

const getUser = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await dao.getUser(username);
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    return { success: false, message: 'User retrieval failed' };
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await dao.updateUser(user_id, username, password, role);
    return { success: true, updatedUser };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, message: 'User update failed' };
  }
};

const deleteUser = async (username) => {
  try {
    await dao.deleteUser(username);
    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, message: 'User deletion failed' };
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
