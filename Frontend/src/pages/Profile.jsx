import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const imageFileRef = useRef(null);
  const [imageFile, setImageFile] = useState(undefined);

  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (imageFile) {
      handleFileUpload(imageFile);
    }
  }, [imageFile]);

  const handleFileUpload = (imageFile) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className="p-4 max-w-lg mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-6">Profile</h1>

      <form action="" className="flex flex-col gap-4">
        <input
          onChange={(e) => {
            setImageFile(e.target.files[0]);
          }}
          type="file"
          ref={imageFileRef}
          hidden
        />
        <img
          onClick={() => {
            imageFileRef.current.click();
          }}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload: (file must be image & less than 3 mb )
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">
              Image uploaded successfully !
            </span>
          ) : (
            ""
          )}
        </p>
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
        <span className="text-green-700 cursor-pointer hover:text-green-600 ">
          Sign Out
        </span>
        <span className="text-red-700 cursor-pointer  hover:text-red-600">
          Delete Account
        </span>
      </div>
    </div>
  );
}

export default Profile;
