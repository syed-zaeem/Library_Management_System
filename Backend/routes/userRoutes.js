const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.authenticate, authMiddleware.authorize, userController.getAllActiveUsers);
router.put('/:id', authMiddleware.authenticate, authMiddleware.userAccessOwnData, userController.updateUser);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.userAccessOwnData, userController.softDeleteUser);
router.get('/:id', authMiddleware.authenticate, authMiddleware.userAccessOwnData, userController.getUserById);

module.exports = router;
