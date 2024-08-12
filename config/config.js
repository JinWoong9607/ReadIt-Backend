require('dotenv').config();

module.exports = {
  development: {
    username: process.env.AZURE_MYSQL_USER,
    password: process.env.AZURE_MYSQL_PASSWORD ,
    database: process.env.AZURE_MYSQL_DATABASE,
    host: process.env.AZURE_MYSQL_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true
      }
    }
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME ,
    host: process.env.TEST_DB_HOST ,
    dialect: "mysql"
  },
  production: {
    username: process.env.AZURE_MYSQL_USER,
    password: process.env.AZURE_MYSQL_PASSWORD ,
    database: process.env.AZURE_MYSQL_DATABASE,
    host: process.env.AZURE_MYSQL_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true
      }
    }
  }
};