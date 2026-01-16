const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterController');
const { createChapterValidator, updateChapterValidator } = require('../validators/chapterValidator');
const validateRequest = require('../middleware/validateRequest');

router.post(
  '/',
  createChapterValidator,
  validateRequest,
  chapterController.createChapter
);

router.put(
  '/:id',
  updateChapterValidator,
  validateRequest,
  chapterController.updateChapter
);

router.delete('/:id', chapterController.deleteChapter);

module.exports = router;