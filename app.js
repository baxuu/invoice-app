const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const config = require('config');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

const db = config.get('mongo');

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })

  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
