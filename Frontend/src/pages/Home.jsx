/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Footer from "./Footer.jsx";

function Home() {
  const [offerListings, setOfferListing] = useState([]);
  const [rentListings, setRentListing] = useState([]);
  const [saleListings, setSaleListing] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch(
          "/api/listing/getlistings/search?offer=true&limit=3"
        );
        const data = await res.json();
        setOfferListing(data);
        fetchRentListing();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListing = async () => {
      try {
        const res = await fetch(
          "/api/listing/getlistings/search?type=rent&limit=3"
        );
        const data = await res.json();
        setRentListing(data);
        fetchSaleListing();
      } catch (error) {
        error;
      }
    };

    const fetchSaleListing = async () => {
      try {
        const res = await fetch(
          "/api/listing/getlistings/search?rent=true&limit=3"
        );
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListing();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-600 font-bold text-3xl lg:text-6xl">
          Find your next perfect dream
        </h1>

        <div className="text-slate-600 text-3xl font-bold lg:text-6xl">
          <span className="text-gray-900">Home</span> with
          <span className="text-purple-600"> Ease</span>
        </div>
        <div className="text-gray-400 text-md sm:text-lg">
          Home Ease is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          className="text-blue-500 hover:text-blue-600"
          to={"/listing/search"}
        >
          Let's live your dream...
        </Link>
      </div>
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageURLS[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="flex flex-col gap-7 my-9  max-w-6xl mx-auto p-3 ">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-500">
                Recent offers
              </h2>
              <Link
                className="text-blue-700 hover:text-blue-600 text-sm"
                to={"/listing/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {offerListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-500">
                Recent places for rent
              </h2>
              <Link
                className="text-blue-700 hover:text-blue-600 text-sm"
                to={"/listing/search?rent=true"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {rentListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-500">
                Recent places for sale
              </h2>
              <Link
                className="text-blue-700 hover:text-blue-600 text-sm"
                to={"/listing/search?sale=true"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {saleListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* //////////////// */}
      <Footer />
    </div>
  );
}

export default Home;
