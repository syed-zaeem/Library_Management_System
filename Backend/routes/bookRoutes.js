const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/donate', authMiddleware.authenticate, bookController.requestToDonate);
router.post('/allocate',authMiddleware.authenticate, bookController.requestToAllocate);
router.post('/return',authMiddleware.authenticate, bookController.requestToReturn);

router.put('/donate/accept',authMiddleware.authenticate,authMiddleware.authorize, bookController.acceptRequestToDonate);
router.put('/allocate/accept',authMiddleware.authenticate, authMiddleware.authorize,bookController.acceptRequestToAllocate);
router.put('/return/accept',authMiddleware.authenticate,authMiddleware.authorize, bookController.acceptRequestToReturn);

router.get('/',authMiddleware.authenticate, bookController.getAllBooks);
router.get('/:bookId',authMiddleware.authenticate, bookController.getBookById);

router.delete('/:bookId',authMiddleware.authenticate, bookController.deleteBook);



module.exports = router;
