const { DataTypes } = require("sequelize");
const { sequelize } = require("./sequelize/sq.instance");

const User = sequelize.define(
  "users", // members가 생성됨.
  {
      userNumber: {
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
      wallet: {
        type: DataTypes.STRING,
      },
      did: {
        type: DataTypes.STRING,
        unique: true,
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
