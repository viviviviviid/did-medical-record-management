const router = require("express").Router();
const controller = require("../controller/user.controller");

// POST
router.post("/login", controller.isUserRegistered);
router.post("/signup", controller.signUp);
router.post("/new-record", controller.newRecord);
router.post("/record/vc", controller.recordVc);
router.post("/record/vp", controller.recordVp)
router.post("/issue/vp", controller.issueVp);

// GET 
// router.get("/get-doctor-waiting-list", controller.getDoctorWaitingList_DB)

module.exports = router;