const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'production';
const path = require('path');
const config = require('../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const User = require('./user');
const Comment = require('./comment');
const Dictionary = require('./dictionary');

db.User = User;
db.Comment = Comment;
db.Dictionary = Dictionary;

User.init(sequelize);
Comment.init(sequelize);
Dictionary.init(sequelize);

User.associate(db);
Comment.associate(db);
Dictionary.associate(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
