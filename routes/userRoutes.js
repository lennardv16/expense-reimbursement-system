const express = require('express');
const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/register', userController.createUser);

router.get('/', userController.getUsers);

router.get('/', userController.getUser);

router.patch('/', userController.updateUser);

router.delete('/', userController.deleteUser);

module.exports = router;
