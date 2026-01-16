const { body } = require('express-validator');

exports.createStoryValidator = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 255 }).withMessage('Title must not exceed 255 characters'),
  body('author')
    .notEmpty().withMessage('Author is required')
    .isLength({ max: 255 }).withMessage('Author must not exceed 255 characters'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isIn(['Financial', 'Technology', 'Health']).withMessage('Invalid category'),
  body('status')
    .optional()
    .isIn(['Draft', 'Publish']).withMessage('Invalid status'),
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array')
];

exports.updateStoryValidator = [
  body('title')
    .optional()
    .isLength({ max: 255 }).withMessage('Title must not exceed 255 characters'),
  body('author')
    .optional()
    .isLength({ max: 255 }).withMessage('Author must not exceed 255 characters'),
  body('category')
    .optional()
    .isIn(['Financial', 'Technology', 'Health']).withMessage('Invalid category'),
  body('status')
    .optional()
    .isIn(['Draft', 'Publish']).withMessage('Invalid status')
];