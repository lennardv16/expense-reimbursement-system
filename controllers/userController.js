const userDAO = require('../dao/userDAO');

const createUser = async (username) => {
  try {
    await userDAO.createUser(username);
    return { success: true, message: 'User created successfully' };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, message: 'User creation failed' };
  }
};

const getUsers = async () => {
  try {
    const users = await userDAO.getUsers();
    return { success: true, users };
  } catch (error) {
    console.error('Error getting users:', error);
    return { success: false, message: 'Failed to get users' };
  }
};

const getUser = async (username) => {
  try {
    const user = await userDAO.getUser(username);
    return { success: true, user };
  } catch (error) {
    console.error('Error getting user:', error);
    return { success: false, message: 'User retrieval failed' };
  }
};

const updateUser = async (user_id, username, password, role) => {
  try {
    const updatedUser = await userDAO.updateUser(user_id, username, password, role);
    return { success: true, updatedUser };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, message: 'User update failed' };
  }
};

const deleteUser = async (username) => {
  try {
    await userDAO.deleteUser(username);
    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, message: 'User deletion failed' };
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
