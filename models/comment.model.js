const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required']
  },
  content: String,
  book: { type: mongoose.Types.ObjectId, ref: 'Book' }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
