const { Sequelize, DataTypes } = require("sequelize");
// const User = require("./user.model");

const sequelize = new Sequelize('medical', 'viviviviviid', 'wlqwnd', {
  host: 'localhost',
  dialect: 'postgres'
});

const Member = sequelize.define(
  "member", // members가 생성됨.
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
      update_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('now()'),
      }
  },
  // options
  {
    timestamps: false
  }
);

Member.sync().then(() => {
  console.log("Member Model synced");
});

Member.create({
  name: "서민석",
  email: "seo-minseok@daum.net",
  birthday: "0814"
});

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
