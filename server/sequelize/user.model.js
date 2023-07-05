const { DataTypes } = require("sequelize");
const sequelize = require("./psql");

// const User = sequelize.define("user", {
//   email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       primaryKey: true,
//   },

//   fullName: {
//       type: DataTypes.STRING,
//   },

//   age: {
//       type: DataTypes.INTEGER,
//   },

//   employed: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
// },
// });
  
// User.sync().then(() => {
//   console.log("User Model synced");
// });

// const mike = User.create({
//   email: "mike@example.com",
//   fullName: "Mike Smith",
//   age: 30,
//   employed: true,
// });

// module.exports = User;