const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.authenticate, authMiddleware.authorize(['admin']),  userController.getAllUsers);
router.get('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin', 'customer']), authMiddleware.customerAccessOwnData, userController.getUserById);
router.put('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin', 'customer']), authMiddleware.customerAccessOwnData, userController.updateUser);
router.delete('/', authMiddleware.authenticate, authMiddleware.authorize(['admin']),  userController.deleteUser);

module.exports = router;