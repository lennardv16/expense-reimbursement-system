const router = require('express').Router();
const userController = require('./userController.test');

// User Routes
router.get('/users', userController.getUsers);
router.get('/users/:username', userController.getUser);
router.patch('/users/:username', userController.updateUser);
router.delete('/users/:username', userController.deleteUser);

module.exports = router;
