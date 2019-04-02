const express = require('express');
const router = express.Router();
const booksController =  require('../controllers/books.controller');

router.get('/new', booksController.create);
router.post('/', booksController.doCreate);

router.get('/:id/edit', booksController.edit);
router.post('/:id', booksController.doEdit);

router.post('/:id/delete', booksController.delete);

router.get('/', booksController.list);
router.get('/:id', booksController.details);

module.exports = router;
