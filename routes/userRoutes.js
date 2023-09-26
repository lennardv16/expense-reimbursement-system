const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Manager Access
router.get('/', userController.getUsers);
router.get('/:username', userController.getUser);
router.patch('/:username', userController.updateUser);
router.delete('/:username', userController.deleteUser);

// User Access

module.exports = router;
