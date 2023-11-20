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

  getBooksByUserIdAndStatus: async (userId, status) => {
    try {
      return await Book.find({ 'user.id': userId, status });
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

  getBooksByStatusAndUserId: async (status, userId) => {
    try {
      return await Book.find({ status, 'user.id': userId });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteBook: async (bookId) => {
    try {
      return await Book.findByIdAndDelete(bookId);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = bookService;
