const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Manager Access
router.get('/', auth.isManager, userController.getUsers);
router.get('/:username', auth.isManager, userController.getUser);
router.patch('/:username', auth.isManager, userController.updateUser);
router.delete('/:username', auth.isManager, userController.deleteUser);

module.exports = router;
