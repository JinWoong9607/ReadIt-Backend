const { sequelize } = require('./index');

const sync = async () => {
  try {
    await sequelize.sync({ force: false, alter: true });
    console.log('Database synced');
  } catch (error) {
    console.error('Unable to sync database:', error);
    throw error;
  }
};

module.exports = sync;