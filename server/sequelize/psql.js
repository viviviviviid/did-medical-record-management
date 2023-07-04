const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('medical', 'viviviviviid', 'wlqwnd', {
    host: 'localhost',
    dialect: 'postgres'
  });

const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

  testDbConnection()

  module.exports = { sq: sequelize, testDbConnection };

// here

// sequlize 없이 진행할 때

// const { Client } = require("pg");

// const sequelize = new Sequelize('medical', 'viviviviviid', 'wlqwnd')

// const client = new Client({
//   user: "viviviviviid",
//   host: "127.0.0.1",
//   database: "medical",
//   password: "wlqwnd",
//   port: 5432,
// });

// client.connect(); // DB 접속
