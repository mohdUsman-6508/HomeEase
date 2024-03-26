import { Router } from "express";
import { user } from "../controllers/user.controllers.js";

const router = Router();

router.route("/test").get(user);

export default router;
