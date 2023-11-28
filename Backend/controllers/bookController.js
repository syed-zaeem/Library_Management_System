const bookService = require('../services/bookService');
const transactionService = require('../services/transactionService');
const logException = require('../utils/logger'); // Import your exception logging function here

const bookController = {
  requestToDonate: async (req, res) => {
    try {
      const newBook = await bookService.createBook(req.body);
      const newTransaction = await transactionService.createTransaction(
        req.user.userId,
        newBook._id,
        'Request to Donate'
      );

      res.status(200).json({ newBook, newTransaction });
    } catch (error) {
      logException('bookController.js', 'bookController', error.message);

      res.status(500).json({ message: error.message });
    }
  },

  requestToAllocate: async (req, res) => {
    try {
      const { bookId } = req.body;

      const newTransaction = await transactionService.createTransaction(
        req.user.userId,
        bookId,
        'Request to Allocate'
      );

      res.status(200).json(newTransaction);
    } catch (error) {
      logException('bookController.js', 'requestToAllocate', error.message);

      res.status(500).json({ message: error.message });
    }
  },

  requestToReturn: async (req, res) => {
    try {
      const { bookId, userId } = req.body;

      const newTransaction = await transactionService.createTransaction(
        req.user.userId,
        bookId,
        'Request to Return'
      );

      res.status(200).json(newTransaction);
    } catch (error) {
      logException('bookController.js', 'requestToReturn', error.message);

      res.status(500).json({ message: error.message });
    }
  },

  acceptRequestToDonate: async (req, res) => {
    try {
      const { bookId, userId } = req.body;

      // Set the related transaction to inactive
      const updatedTransaction = await transactionService.updateTransactionActiveStatus(
        userId,
        bookId,
        'Request to Donate',
        false
      );

      // Set book to active for donation
      const updatedBook = await bookService.updateBookActiveStatus(bookId, true);

      res.status(200).json({ updatedTransaction, updatedBook });
    } catch (error) {
      logException('bookController.js', 'acceptRequestToReturn', error.message);

      res.status(500).json({ message: error.message });
    }
  },

  acceptRequestToAllocate: async (req, res) => {
    try {
      const {bookId, userId } = req.body;

      // Set the related transaction to inactive
      const updatedTransaction = await transactionService.updateTransactionActiveStatus(
        userId,
        bookId,
        'Request to Allocate',
        false
      );

      // Set book to inactive for allocation
      const updatedBook = await bookService.updateBookActiveStatus(bookId, false);

      res.status(200).json({ updatedTransaction, updatedBook });
    } catch (error) {
      logException('bookController.js', 'acceptRequestToAllocate', error.message);

      res.status(500).json({ message: error.message });
    }
  },

  acceptRequestToReturn: async (req, res) => {
    try {
      const { bookId, userId } = req.body;

      // Set the related transaction to inactive
      const updatedTransaction = await transactionService.updateTransactionActiveStatus(
        userId,
        bookId,
        'Request to Return',
        false
      );

      // Set book to active for returning
      const updatedBook = await bookService.updateBookActiveStatus(bookId, true);

      res.status(200).json({ updatedTransaction, updatedBook });
    } catch (error) {
      logException('bookController.js', 'acceptRequestToReturn', error.message);

      res.status(500).json({ message: error.message });
    }
  },
  getAllBooks: async (req, res) => {
    try {
      const allBooks = await bookService.getAllBooks();
      res.status(200).json(allBooks);
    } catch (error) {
      logException('bookController.js', 'getAllBooks', error.message);

      res.status(500).json({ message: error.message });
    }
  },

  deleteBook: async (req, res) => {
    try {
      const { bookId } = req.params;
      const deletedBook = await bookService.deleteBook(bookId);
      res.status(200).json({ message: 'Book deleted successfully', deletedBook });
    } catch (error) {
      logException('bookController.js', 'deleteBook', error.message);

      res.status(500).json({ message: error.message });
    }
  },

  getAllDonatedBooks: async (req, res) => {
    try {
      const userId = req.user.userId; // Assuming you have user ID in req.user.userId
      
      // Fetch transactions related to 'Request to Donate' for the user
      const donatedTransactions = await transactionService.getActiveTransactionsByTypeAndUser(userId, 'Request to Donate');
      
      // Filter books associated with these transactions that are currently active
      const donatedBooks = await bookService.getBooksByTransactionIds(
        donatedTransactions.map(transaction => transaction.bookId)      );

      res.status(200).json(donatedBooks);
    } catch (error) {
      logException('bookController.js', 'getALlDonatedBooks', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  getAllAllocatedBooks: async (req, res) => {
    try {
      const userId = req.user.userId; // Assuming you have user ID in req.user.userId
      
      // Fetch transactions related to 'Request to Allocate' for the user
      const allocatedTransactions = await transactionService.getActiveTransactionsByTypeAndUser(userId, 'Request to Allocate');
      
      // Filter books associated with these transactions that are currently inactive
      const allocatedBooks = await bookService.getBooksByTransactionIds(
        allocatedTransactions.map(transaction => transaction.bookId)      );

      res.status(200).json(allocatedBooks);
    } catch (error) {
      logException('bookController.js', 'getAllAllocatedBooks', error.message);

      res.status(500).json({ message: error.message });
    }
  },

  getAllReturnableBooks: async (req, res) => {
    try {
      const userId = req.user.userId; // Assuming you have user ID in req.user.userId
      
      // Fetch transactions related to 'Request to Return' for the user
      const returnableTransactions = await transactionService.getTransactionsByType(userId, 'Request to Return');
      
      // Filter books associated with these transactions that are currently active
      const returnableBooks = await bookService.getBooksByTransactionIds(
        returnableTransactions.map(transaction => transaction.bookId)      );

      res.status(200).json(returnableBooks);
    } catch (error) {
      logException('bookController.js', 'getAllReturnableBooks', error.message);

      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = bookController;
