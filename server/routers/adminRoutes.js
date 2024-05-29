const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController');

router.post('/admin/create', adminController.createAdmin);
router.get('/get-all-admins', adminController.getAllAdmins);
router.delete('/delete-admin-by-id/:admin_id', adminController.deleteAdmins);
router.post('/update-admin', adminController.updateAdmin);

module.exports = router;