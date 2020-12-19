const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./app/users');
const photos = require('./app/photos');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
  await mongoose.connect('mongodb://localhost/gallery',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

  app.use('/users', users);
  app.use('/photos', photos);

  console.log('Connected to MongoDB');
  app.listen(port, () => console.log('Server started'));
};

run().catch(console.error);