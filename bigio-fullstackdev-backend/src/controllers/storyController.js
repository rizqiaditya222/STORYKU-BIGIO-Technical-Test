const db = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

exports.getAllStories = async (req, res, next) => {
  try {
    const { search, category, status, page = 1, limit = 10 } = req.query;
    
    const where = {};
    
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { author: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    if (category) {
      where.category = category;
    }
    
    if (status) {
      where.status = status;
    }
    
    const offset = (page - 1) * limit;
    
    const { count, rows } = await db.Story.findAndCountAll({
      where,
      include: [
        {
          model: db.Chapter,
          as: 'chapters',
          attributes: ['id']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      distinct: true
    });
    
    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getStoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const story = await db.Story.findByPk(id, {
      include: [
        {
          model: db.Chapter,
          as: 'chapters',
          order: [['chapterOrder', 'ASC']]
        }
      ]
    });
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }
    
    res.json({
      success: true,
      data: story
    });
  } catch (error) {
    next(error);
  }
};

exports.createStory = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  
  try {
    let { title, author, synopsis, category, tags, status, chapters } = req.body;
    
    if (typeof tags === 'string') {
      tags = JSON.parse(tags);
    }
    
    if (typeof chapters === 'string') {
      chapters = JSON.parse(chapters);
    }
    
    const story = await db.Story.create({
      title,
      author,
      synopsis,
      category,
      tags: tags || [],
      status: status || 'Draft',
      coverImage: req.file ? req.file.filename : null
    }, { transaction });
    
    if (chapters && chapters.length > 0) {
      const chaptersData = chapters.map((chapter, index) => ({
        storyId: story.id,
        title: chapter.title,
        content: chapter.content,
        chapterOrder: index + 1
      }));
      
      await db.Chapter.bulkCreate(chaptersData, { transaction });
    }
    
    await transaction.commit();
    
    const createdStory = await db.Story.findByPk(story.id, {
      include: [
        { model: db.Chapter, as: 'chapters' }
      ]
    });
    
    res.status(201).json({
      success: true,
      message: 'Story created successfully',
      data: createdStory
    });
  } catch (error) {
    await transaction.rollback();
    
    // Delete uploaded file if exists
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    next(error);
  }
};

exports.updateStory = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  
  try {
    const { id } = req.params;
    let { title, author, synopsis, category, tags, status } = req.body;
    
    if (typeof tags === 'string') {
      tags = JSON.parse(tags);
    }
    
    const story = await db.Story.findByPk(id);
    
    if (!story) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }
    
    if (req.file && story.coverImage) {
      const oldPath = path.join('uploads/covers', story.coverImage);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    
    await story.update({
      title,
      author,
      synopsis,
      category,
      tags: tags || story.tags,
      status,
      coverImage: req.file ? req.file.filename : story.coverImage
    }, { transaction });
    
    await transaction.commit();
    
    const updatedStory = await db.Story.findByPk(id, {
      include: [
        { model: db.Chapter, as: 'chapters' }
      ]
    });
    
    res.json({
      success: true,
      message: 'Story updated successfully',
      data: updatedStory
    });
  } catch (error) {
    await transaction.rollback();
    
    // Delete uploaded file if exists
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    next(error);
  }
};

// Delete story
exports.deleteStory = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const story = await db.Story.findByPk(id);
    
    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found'
      });
    }
    
    // Delete cover image
    if (story.coverImage) {
      const coverPath = path.join('uploads/covers', story.coverImage);
      if (fs.existsSync(coverPath)) {
        fs.unlinkSync(coverPath);
      }
    }
    
    await story.destroy();
    
    res.json({
      success: true,
      message: 'Story deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};