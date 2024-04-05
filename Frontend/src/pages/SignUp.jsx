import React from "react";
import { Link } from "react-router-dom";
function SignUp() {
  return (
    <div className="flex flex-col justify-center items-center p-4 mx-auto">
      <span className="font-semibold text-black text-3xl m-3 p-2 mx-auto">
        Sign Up
      </span>
      <form
        action=""
        className="flex flex-col justify-center items-center gap-4 w-full text-slate-600 p-4"
      >
        <input
          type="text"
          name=""
          id=""
          placeholder="Username"
          className="p-3 rounded-md w-1/3 focus:outline-none  shadow-sm"
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="Email"
          className="p-3 rounded-md w-1/3 focus:outline-none  shadow-sm"
        />
        <input
          type="password"
          name=""
          id=""
          placeholder="Password"
          className="p-3 rounded-md w-1/3 focus:outline-none shadow-sm"
        />
        <button className="bg-slate-700 hover:opacity-95 disabled:opacity-80 p-3 w-1/3 rounded-lg text-white shadow-sm">
          SIGN UP
        </button>
        <button className="bg-red-700 hover:opacity-95 disabled:opacity-80 p-3 w-1/3 rounded-lg text-white shadow-sm">
          CONTINUE WITH GOOGLE
        </button>
      </form>
      <div className=" flex gap-3 justify-start items-start  w-1/3 p-2">
        <span className="text-black">Have an account?</span>
        <Link to="/signin" className="text-blue-500 hover:text-blue-700">
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
