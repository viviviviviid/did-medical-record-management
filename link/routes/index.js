const link = require("./link.route.js");

module.exports = (app) => {
  app.use("/link", link);
};
