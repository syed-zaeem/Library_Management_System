 
const mongoose = require('mongoose');

const exceptionLogSchema = new mongoose.Schema({
    fileName: { type: String, required: true, maxlength: 255 },
    functionName: { type: String, required: true, maxlength: 255 },
    exceptionMessage: { type: String },
    exceptionDate: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('ExceptionLog', exceptionLogSchema);