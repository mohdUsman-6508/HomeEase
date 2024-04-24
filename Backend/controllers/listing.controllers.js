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

const searchListings = async (req, res, next) => {
  try {
    const query = req.query;

    const limit = parseInt(query.limit) || 10;
    const startIndex = parseInt(query.startIndex) || 0;
    let offer = query.offer;
    console.log(query);
    if (offer === undefined || offer === "true") {
      offer = { $in: [false, undefined] };
    }

    let furnished = query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = query.parking;
    if (parking === undefined || parking == "true") {
      parking = { $in: [false, true] };
    }

    let type = query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }
    //TODO: ADD PRICE FILTERING TOO
    const searchTerm = query.searchTerm || "";
    const sort = query.sort || "createdAt";
    const order = query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      parking,
      type,
      furnished,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export {
  createListing,
  getListings,
  deleteListing,
  updateListing,
  getListing,
  searchListings,
};
