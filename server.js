const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes')

require('dotenv').config();
require('./utils/db');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});