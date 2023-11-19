 
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 255 },
    author: { type: String, required: true, maxlength: 255 },
    ISBN: { type: String, maxlength: 13 },
    publishedDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
    active: { type: Boolean, default: true },
  });
  
module.exports = mongoose.model('Book', bookSchema);