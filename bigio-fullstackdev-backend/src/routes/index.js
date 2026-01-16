const express = require('express');
const router = express.Router();
const storyRoutes = require('./storyRoutes');
const chapterRoutes = require('./chapterRoutes');

router.use('/stories', storyRoutes);
router.use('/chapters', chapterRoutes);

module.exports = router;