const express = require('express');
const router = express.Router();
const userController = require('../controllers/web/userController');

router.post('/register', userController.createUser);
router.get('/get-count-all-user', userController.getCountAllUsers);
router.get('/get-all-users', userController.getAllUsers);
router.delete('/delete-user-by-id/:id', userController.deleteUsers);
router.post('/update-user', userController.updateUser);

module.exports = router;