import { Router } from "express";
import { verifyJWT } from "../utils/verifyJWT.js";
import { createListing } from "../controllers/listing.controllers.js";

const router = Router();

router.route("/create").post(verifyJWT, createListing);

export default router;
