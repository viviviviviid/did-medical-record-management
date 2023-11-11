const controller = require("../qr.controller.js");
const express = require("express");
const router = express.Router();

router.post("/link", controller.requestLink_QR);

module.exports = router;