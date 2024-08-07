const { sequelize } = require('./index.js');

const sync = async () => {
  try {
    await sequelize.sync({ force: false, alter: true });
    console.log('DB sync complete');
  } catch (err) {
    console.error('DB sync failed:', err);
  }
};

module.exports = sync;