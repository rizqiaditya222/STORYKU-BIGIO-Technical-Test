const { body } = require('express-validator');

exports.createChapterValidator = [
  body('storyId')
    .notEmpty().withMessage('Story ID is required')
    .isUUID().withMessage('Invalid story ID'),
  body('title')
    .notEmpty().withMessage('Chapter title is required')
    .isLength({ max: 255 }).withMessage('Title must not exceed 255 characters'),
  body('content')
    .notEmpty().withMessage('Chapter content is required')
];

exports.updateChapterValidator = [
  body('title')
    .optional()
    .isLength({ max: 255 }).withMessage('Title must not exceed 255 characters'),
  body('content')
    .optional()
    .notEmpty().withMessage('Content cannot be empty')
];