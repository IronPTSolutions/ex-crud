
const Book = require('../models/book.model');
const books = require('../data/books.json');
const mongoose = require('mongoose');
require('../config/db.config');


Book.create(books)
  .then((books) => console.info(`${books.length} new books added to the database`))
  .catch(error => console.error(error))
  .then(() => mongoose.connection.close());