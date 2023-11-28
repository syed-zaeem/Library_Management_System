const mongoose = require('mongoose');
const AuditLogBook = require('./AuditLogBook')

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 255 },
  author: { type: String, required: true, maxlength: 255 },
  ISBN: { type: String, maxlength: 13 },
  publishedDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
  active: { type: Boolean, default: true },
});

// Middleware to handle pre-save and post-save operations
bookSchema.pre('findOneAndUpdate', async function (next) {
  this._update.updatedAt = new Date(); // Update the updatedAt field
  // Create an audit log entry in AuditLogBook collection
  const book = await this.model.findOne(this.getQuery());
  const oldData = JSON.stringify(book);
  const newData = JSON.stringify(this._update);
  await AuditLogBook.create({
    bookID: this.getQuery()._id,
    operation: 'update',
    oldData,
    newData,
    modifiedAt: new Date(),
  });
  next();
});

module.exports = mongoose.model('Book', bookSchema);
