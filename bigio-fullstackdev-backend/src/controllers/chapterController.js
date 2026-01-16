const db = require('../models');

exports.createChapter = async (req, res, next) => {
  try {
    const { storyId, title, content } = req.body;
    
    const story = await db.Story.findByPk(storyId);
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }
    
    const lastChapter = await db.Chapter.findOne({
      where: { storyId },
      order: [['chapterOrder', 'DESC']]
    });
    
    const chapterOrder = lastChapter ? lastChapter.chapterOrder + 1 : 1;
    
    const chapter = await db.Chapter.create({
      storyId,
      title,
      content,
      chapterOrder
    });
    
    res.status(201).json({
      success: true,
      message: 'Chapter created successfully',
      data: chapter
    });
  } catch (error) {
    next(error);
  }
};

exports.updateChapter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    const chapter = await db.Chapter.findByPk(id);
    
    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: 'Chapter not found'
      });
    }
    
    await chapter.update({ title, content });
    
    res.json({
      success: true,
      message: 'Chapter updated successfully',
      data: chapter
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteChapter = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const chapter = await db.Chapter.findByPk(id);
    
    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: 'Chapter not found'
      });
    }
    
    await chapter.destroy();
    
    res.json({
      success: true,
      message: 'Chapter deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};