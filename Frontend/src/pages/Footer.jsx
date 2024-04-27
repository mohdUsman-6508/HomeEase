import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-600 text-white py-14 mt-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Home{" "}
              <span className="text-white hover:text-purple-600">Ease</span>
            </h2>
            <p className="text-lg mb-6">
              Your Partner in Real Estate Excellence
            </p>
            <ul className="flex flex-wrap mb-6">
              <li className="mr-4 mb-2">
                <Link to="/about" className="text-white hover:underline">
                  About Us
                </Link>
              </li>
              <li className="mr-4 mb-2">
                <Link to="/" className="text-white hover:underline">
                  Properties
                </Link>
              </li>
              <li className="mr-4 mb-2">
                <Link to="/" className="text-white hover:underline">
                  Services
                </Link>
              </li>
              <li className="mr-4 mb-2">
                <Link to="/" className="text-white hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="mb-6">
              <li className="mb-2">Email: info@homeease.com</li>
              <li className="mb-2">Phone: +91 (123) 456-7890</li>
              <li className="mb-2">Address: 123 Golden Street,Bombay, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-4 text-sm text-center">
          <p>&copy; 2024 Home Ease. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
