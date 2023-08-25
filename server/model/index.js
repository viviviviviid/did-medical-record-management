const { sequelize } = require("./sequelize/sq.instance");
const { User } = require("./user.model");
const { MedicalRecords } = require("./medicalRecord.model");
const { initModels } = require("./init.model")

const db = {};

db.sequelize = sequelize;
db.User = User;
db.MedicalRecords = MedicalRecords;

initModels(db);

module.exports = db;