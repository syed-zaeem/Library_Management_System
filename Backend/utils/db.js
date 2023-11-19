const mongoose = require('mongoose');
require('dotenv').config('../.env')

console.log(process.env.DATABASE_URL)
mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});
