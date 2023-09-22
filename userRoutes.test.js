const router = require('express').Router();
const userController = require('./userController.test');

// User Routes
router.get('/', userController.getUsers);
router.get('users/:username', userController.getByUsername);
router.patch('/', userController.updateUser);
router.delete('/', userController.deleteUser);

module.exports = router;
