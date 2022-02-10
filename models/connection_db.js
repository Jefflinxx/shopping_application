// DataBase
const config = require('../config/development_config');
const mysqlt = require("mysql2");


const connection = mysqlt.createConnection({
  host: 'localhost',
  user: 'user1',
  password: '1234',
  database: 'shopping_cart'
});

connection.connect(err => {
  if (err) {
    console.log('connecting error');
  } else {
    console.log('connecting success');
  }
});

module.exports = connection;