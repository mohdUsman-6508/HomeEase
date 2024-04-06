import { Router } from "express";
import { signup, signin, google } from "../controllers/auth.controllers.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/google").post(google);

export default router;
