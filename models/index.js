const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);

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
