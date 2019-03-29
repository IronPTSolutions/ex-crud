const Book = require('../models/book.model');

module.exports.list = (req, res, next) => {
  Book.find()
    .then(books => res.render('books/list', { books }))
    .catch(error => next(error));
}