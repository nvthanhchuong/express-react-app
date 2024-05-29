const express = require('express');
const router = express.Router();
const userController = require('../controllers/web/userController');

router.post('/login', userController.login);

module.exports = router;
