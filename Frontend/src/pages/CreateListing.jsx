import React from "react";

function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-8 ">
        Create a Listing
      </h1>
      <form action="" className="flex flex-col sm:flex-row gap-7">
        <div className="flex flex-col  gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="rounded-lg p-3 border-gray-100 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="rounded-lg p-3 border-gray-100 focus:outline-none"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            className="rounded-lg p-3 border-gray-100 focus:outline-none"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
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
              />
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                id="regularprice"
                required
                min="1"
                className="p-3 border-gray-200 focus:outline-none rounded-md text-center"
              />
              <div className="flex flex-col text-center">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                id="discountedprice"
                required
                min="1"
                className="p-3 border-gray-200 focus:outline-none rounded-md text-center"
              />
              <div className="flex flex-col text-center">
                <p>Discounted price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
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
              className=" p-3 border border-gray-300 w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 border border-green-300 text-green-600 rounded-lg hover:shadow-lg ">
              Upload
            </button>
          </div>
          <button className="p-3 bg-green-600 text-white rounded-lg uppercase hover:opacity-95">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
