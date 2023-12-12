const express = require('express');
const cors = require('cors')
require('dotenv').config('../.env')
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const transactionRoutes = require('./routes/transactionRoutes');


//const penaltyScheduler = require('.utils/penaltyScheduler');

require('./utils/db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/transaction', transactionRoutes);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});