const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');
const { createStoryValidator, updateStoryValidator } = require('../validators/storyValidator');
const validateRequest = require('../middleware/validateRequest');
const upload = require('../config/multer');

router.get('/', storyController.getAllStories);

router.get('/:id', storyController.getStoryById);

router.post(
  '/',
  upload.single('coverImage'),
  createStoryValidator,
  validateRequest,
  storyController.createStory
);

router.put(
  '/:id',
  upload.single('coverImage'),
  updateStoryValidator,
  validateRequest,
  storyController.updateStory
);

router.delete('/:id', storyController.deleteStory);

module.exports = router;