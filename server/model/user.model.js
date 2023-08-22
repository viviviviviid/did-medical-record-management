const { DataTypes } = require("sequelize");
const { sequelize } = require("./sequelize/sq.instance");

const User = sequelize.define(
  "users", // members가 생성됨.
  {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      birthday: {
        type: DataTypes.STRING,
      },
      phoneNumber : {
        type: DataTypes.STRING,
      },
      isDoctor: {
        type: DataTypes.BOOLEAN,
      },
      address: {
        type: DataTypes.STRING,
      },
      did: {
        type: DataTypes.JSON,
      },
      update_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('now()'),
      }
  },
  {
    timestamps: false
  }
);

module.exports = { User }


// module.exports = { sq: sequelize };

// sequelize 없이 진행할 때
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
