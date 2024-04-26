import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

function ListingCard({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-sm transition-all overflow-hidden rounded-lg w-full sm:w-[320px]">
      <Link to={`/listing/${listing._id}`}>
        <div className="flex flex-col gap-5 shadow-md rounded-xl">
          <img
            src={listing?.imageURLS[0]}
            alt="listing image"
            className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-200"
          />
          <div className="flex flex-col p-3 gap-3 w-full">
            <p className="text-lg truncate font-semibold text-slate-600">
              {listing?.name}
            </p>
            <div className="flex gap-1 items-center ">
              <FaMapMarkerAlt className="text-lg text-green-600" />
              <span className="text-sm text-gray-600 truncate w-full">
                {listing?.address}
              </span>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2">
              {listing?.description}
            </p>

            <span className="text-xl font-bold text-gray-500">
              {listing.offer
                ? `$${
                    listing?.regularPrice - listing?.discountPrice
                  }.toLocaleString("en-US")} `
                : `$${listing?.regularPrice.toLocaleString("en-US")}`}
              {listing.type === "rent" ? " /month" : ""}
            </span>
            <div className="flex gap-2 text-slate-600  font-bold">
              <span className="text-xs">
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </span>
              <span className="text-xs">
                {listing.bathrooms > 1
                  ? `${listing.bedrooms} baths`
                  : `${listing.bedrooms} bath`}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingCard;
