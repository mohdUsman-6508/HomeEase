import { Listing } from "../models/listing.models.js";

const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json({
      listing,
    });
  } catch (error) {
    next(error);
  }
};

export { createListing };
