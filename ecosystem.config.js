module.exports = {
  apps : [{
    name: 'readIt-server',
    script: 'app.js',
    instances: 5,
    authrestart: true,
    watch: 'false',
    env: {
      SERVER_PORT: 3000,
      Mysql_HOST: 8080,
      Mysql_PORT: 3306,
      Mysql_user: process.env.AZURE_MYSQL_USER,
      Mysql_password: process.env.AZURE_MYSQL_PASSWORD,
      Mysql_database: process.env.AZURE_MYSQL_DATABASE,
    },
  },],
};
