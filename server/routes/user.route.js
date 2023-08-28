const router = require("express").Router();
const controller = require("../controller/user.controller");

router.post("/login", controller.isUserRegistered);
router.post("/signup", controller.signUp);
router.post("/new-record", controller.newRecord);
router.post("/get-my-record", controller.getRecord);
// router.post("/share", controller.share);
// router.post("/approve", controller.approve);
// router.post("/retrieve", controller.retrieve);
// router.post("/display", controller.display);

module.exports = router;