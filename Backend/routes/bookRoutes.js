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

router.delete('/:bookId',authMiddleware.authenticate, bookController.deleteBook);

router.get('/donatedBooks',authMiddleware.authenticate, bookController.getAllDonatedBooks);
router.get('/allocatedBooks',authMiddleware.authenticate, bookController.getAllAllocatedBooks);
router.get('/returnableBooks',authMiddleware.authenticate, bookController.getAllReturnableBooks);

module.exports = router;
