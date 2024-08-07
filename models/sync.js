const { sequelize } = require('./index.js');

const sync = () => {
    sequelize
    .sync({ force: false, alter: true })
    .then(() => console.log('DB sync complete'))
    .catch(err => {console.log(err)
    });
};

module.exports = sync;