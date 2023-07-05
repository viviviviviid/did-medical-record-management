const { Sequelize, DataTypes } = require("sequelize");
// const User = require("./user.model");

const sequelize = new Sequelize('medical', 'viviviviviid', 'wlqwnd', {
  host: 'localhost',
  dialect: 'postgres'
});

// const testDbConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },

  fullName: {
    type: DataTypes.STRING,
  },
  
  age: {
    type: DataTypes.INTEGER,
  },

  employed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.sync().then(() => {
  console.log("User Model synced");
});

// const mike = User.create({
//   email: "mike@example.com",
//   fullName: "Mike Smith",
//   age: 30,
//   employed: true,
// });



// const findUser = async () => {
//   try{
//     const userInfo = await User.findOne({where: {email: "seo-minseok@daum.net"}, from: member});
//     if(userInfo === NULL){
//       console.log("null")
//     }
//     console.log(userInfo);

//     return userInfo;
//   } catch (error) {
//     console.log(error)
//     return error;
//   }
// }

// module.exports = { sq: sequelize, findUser };

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
