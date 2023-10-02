const dao = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const data = await dao.getUsers();
    return res.status(200).json(data.Items);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Failed to get users' });
  }
};

const getUser = async (req, res) => {
  const username = req.params.username;

  try {
    const data = await dao.getUser(username);
    if (data.Item) {
      return res.status(200).json(data.Item);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user:', error);
    return res.status(500).json({ success: false, message: 'User retrieval failed' });
  }
};

const updateUser = async (req, res) => {
  const username = req.params.username;

  try {
    const updatedData = await dao.updateUser(user);
    return res.status(200).json(updatedData.Attributes);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ success: false, message: 'User update failed' });
  }
};

const deleteUser = async (req, res) => {
  const username = req.params.username;

  try {
    await dao.deleteUser(username);
    return res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ success: false, message: 'User deletion failed' });
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
