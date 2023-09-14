const { DataTypes } = require("sequelize");
const { sequelize } = require("./sequelize/sq.instance");

const Doctor = sequelize.define(
  "doctors", 
  {
      doctorNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
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
      timestamps: false,
    }
)

module.exports = { Doctor }