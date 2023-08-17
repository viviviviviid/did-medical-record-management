const { sequelize } = require("./sequelize/sq.instance");
const { User } = require("./user.model");
const { initModels } = require("./init.model")

const db = {};

db.sequelize = sequelize;
db.User = User;

initModels(db);

module.exports = db;