const createError = require('http-errors');
const mongoose = require('mongoose');
const Book = require('../models/book.model');

module.exports.list = (req, res, next) => {
  Book.find()
    .then(books => res.render('books/list', { books }))
    .catch(error => next(error));
}

module.exports.details = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(createError(404, 'Book not found'))
  } else {
    Book.findById(id)
      .then(book => {
        if (book) {
          res.render('books/details', { book })
        } else {
          next(createError(404, 'Book not found'))
        }
      })
      .catch(error => next(error));
  }
}