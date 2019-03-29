const mongoose = require('mongoose');
const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
const BOOK_CATEGORIES = [
  'Open Source',
  'Mobile',
  'Java',
  'Software Engineering',
  'Internet',
  'Web Development',
  'Miscellaneous',
  'Microsoft .NET',
  'Microsoft',
  'Next Generation Databases',
  'PowerBuilder',
  'Client-Server',
  'Computer Graphics',
  'Object-Oriented Programming',
  'S',
  'Networking',
  'Theory']

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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
  }
})

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
