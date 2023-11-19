 
const mongoose = require('mongoose');

const auditLogUserSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    operation: { type: String, required: true, maxlength: 10 },
    oldData: { type: String },
    newData: { type: String },
    modifiedAt: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('AuditLogUser', auditLogUserSchema);