import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import Contact from "../components/Contact.jsx";

import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";

function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listingData, setListingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/getlisting/${params.id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListingData(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    getListing();
  }, [params.id]);

  return (
    <main>
      {loading && (
        <p className="font-semibold text-2xl text-center my-2">Loading...</p>
      )}
      {error && (
        <p className="font-semibold text-xl text-center my-2">
          Something went wrong!
        </p>
      )}
      {listingData && (
        <div>
          <Swiper navigation>
            {listingData.imageURLS.map((url) => (
              <SwiperSlide key={url}>
                <div className="flex  ">
                  <img
                    src={url}
                    alt=""
                    className="w-full h-[500px]  shadow-md p-1 "
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[22%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link Copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-5 gap-3">
            <p className="text-2xl font-semibold">
              {listingData.name} - $
              {listingData.offer
                ? `${
                    listingData.regularPrice - listingData.discountPrice
                  }`.toLocaleString("en-US")
                : listingData.regularPrice.toLocaleString("en-US")}
              {listingData.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listingData.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-700 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listingData.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listingData.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {`${+listingData.discountPrice} discount`}
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listingData.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listingData.bedrooms > 1
                  ? `${listingData.bedrooms} beds `
                  : `${listingData.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listingData.bathrooms > 1
                  ? `${listingData.bathrooms} baths `
                  : `${listingData.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listingData.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listingData.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser &&
              currentUser?.rest?._id !== listingData?.userRef &&
              !contact && (
                <button
                  onClick={() => setContact(true)}
                  className="bg-slate-700 p-3 uppercase rounded-lg text-white my-2 hover:opacity-85"
                >
                  Contact landlord
                </button>
              )}
            {contact && <Contact listingData={listingData} />}
          </div>
        </div>
      )}
    </main>
  );
}

export default Listing;
