const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController'); // Import your book controller
const authMiddleware = require('../middlewares/authMiddleware'); // Import your authentication middleware

app.use(authMiddleware.authenticate)
router.post('/books', bookController.createBook);
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
