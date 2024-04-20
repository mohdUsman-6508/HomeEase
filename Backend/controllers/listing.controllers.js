import { Listing } from "../models/listing.models.js";
import errorHandler from "../utils/error.js";

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

const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }

  if (req.user._id.toString() !== listing.userRef) {
    return next(errorHandler(404, "Not Authenticated(todelete)"));
  }

  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({
      deletedListing,
    });
  } catch (error) {
    next(error);
  }
};

const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return errorHandler(401, "Listing not found");
  }
  if (req.user._id.toString() !== listing.userRef) {
    return next(errorHandler(404, "Not Autenticated(to update"));
  }
  const {
    name,
    description,
    address,
    parking,
    furnished,
    bedrooms,
    bathrooms,
    regularPrice,
    discountPrice,
    type,
    offer,
    imageURLS,
    userRef,
  } = req.body;
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      listing,
      {
        $set: {
          name,
          description,
          address,
          parking,
          furnished,
          bedrooms,
          bathrooms,
          regularPrice,
          discountPrice,
          type,
          offer,
          imageURLS,
          userRef,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return errorHandler(404, "Listing not found");
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export { createListing, getListings, deleteListing, updateListing, getListing };
