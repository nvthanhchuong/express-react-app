const express = require('express');
const adminRoutes = require('./adminRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const userAuthRoutes = require('./userAuthRoutes');
const registrationFormRoutes = require('./registrationFormRoutes');

const router = express.Router();

router.use('/api', adminRoutes);
router.use('/api', authRoutes);
router.use('/api', userAuthRoutes); // Sử dụng userAuthRoutes cho '/login'

// Sử dụng userRoutes cho '/register' và '/get-count-all-user'
router.use('/api', userRoutes);
router.use('/api', registrationFormRoutes);


module.exports = router;
