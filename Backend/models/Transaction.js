 
const mongoose = require('mongoose');

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
  
module.exports = mongoose.model('Transaction', transactionSchema);
  