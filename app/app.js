const express = require('express');
const app = express();
const cors = require('cors');
const router = require('../api/routes/router');
const options = require('../config/options');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors(options));
app.use(express.json());
// default route to get if service is up, (actuator)
app.get('/', (req, res, next) => {
  res.status(201).json({
    message: 'User Service is UP!',
    method: req.method,
  });
});

app.use('/users', router);

// add middleware to handle errors and bad url paths
app.use((req, res, next) => {
  const error = new Error('NOT FOUND!!!');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
});

// connect to mongodb
mongoose.connect(process.env.mongoDBURL, (err) => {
  if (err) {
    console.error('Error:', err.message);
  } else {
    console.log('MongoDB connection successful');
  }
});

module.exports = app;
