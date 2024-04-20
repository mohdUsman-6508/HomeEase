import React, { useEffect } from "react";
import { useState } from "react";
import { app } from "../firebase.js";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";

function UpdateListing() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    imageURLS: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 100,
    discountPrice: 10,
    offer: false,
    parking: false,
    furnished: false,
    userRef: currentUser.rest._id,
  });

  console.log(currentUser.rest._id);
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  console.log(formData);
  const handleImageSubmit = (e) => {
    let filesLength = files.length;
    let previousImagesInFormLength = formData.imageURLS.length;
    if (filesLength > 0 && filesLength + previousImagesInFormLength < 8) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < filesLength; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageURLS: formData.imageURLS.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image upload failed (3 mb max/image)");
          setUploading(false);
        });
    } else {
      if (formData.imageURLS.length < 1)
        setImageUploadError("Minimum 1 image is required");
      else {
        setImageUploadError("Maximum 7 image can be uploaded");
      }

      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageURLS: formData.imageURLS.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id == "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageURLS.length < 1) {
        return setError("Minimum 1 image required");
      }
      if (+formData.regularPrice < +formData.discountPrice) {
        return setError("Discount is more than regular price");
      }

      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/updatelisting/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser.rest._id,
        }),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      }
      console.log(data);
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  //jab page load hoga to hum useparams ka istemal karkar params me se id lekar bakend se getlisting api call marenge aur data ko formdata me load karadenge
  useEffect(() => {
    const getListing = async () => {
      const listing = await fetch(`/api/listing/getlisting/${params.id}`);
      const data = await listing.json();
      setFormData(data);
    };
    getListing();
  }, []);
  ///////////////////////////////////////////////////////////////////
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">
        Update a Listing
      </h1>
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col sm:flex-row gap-7"
      >
        <div className="flex flex-col  gap-4 flex-1">
          <input
            type="text"
            placeholder="Title"
            id="name"
            className="rounded-lg p-3 border-gray-100 focus:outline-none"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="rounded-lg p-3 border-gray-100 focus:outline-none"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            className="rounded-lg p-3 border-gray-100 focus:outline-none"
            required
            onChange={handleChange}
            value={formData.description}
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap ">
            <div className="flex items-center gap-4">
              <input
                type="number"
                id="bedrooms"
                required
                min="1"
                max="10"
                className="p-3 border-gray-200 focus:outline-none rounded-md text-center"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                id="bathrooms"
                required
                min="1"
                max="10"
                className="p-3 border-gray-200 focus:outline-none rounded-md text-center"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                id="regularPrice"
                required
                min="1"
                className="p-3 border-gray-200 focus:outline-none rounded-md text-center"
                value={formData.regularPrice}
                onChange={handleChange}
              />
              <div className="flex flex-col text-center">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  id="discountPrice"
                  required
                  min="1"
                  className="p-3 border-gray-200 focus:outline-none rounded-md text-center"
                  value={formData.discountPrice}
                  onChange={handleChange}
                />
                <div className="flex flex-col text-center">
                  <p>Discounted price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 flex-1 my-4">
          <p className="font-semibold">
            Images:
            <span className="text-gray-500">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => {
                setFiles(e.target.files);
              }}
              className=" p-3 border border-gray-300 w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 border border-green-300 text-green-600 rounded-lg hover:shadow-lg "
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          <div className="h-64 overflow-y-scroll border border-gray-300 p-3">
            {formData.imageURLS.map((url, i) => (
              <div
                key={url}
                className="flex justify-between  items-center p-3 border "
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-24 h-24 object-contain rounded-lg "
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="text-red-700 p-3 uppercase hover:opacity-80"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <button
            disabled={loading}
            className="p-3 bg-gray-600 text-white rounded-lg uppercase hover:opacity-95"
          >
            {loading ? "Updating..." : "Update Listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}

export default UpdateListing;
