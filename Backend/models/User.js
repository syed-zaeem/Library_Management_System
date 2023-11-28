const mongoose = require('mongoose');
const AuditLogUser = require('./AuditLogUser')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 255 },
  email: { type: String, required: true, maxlength: 255 },
  password: { type: String, required: true, maxlength: 255 },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
  active: { type: Boolean, default: true },
});

// Middleware to handle pre-save and post-save operations
userSchema.pre('findOneAndUpdate', async function (next) {
  this._update.updatedAt = new Date(); // Update the updatedAt field
  // Create an audit log entry in AuditLogUser collection
  await AuditLogUser.create({
    userID: this.getQuery()._id,
    operation: 'update',
    oldData: JSON.stringify(this._update),
    newData: JSON.stringify(this._update),
    modifiedAt: new Date(),
  });
  next();
});

module.exports = mongoose.model('User', userSchema);
