const Book = require('../models/Book');

const bookService = {
  createBook: async (bookData) => {
    try {
      return await Book.create({ ...bookData, active: false });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateBookActiveStatus: async (bookId, activeStatus) => {
    try {
      return await Book.findByIdAndUpdate(bookId, { active: activeStatus }, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getAllBooks: async () => {
    try {
      return await Book.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getBookById: async (id) => {
    try {
      return await Book.find({_id: id});
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getBooksByUserIdAndStatus: async (userId, status) => {
    try {
      return await Book.find({ 'user.id': userId, status });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getAllBooks: async () => {
    try {
      return await Book.find({active: true});
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteBook: async (bookId) => {
    try {
      const deletedBook = await Book.findByIdAndUpdate(
        bookId,
        { $set: { isActive: false } }, // Setting isActive to false for deletion
        { new: true } // To return the updated document
      );
      return deletedBook;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getBooksByTransactionIds: async (transactionIds) => {
    try {
      const books = await Book.find({
        _id: { $in: transactionIds }      });
      return books;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = bookService;
