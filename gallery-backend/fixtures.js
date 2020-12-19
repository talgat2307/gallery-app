const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const User = require('./model/User');
const Photo = require('./model/Photo');

mongoose.connect('mongodb://localhost/gallery',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;

db.once('open', async () => {
  try {
    await db.dropCollection('users');
    await db.dropCollection('photos');
  } catch (e) {
    console.log('Collection were not presented, skipping drop...');
  }

  const [userJohn, userBill, userTony] = await User.create({
      username: 'John Wick',
      displayName: 'John Wick',
      email: 'wick@gmail.com',
      password: '001',
      token: nanoid(),
      role: 'user',
    }, {
      username: 'Bill Gates',
      displayName: 'Bill Gates',
      email: 'gates@gmail.com',
      password: '001',
      token: nanoid(),
      role: 'user',
    }, {
      username: 'Tony Stark',
      displayName: 'Tony Stark',
      email: 'stark@gmail.com',
      password: '001',
      token: nanoid(),
      role: 'user',
    },
  );

  await Photo.create({
    user: userJohn._id,
    title: 'Road Picture',
    image: 'road.jpg',
  }, {
    user: userBill._id,
    title: 'Beach Picture',
    image: 'beach.jpg',
  }, {
    user: userTony._id,
    title: 'Mountain Picture',
    image: 'mountain.jpg',
  }, {
    user: userJohn._id,
    title: 'Road Picture',
    image: 'road.jpg',
  }, {
    user: userBill._id,
    title: 'Beach Picture',
    image: 'beach.jpg',
  }, {
    user: userTony._id,
    title: 'Mountain Picture',
    image: 'mountain.jpg',
  });

  await db.close();
});