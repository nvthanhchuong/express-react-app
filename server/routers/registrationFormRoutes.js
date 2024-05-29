const express = require('express');
const router = express.Router();
const registrationFormController = require('../controllers/web/registrationController');

router.post('/registration-form', registrationFormController.createRegistrationForm);
router.post('/get-count-registration-form', registrationFormController.getCountRegistrationFormByStatus);
router.get('/get-all-registration-form', registrationFormController.getAllRegistrationsFrom);
router.post('/update-registration-form', registrationFormController.updateRegistrationsFrom);
router.post('/get-registration-form-by-status', registrationFormController.getRegistrationsFromByStatus);
router.get('/get-count-registration-form-all', registrationFormController.getCountRegistrationForm);






module.exports = router;
