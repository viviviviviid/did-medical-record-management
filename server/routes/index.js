const user = require("./user.route");

module.exports = (app) => {
    app.use("/user", user);
}