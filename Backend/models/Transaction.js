const mongoose = require('mongoose');
const AuditLogTransaction = require('./AuditLogTransaction')

const transactionSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookID: { type: mongoose.Schema.Types.ObjectId, required: true },
  transactionType: {
    type: String,
    enum: ['Request to Allocate', 'Request to Donate', 'Request to Return', 'First Penalty', 'Second Penalty', 'Third Penalty'],
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
  active: { type: Boolean, default: true },
});

// Middleware to handle pre-save and post-save operations
transactionSchema.pre('findOneAndUpdate', async function (next) {
  this._update.updatedAt = new Date(); // Update the updatedAt field
  // Create an audit log entry in AuditLogTransaction collection
  const transaction = await this.model.findOne(this.getQuery());
  const oldData = JSON.stringify(transaction);
  const newData = JSON.stringify(this._update);
  await AuditLogTransaction.create({
    transactionID: this.getQuery()._id,
    operation: 'update',
    oldData,
    newData,
    modifiedAt: new Date(),
  });
  next();
});

module.exports = mongoose.model('Transaction', transactionSchema);
