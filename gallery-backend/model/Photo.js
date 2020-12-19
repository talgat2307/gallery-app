const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PhotoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Field title is required to fill']
  },
  image: {
    type: String,
    required: [true, 'Field image is required to fill']
  }
});

const Photo = mongoose.model('Photo', PhotoSchema);
module.exports = Photo;