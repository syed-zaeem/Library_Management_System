const transactionService = require('../services/transactionService');
const logException = require('../utils/logger');

const transactionController = {
  getAllDonationRequestsOfUser: async (req, res) => {
    try {
      const userId = req.user.userId;
      const donationRequests = await transactionService.getActiveTransactionsByTypeAndUser(userId, 'Request to Donate');
      res.status(200).json(donationRequests);
    } catch (error) {
      logException('transactionController.js', 'getAllDonationRequestsOfUser', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  getAllAllocationRequestsOfUser: async (req, res) => {
    try {
      const userId = req.user.userId;
      const allocationRequests = await transactionService.getActiveTransactionsByTypeAndUser(userId, 'Request to Allocate');
      res.status(200).json(allocationRequests);
    } catch (error) {
      logException('transactionController.js', 'getAllAllocationRequestsOfUser', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  getAllReturnableBooksOfUser: async (req, res) => {
    try {
      const userId = req.user.userId;
      const returnableBooks = await transactionService.getActiveTransactionsByTypeAndUser(userId, 'Request to Return');
      res.status(200).json(returnableBooks);
    } catch (error) {
      logException('transactionController.js', 'getAllReturnableBooksOfUser', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  getAllDonationRequests: async (req, res) => {
    try {
      const donationRequests = await transactionService.getActiveTransactionsByType('Request to Donate');
      res.status(200).json(donationRequests);
    } catch (error) {
      logException('transactionController.js', 'getAllDonationRequests', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  getAllAllocationRequests: async (req, res) => {
    try {
      const allocationRequests = await transactionService.getActiveTransactionsByType('Request to Allocate');
      res.status(200).json(allocationRequests);
    } catch (error) {
      logException('transactionController.js', 'getAllAllocationRequests', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  getAllReturnRequests: async (req, res) => {
    try {
      const returnRequests = await transactionService.getActiveTransactionsByType('Request to Return');
      res.status(200).json(returnRequests);
    } catch (error) {
      logException('transactionController.js', 'getAllReturnRequests', error.message);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = transactionController;
