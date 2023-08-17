const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  'medical', 
  process.env.DB_ID, 
  process.env.DB_PW, 
  {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.sync();

module.exports = {sequelize}