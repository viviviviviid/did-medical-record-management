require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  'medical', 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.sync();

module.exports = {sequelize}