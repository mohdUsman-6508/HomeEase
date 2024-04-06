import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  /////////////////////////////////////////////////
  return (
    <div className="flex flex-col justify-center items-center p-4 mx-auto">
      <span className="font-semibold text-black text-3xl m-3 p-2 mx-auto">
        Sign Up
      </span>
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col justify-center items-center gap-4 w-full text-slate-600 p-4"
      >
        <input
          type="text"
          name=""
          id="username"
          placeholder="Username"
          className="p-3 rounded-md w-1/3 focus:outline-none  shadow-sm"
          onChange={handleChange}
        />
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
          {loading ? "LOADING..." : "SIGN UP"}
        </button>
        <OAuth />
      </form>
      <div className=" flex gap-3 justify-start items-start  w-1/3 p-2">
        <span className="text-black">Have an account?</span>
        <Link to="/signin" className="text-blue-500 hover:text-blue-700">
          Sign in
        </Link>
      </div>
      {error && <p className="text-red-700 mt-6">{error}</p>}
    </div>
  );
}

export default SignUp;
