import controller from "../did.controller.js";
import express from "express";
const router = express.Router();

// POST
router.post("/register", controller.signUp_DID);
// Issue VC/VP
router.post("/issue/vc", controller.issueVc_DID);
router.post("/update/vc", controller.reissueVc_DID)
router.post("/issue/vp", controller.issueVp_DID);
// Verify VC/VP
router.post("/verify/vp", controller.verifyVp_DID);
router.post("/verify/vc", controller.verifyVc_DID);

export default router;

// router.post("/new-record", controller.addRecordHash_DID);