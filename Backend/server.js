const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

//const penaltyScheduler = require('.utils/penaltyScheduler');


require('dotenv').config();
require('./utils/db');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/book', bookRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});