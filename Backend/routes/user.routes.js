import { Router } from "express";
import { user, updateUser } from "../controllers/user.controllers.js";
import { signin, google } from "../controllers/auth.controllers.js";
import { verifyJWT } from "../utils/verifyJWT.js";

const router = Router();

router.route("/test").get(user);

//secured route
router.route("/update/:id").post(verifyJWT, updateUser);

export default router;
