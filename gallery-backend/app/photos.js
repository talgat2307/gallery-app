const router = require('express').Router();
const { nanoid } = require('nanoid');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const auth = require('../middleware/auth');
const Photo = require('../model/Photo');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  let query;
  if (req.query.user) query = { user: req.query.user };
  try {
    const photos = await Photo.find(query).populate('user');
    res.send(photos);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
  const photo = new Photo({
    ...req.body,
    user: req.user._id,
  });

  if (req.file) {
    photo.image = req.file.filename;
  }

  try {
    await photo.save();
    res.send(photo);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/:id', [auth], async (req, res) => {
  let photo = await Photo.findById(req.params.id);
  console.log();
  if (JSON.stringify(req.user._id) === JSON.stringify(photo.user._id)) {
    try {
      await Photo.deleteOne(photo);
      res.send({ message: 'Success' });
    } catch (e) {
      res.status(403).send(e);
    }
  } else {
    res.send({message: 'Wrong user'});
  }

});

module.exports = router;

