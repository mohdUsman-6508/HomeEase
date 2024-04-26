import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/listing/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  ////////////////////////////////////////////////////////
  return (
    <header className="bg-slate-200 shadow-md text-black">
      <div className="flex justify-between items-center p-3 max-w-6xl mx-auto ">
        <Link to="/">
          <h1 className="text-sm sm:text-2xl flex flex-wrap font-bold">
            <span className="text-slate-700">Home</span>
            <span className="text-purple-600 ">Ease</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 flex justify-center items-center p-2 rounded-full shadow-sm"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
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
