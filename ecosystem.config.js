module.exports = {
  apps : [{
    name: 'readIt-server',
    script: './models/index.js',
    instances: 1,
    authrestart: true,
    watch: '.',
    env: {
      SERVER_PORT: 3000,
      Mysql_HOST: 'localhost',
      Mysql_PORT: 3000,
      Mysql_user: 'root',
      Mysql_password: 'vkdltjs!23',
      Mysql_database: 'readIt',
    },
  },],
};
