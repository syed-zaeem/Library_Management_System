const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/donationRequestsOfUser',authMiddleware.authenticate, transactionController.getAllDonationRequestsOfUser);
router.get('/allocationRequestsOfUser',authMiddleware.authenticate, transactionController.getAllAllocationRequestsOfUser);
router.get('/returnRequestsOfUser',authMiddleware.authenticate, transactionController.getAllReturnableBooksOfUser);

router.get('/donationRequests',authMiddleware.authenticate, transactionController.getAllDonationRequests);
router.get('/allocationRequests',authMiddleware.authenticate, transactionController.getAllAllocationRequests);
router.get('/returnRequests',authMiddleware.authenticate, transactionController.getAllReturnRequests);

module.exports = router;
