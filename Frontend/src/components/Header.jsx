import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md text-black">
      <div className="flex justify-between items-center p-3 max-w-6xl mx-auto ">
        <Link to="/">
          <h1 className="text-sm sm:text-2xl flex flex-wrap font-bold">
            <span className="text-slate-700">Home</span>
            <span className="text-purple-600 ">Ease</span>
          </h1>
        </Link>

        <form className="bg-slate-100 flex justify-center items-center p-2 rounded-full shadow-sm">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-60"
          />
          <FaSearch className="text-slate-600" />
        </form>

        <ul className="flex justify-center items-center gap-4 sm:gap-6">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700  hover:text-slate-800">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className=" hidden sm:inline text-slate-700  hover:text-slate-800">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={currentUser?.rest?.avatar || currentUser?.avatar}
                alt="avatar"
              />
            ) : (
              <li className="text-slate-700  hover:text-slate-800">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
