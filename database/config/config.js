require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port":process.env.DB_PORT,
    "dialect": "mysql",
    "operatorsAliases": 0
  },
  "test": {
    "username": "357970_admin",
    "password": "1nopuedes2",
    "database": "databases-home_login",
    "host": "mysql-databases-home.alwaysdata.net",
    "dialect": "mysql",
    "operatorsAliases": 0
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "operatorsAliases": 0
  }
}
