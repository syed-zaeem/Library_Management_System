const Transaction = require('../models/Transaction');

const transactionService = {
  createTransaction: async (userID, bookID, transactionType) => {
    console.log(userID, bookID, transactionType)

    try {
      return await Transaction.create({ userID, bookID, transactionType });
    } catch (error) {
      console.log('1')
      throw new Error(error.message);
    }
  },

  updateTransactionActiveStatus: async (userID, bookID, transactionType, activeStatus) => {
    try {
      return await Transaction.findOneAndUpdate(
        { userID, bookID, transactionType },
        { active: activeStatus },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getTransactionsByType: async (transactionType) => {
    try {
      return await Transaction.find({ transactionType });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getTransactionsOfBook: async (bookID) => {
    try {
      return await Transaction.find({ bookID });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getTransactionsOfUser: async (userID) => {
    try {
      return await Transaction.find({ userID });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getActiveTransactionsByTypeAndUser: async (userID, transactionType) => {
    try {
      return await Transaction.find({ userID, transactionType, active: true });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getActiveTransactionsByType: async (transactionType) => {
    try {
      return await Transaction.find({transactionType, active: true });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  
};

module.exports = transactionService;
