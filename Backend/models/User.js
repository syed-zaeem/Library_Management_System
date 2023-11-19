const mongoose = require('mongoose');

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
  
module.exports = mongoose.model('User', userSchema);