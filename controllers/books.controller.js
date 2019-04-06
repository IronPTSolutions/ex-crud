const createError = require('http-errors');
const mongoose = require('mongoose');
const Book = require('../models/book.model');
const Comment = require('../models/comment.model');

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
  res.render('books/form', { categories: BOOK_CATEGORIES, book: new Book() })
}

module.exports.doCreate = (req, res, next) => {
  const book = new Book(req.body)

  book.save()
    .then(() => res.redirect(`/books/${book._id}`))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('books/form', {
          book,
          categories: BOOK_CATEGORIES,
          ...error
        })
      } else {
        next(error)
      }
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
        res.redirect(`/books/${book._id}`)
      } else {
        next(createError(404, 'Book not found'))
      } 
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        const book = new Book({ ...req.body, _id: id })
        book.isNew = false

        res.render('books/form', {
          categories: BOOK_CATEGORIES,
          book,
          ...error
        })
      } else {
        next(error);
      }
    })
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;

  Book.findByIdAndDelete(id)
    .then((book) => {
      if (book) {
        Comment.deleteMany({ book: book._id})
          .then(() => res.redirect('/books'))
          .catch(error => next(error))
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
          Comment.find({ book: book._id })
            .then(comments => {
              res.render('books/details', { book, comments })
            })
            .catch(next)
        } else {
          next(createError(404, 'Book not found'))
        }
      })
      .catch(error => next(error));
  }
}

module.exports.like = (req, res, next) => {
  const id = req.params.id;

  setTimeout(() => {
    Book.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
      .then((book) => res.json({
        bookId: book._id,
        likes: book.likes
      }))
      .catch(next)
  }, 3000)
}