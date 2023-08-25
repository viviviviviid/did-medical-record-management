import controller from "../did.controller.js";
import express from "express";
const router = express.Router();

router.post("/signup_did", controller.signUp_DID);

export default router;