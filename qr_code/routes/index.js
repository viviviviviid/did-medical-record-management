const qr = require("./qr.route.js");

module.exports = (app) => {
  app.use("/qr", qr);
};
