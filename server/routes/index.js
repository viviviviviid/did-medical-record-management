const user = require("./user.route");
const doctor = require("./doctor.route");

module.exports = (app) => {
    app.use("/user", user);
    app.use("/doctor", doctor);
}