const controller = require("../link.controller.js");
const express = require("express");
const router = express.Router();

router.post("/generate", controller.generateLink);

module.exports = router;