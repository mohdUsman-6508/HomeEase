import { Router } from "express";
import { verifyJWT } from "../utils/verifyJWT.js";
import {
  createListing,
  getListings,
  deleteListing,
  updateListing,
  getListing,
} from "../controllers/listing.controllers.js";

const router = Router();

router.route("/create").post(verifyJWT, createListing);
router.route("/getlistings").get(verifyJWT, getListings);
router.route("/deletelisting/:id").delete(verifyJWT, deleteListing);
router.route("/updatelisting/:id").patch(verifyJWT, updateListing);
router.route("/getlisting/:id").get(getListing);

export default router;
