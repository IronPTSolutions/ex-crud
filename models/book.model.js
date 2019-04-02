const mongoose = require('mongoose');
const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

const constants = require('../constants')
const BOOK_CATEGORIES = constants.BOOK_CATEGORIES

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
    trim: true,
    unique: true
  },
  thumbnailUrl: {
    type: String,
    match: [URL_REGEX, 'Invalid URL pattern']
  },
  description: {
    short: {
      type: String,
      default: ''
    },
    long: {
      type: String,
      default: ''
    }
  },
  authors: {
    type: [String],
    default: []
  },
  categories: {
    type: [String],
    enum: BOOK_CATEGORIES,
    default: []
  },
  mainCategory: {
    type: String,
    enum: BOOK_CATEGORIES
  }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
