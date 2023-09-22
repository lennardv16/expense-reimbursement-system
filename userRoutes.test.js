const router = require('express').Router();
const authController = require('./authController.test');
const userController = require('./userController.test');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
