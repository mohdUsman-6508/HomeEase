import { Router } from "express";
import {
  user,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";
import { signin, google } from "../controllers/auth.controllers.js";
import { verifyJWT } from "../utils/verifyJWT.js";

const router = Router();

router.route("/test").get(user);

//secured route
router.route("/update/:id").post(verifyJWT, updateUser);
router.route("/delete/:id").delete(verifyJWT, deleteUser);
export default router;
