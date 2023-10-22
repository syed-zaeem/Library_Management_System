const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  isbn: { type: String, required: true },
  publishedDate: { type: Date, required: true }
}, {timestamps: true});

module.exports = mongoose.model('Book', bookSchema);
