const express = require('express');
const router = express.Router();
const multer = require('multer');
const { NewsController, PostController } = require('../controller');

const uploadsDestination = 'uploads';

const storage = multer.diskStorage({
  destination: uploadsDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

router.post('/post', PostController.post);
router.get('/news', NewsController.news);

module.exports = router;
