import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../app/user/user.Slice.js";
import OAuth from "../components/OAuth.jsx";

function SignIn() {
  const [formData, setFormData] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { error, loading } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      dispatch(signInStart());
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success == false) {
        // setError(data.message);
        // setLoading(false);
        dispatch(signInFailure(data.message));
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(err));
    }
  };

  /////////////////////////////////////////////////
  return (
    <div className="flex flex-col justify-center items-center p-4 mx-auto">
      <span className="font-semibold text-black text-3xl m-3 p-2 mx-auto">
        Sign In
      </span>
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col justify-center items-center gap-4 w-full text-slate-600 p-4"
      >
        <input
          type="text"
          name=""
          id="email"
          placeholder="Email"
          className="p-3 rounded-md w-1/3 focus:outline-none  shadow-sm"
          onChange={handleChange}
        />
        <input
          type="password"
          name=""
          id="password"
          placeholder="Password"
          className="p-3 rounded-md w-1/3 focus:outline-none shadow-sm"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 hover:opacity-95 disabled:opacity-80 p-3 w-1/3 rounded-lg text-white shadow-sm"
        >
          {loading ? "LOADING..." : "SIGN IN"}
        </button>
        <OAuth />
      </form>
      <div className=" flex gap-3 justify-start items-start  w-1/3 p-2">
        <span className="text-black">{`Don't have an account?`}</span>
        <Link to="/signup" className="text-blue-500 hover:text-blue-700">
          Sign Up
        </Link>
      </div>
      {error && <p className="text-red-700 mt-6">{error}</p>}
    </div>
  );
}

export default SignIn;
