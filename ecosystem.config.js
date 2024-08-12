module.exports = {
  apps : [{
    name: 'readIt-server',
    script: 'app.js',
    instances: 5,
    authrestart: true,
    watch: 'false',
    env: {
      SERVER_PORT: process.env.PORT,
      Mysql_HOST: process.env.AZURE_MYSQL_HOST,
      Mysql_PORT: process.env.AZURE_MYSQL_PORT,
      Mysql_user: process.env.AZURE_MYSQL_USER,
      Mysql_password: process.env.AZURE_MYSQL_PASSWORD,
      Mysql_database: process.env.AZURE_MYSQL_DATABASE,
      JWT_SECRET: process.env.JWT_SECRET
    },
  },],
};
