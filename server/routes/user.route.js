const router = require("express").Router();
const controller = require("../controller/user.controller");

// router.get
router.post("/isUserRegistered", controller.isUserRegistered);
router.get("/signup", controller.signUp);
router.get("/claim", controller.claim);
router.get("/share", controller.share);
router.get("/approve", controller.approve);
router.get("/retrieve", controller.retrieve);
router.get("/display", controller.display);

module.exports = router;