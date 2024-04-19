import { Router } from "express";
import { verifyJWT } from "../utils/verifyJWT.js";
import {
  createListing,
  getListings,
} from "../controllers/listing.controllers.js";

const router = Router();

router.route("/create").post(verifyJWT, createListing);
router.route("/getlistings").get(verifyJWT, getListings);

export default router;
