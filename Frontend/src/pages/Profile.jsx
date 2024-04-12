import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../app/user/user.Slice.js";
function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const imageFileRef = useRef(null);
  const [imageFile, setImageFile] = useState(undefined);

  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

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

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      dispatch(updateUserStart());
      // console.log(currentUser);
      // console.log(currentUser._id);
      const res = await fetch(
        `/api/user/update/${currentUser?.rest?._id || currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log("data", data);
      if (data?.success === false) {
        dispatch(updateUserFailure(data?.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error?.message));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    // console.log(formData);
  };

  return (
    <div className="p-4 max-w-lg mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-6">Profile</h1>

      <form onSubmit={handleUpdate} action="" className="flex flex-col gap-4">
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
          src={
            formData.avatar || currentUser?.avatar || currentUser?.rest?.avatar
          }
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
          defaultValue={currentUser?.rest?.username || currentUser?.username}
          id="username"
          className="border p-3 rounded-xl focus:outline-none shadow-sm"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          defaultValue={currentUser?.rest?.email || currentUser?.email}
          id="email"
          className="border p-3 rounded-xl focus:outline-none shadow-sm"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-xl focus:outline-none shadow-sm"
          onChange={handleChange}
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
