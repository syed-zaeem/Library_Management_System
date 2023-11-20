const bookService = require('../services/bookService');
const transactionService = require('../services/transactionService');

const bookController = {
  requestToDonate: async (req, res) => {
    try {
      const newBook = await bookService.createBook(req.body);

      const newTransaction = await transactionService.createTransaction(
        req.body.userId,
        newBook._id,
        'Request to Donate'
      );

      res(200).json({ newBook, newTransaction });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  requestToAllocate: async (req, res) => {
    try {
      const { bookId, userId } = req.body;

      const newTransaction = await transactionService.createTransaction(
        userId,
        bookId,
        'Request to Allocate'
      );

      res(200).json(newTransaction);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  requestToReturn: async (req, res) => {
    try {
      const { bookId, userId } = req.body;

      const newTransaction = await transactionService.createTransaction(
        userId,
        bookId,
        'Request to Return'
      );

      res(200).json(newTransaction);
    } catch (error) {
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

      res(200).json({ updatedTransaction, updatedBook });
    } catch (error) {
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

      res(200).json({ updatedTransaction, updatedBook });
    } catch (error) {
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

      res(200).json({ updatedTransaction, updatedBook });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllBooks: async (req, res) => {
    try {
      const allBooks = await bookService.getAllBooks();
      res.status(200).json(allBooks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getBooksByStatusAndUserId: async (req, res) => {
    try {
      const { status, userId } = req.params;
      const books = await bookService.getBooksByStatusAndUserId(status, userId);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteBook: async (req, res) => {
    try {
      const { bookId } = req.params;
      const deletedBook = await bookService.deleteBook(bookId);
      res.status(200).json({ message: 'Book deleted successfully', deletedBook });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  
};

module.exports = bookController;
