function SearchListing() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-8 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-7">
          <div className="flex gap-2 items-center">
            <label className="font-semibold whitespace-nowrap">
              Search Term:
            </label>
            <input
              className="p-3 rounded-lg focus:outline-none border"
              type="text"
              placeholder="Search..."
              id="searchterm"
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="all" />
              <span className="">Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="rent" />
              <span className="">Rent</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="sale" />
              <span className="">Sale</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="offer" />
              <span className="">Offer</span>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <label className="  font-semibold">Facilities:</label>
            <div className="flex gap-2 ">
              <input className="w-5" type="checkbox" id="parking" />
              <span className=" ">Parking</span>
            </div>

            <div className="flex gap-2 ">
              <input className="w-5" type="checkbox" id="furnished" />
              <span className=" ">Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="font-semibold">Sort</label>
            <select
              name="sort"
              id="sort-order"
              className="border rounded-lg p-3"
            >
              <option value="">Price low to high</option>
              <option value="">Price high to low</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
            </select>
          </div>

          <button className="p-3 bg-slate-700 uppercase rounded-lg text-white">
            Search
          </button>
        </form>
      </div>
      <div>
        <h1 className="text-3xl font-semibold p-3 text-slate-600">
          Listing results:
        </h1>
      </div>
    </div>
  );
}

export default SearchListing;
