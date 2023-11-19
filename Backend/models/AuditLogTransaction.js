 
const mongoose = require('mongoose');

const auditLogTransactionSchema = new mongoose.Schema({
    transactionID: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
    operation: { type: String, required: true, maxlength: 10 },
    oldData: { type: String },
    newData: { type: String },
    modifiedAt: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('AuditLogTransaction', auditLogTransactionSchema);