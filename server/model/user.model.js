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

// const { Sequelize, DataTypes } = require("sequelize");
// const { ethers } = require("ethers");

// const userFind = async (userInfo) => {
//   const data = await Member.findOne({where: {email: `${userInfo.email}`}});
//   if(data === null){
//     return !userRegister(userInfo);
//   }else{
//     console.log("already exist");
//     return true;
//   }
// }

// const userRegister = async (userInfo) => {
//   const userWallet = ethers.Wallet.createRandom();
//   Member.create({
//     name: `${userInfo.profile.nickname}`,
//     email: `${userInfo.email}`,
//     birthday: `${userInfo.birthday}`,
//     // phoneNumber:  `${userInfo.birthday}`,
//     isDoctor: false,
//     address: `${userWallet.address}`,
//   });
//   return true;
// }

// module.exports = { sq: sequelize, userFind };

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
