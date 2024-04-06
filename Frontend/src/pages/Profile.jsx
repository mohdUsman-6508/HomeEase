import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-4 max-w-lg mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-6">Profile</h1>

      <form action="" className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-xl focus:outline-none shadow-sm"
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-xl focus:outline-none shadow-sm"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-xl focus:outline-none shadow-sm"
        />

        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-85">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-green-700 cursor-pointer">Sign Out</span>
        <span className="text-red-700 cursor-pointer">Delete Account</span>
      </div>
    </div>
  );
}

export default Profile;
