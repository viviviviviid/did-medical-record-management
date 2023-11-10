import controller from "../did.controller.js";
import express from "express";
const router = express.Router();

router.post("/register", controller.signUp_DID);
router.post("/new-record", controller.addRecordHash_DID);
router.post("/verify-vc", controller.verifyVC_DID);
router.post("/issue-vc", controller.issueVc_DID)

export default router;