const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Story = require('./Story')(sequelize, Sequelize);
db.Chapter = require('./Chapter')(sequelize, Sequelize);
db.Tag = require('./Tag')(sequelize, Sequelize);

db.Story.hasMany(db.Chapter, { foreignKey: 'storyId', as: 'chapters' });
db.Chapter.belongsTo(db.Story, { foreignKey: 'storyId', as: 'story' });

db.Story.belongsToMany(db.Tag, { through: 'StoryTags', foreignKey: 'storyId', as: 'tags' });
db.Tag.belongsToMany(db.Story, { through: 'StoryTags', foreignKey: 'tagId', as: 'stories' });

module.exports = db;