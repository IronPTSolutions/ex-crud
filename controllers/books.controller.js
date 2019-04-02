const createError = require('http-errors');
const mongoose = require('mongoose');
const Book = require('../models/book.model');

const constants = require('../constants')

const BOOK_CATEGORIES = constants.BOOK_CATEGORIES

module.exports.list = (req, res, next) => {
  const criteria = {};

  if (req.query.title) {
    criteria.title = new RegExp(req.query.title, 'i');
  }

  Book.find(criteria)
    .sort({ _id: -1 })
    .then(books => res.render('books/list', { 
      books,
      title: req.query.title 
    }))
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  res.render('books/form', { categories: BOOK_CATEGORIES })
}

module.exports.doCreate = (req, res, next) => {
  const book = new Book(req.body)

  newBook.save()
    .then(() => res.redirect('/books'))
    .catch((error) => {
      res.render('books/form', {
        book,
        categories: BOOK_CATEGORIES,
        ...error
      })
    });
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;

  Book.findById(id)
    .then(book => {
      if (book) {
        res.render('books/form', {
          categories: BOOK_CATEGORIES,
          book
        })
      } else {
        next(createError(404, 'Book not found'))
      }
    })
    .catch(error => next(error));
}

module.exports.doEdit = (req, res, next) => {
  const id = req.params.id;

  Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((book) => {
      if (book) {
        res.render('books/details', { book })
      } else {
        next(createError(404, 'Book not found'))
      }
    })
    .catch((error) => {
      const book = new Book(req.body)
      book.isNew = false;

      res.render('books/form', {
        categories: BOOK_CATEGORIES,
        book,
        ...error
      })
    })
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;

  Book.findByIdAndDelete(id)
    .then((book) => {
      if (book) {
        res.redirect('/books')
      } else {
        next(createError(404, 'Book not found'))
      }
    })
    .catch((error) => next(error))
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