const express = require('express');
const router = express.Router();
const booksController =  require('../controllers/books.controller');

router.get('/', booksController.list);

module.exports = router;
