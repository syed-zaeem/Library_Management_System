 
const mongoose = require('mongoose');

const auditLogBookSchema = new mongoose.Schema({
    bookID: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    operation: { type: String, required: true, maxlength: 10 },
    oldData: { type: String },
    newData: { type: String },
    modifiedAt: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('AuditLogBook', auditLogBookSchema);