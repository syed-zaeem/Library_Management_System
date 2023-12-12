const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/signup', authMiddleware.addUserRole, authController.signup);
router.post('/login', authController.login);
router.get('/verify', authMiddleware.authenticate, authController.verify)

module.exports = router;
