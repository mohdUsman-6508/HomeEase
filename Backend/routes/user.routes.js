import { Router } from "express";
import {
  user,
  updateUser,
  deleteUser,
  getUserDetail,
} from "../controllers/user.controllers.js";

import { verifyJWT } from "../utils/verifyJWT.js";

const router = Router();

router.route("/test").get(user);

//secured route
router.route("/update/:id").post(verifyJWT, updateUser);
router.route("/delete/:id").delete(verifyJWT, deleteUser);
router.route("/:id").get(verifyJWT, getUserDetail);
export default router;
