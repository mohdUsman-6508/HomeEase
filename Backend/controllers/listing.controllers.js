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

const getListings = async (req, res, next) => {
  try {
    const idObject = req.user._id;
    const id = idObject.toString();
    const listings = await Listing.find({ userRef: id });
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export { createListing, getListings };
