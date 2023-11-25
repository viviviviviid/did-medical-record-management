const router = require("express").Router();
const controller = require("../controller/user.controller");

// POST
router.post("/login", controller.isUserRegistered);
router.post("/signup", controller.signUp);
// router.post("/update", controller.checkUpdate);
router.post("/new-record", controller.newRecord);
router.post("/record/vc", controller.recordVc);
router.post("/record/vp", controller.recordVp)
router.post("/issue/vp", controller.issueVp);
// router.post("/jwt-from-app", controller.jwtFromApp)
// router.post("/share", controller.share);

// GET 
router.get("/test", controller.test);
router.get("/get-doctor-waiting-list", controller.getDoctorWaitingList_DB)


module.exports = router;