const router = require('express').Router();
const userController = require('../controllers/userController');

// User Routes
router.get('/', userController.getUsers);
router.get('/:username', userController.getUser);
router.patch('/:username', userController.updateUser);
router.delete('/:username', userController.deleteUser);

module.exports = router;
