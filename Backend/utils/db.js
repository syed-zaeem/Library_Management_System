const mongoose = require('mongoose');
const User = require('../models/User');
const AuditLogUser = require('../models/AuditLogUser');
require('dotenv').config('../.env')

console.log(process.env.DATABASE_URL)
mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});



User.schema.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  this._update.updatedAt = new Date();

  const oldData = JSON.stringify(docToUpdate);
  const newData = JSON.stringify(this._update);

  const auditLogEntry = {
    userID: docToUpdate._id,
    operation: 'update',
    oldData,
    newData,
    modifiedAt: new Date(),
  };

  await AuditLogUser.create(auditLogEntry);
  
  next();
});
