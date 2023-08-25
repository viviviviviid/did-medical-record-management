const router = require("express").Router();
const controller = require("../controller/user.controller");

router.post("/login", controller.isUserRegistered);
router.post("/signup", controller.signUp);
router.post("/newrecord", controller.newRecord);
// router.post("/share", controller.share);
// router.post("/approve", controller.approve);
// router.post("/retrieve", controller.retrieve);
// router.post("/display", controller.display);

module.exports = router;