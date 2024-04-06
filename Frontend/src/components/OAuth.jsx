import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../app/user/user.Slice.js";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      console.log(data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button
      onClick={handleGoogleAuth}
      type="button"
      className="bg-red-700 hover:opacity-95 disabled:opacity-80 p-3 w-1/3 rounded-lg text-white shadow-sm"
    >
      CONTINUE WITH GOOGLE
    </button>
  );
}

export default OAuth;
