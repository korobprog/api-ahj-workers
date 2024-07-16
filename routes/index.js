const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Controller } = require('../controller');

const uploadsDestination = 'uploads';

const storage = multer.diskStorage({
  destination: uploadsDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

router.post('/post', Controller.post);

module.exports = router;
