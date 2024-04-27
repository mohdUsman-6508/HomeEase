import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-gray-700">
        Discover Your Dream Home with Home Ease
      </h1>
      <p className="mb-8 text-lg text-gray-500 leading-relaxed">
        Welcome to Home Ease, your gateway to finding your dream home! We are a
        premier real estate agency dedicated to helping you discover and acquire
        the perfect property that matches your lifestyle and preferences.
      </p>
      <p className="mb-8 text-lg text-gray-500 leading-relaxed">
        With our team of experienced agents and deep knowledge of the local real
        estate market, we are here to guide you through every step of the home
        buying journey. From identifying the right neighborhoods to negotiating
        the best deals, we ensure a seamless and enjoyable experience.
      </p>
      <p className="mb-8 text-lg text-gray-500 leading-relaxed">
        Whether you are a first-time homebuyer or looking for an upgrade, we
        offer a diverse portfolio of properties that cater to your unique needs.
        Let us help you turn your homeownership dreams into reality!
      </p>
      <div className="flex justify-center">
        <Link
          to={"/"}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Start Your Home Search
        </Link>
      </div>
    </div>
  );
}

export default About;
