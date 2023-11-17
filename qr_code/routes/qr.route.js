const controller = require("../qr.controller.js");
const express = require("express");
const router = express.Router();

router.post("/link", controller.generateTempLink);


module.exports = router;