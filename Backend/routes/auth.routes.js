import { Router } from "express";
import { verifyJWT } from "../utils/verifyJWT.js";
import {
  signup,
  signin,
  google,
  signout,
} from "../controllers/auth.controllers.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/google").post(google);
router.route("/signout").get(verifyJWT, signout);

export default router;
