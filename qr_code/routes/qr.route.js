const controller = require("../qr.controller.js");
const express = require("express");
const router = express.Router();

router.post("/link", controller.generateLink);

module.exports = router;