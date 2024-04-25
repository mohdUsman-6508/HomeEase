import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function SearchListing() {
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermURL = urlParams.get("searchTerm");
    const typeURL = urlParams.get("type");
    const parkingURL = urlParams.get("parking");
    const furnishedURL = urlParams.get("furnished");
    const offerURL = urlParams.get("offer");
    const sortURL = urlParams.get("sort");
    const orderURL = urlParams.get("order");

    if (
      searchTermURL ||
      typeURL ||
      parkingURL ||
      furnishedURL ||
      offerURL ||
      sortURL ||
      orderURL
    ) {
      setSearchData({
        searchTerm: searchTermURL || "",
        type: typeURL || "all",
        parking: parkingURL === "true" ? true : false,
        furnished: furnishedURL === "true" ? true : false,
        offer: offerURL === "true" ? true : false,
        sort: sortURL || "created_at",
        order: orderURL || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/getlistings/search?${searchQuery}`);
      const data = await res.json();
      setListing(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSearchData({ ...searchData, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSearchData({
        ...searchData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort-order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSearchData({ ...searchData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchData.searchTerm);
    urlParams.set("type", searchData.type);
    urlParams.set("parking", searchData.parking);
    urlParams.set("furnished", searchData.furnished);
    urlParams.set("offer", searchData.offer);
    urlParams.set("sort", searchData.sort);
    urlParams.set("order", searchData.order);

    const searchQuery = urlParams.toString();
    navigate(`/listing/search?${searchQuery}`);

    console.log(searchQuery);
  };

  console.log(listing);
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-8 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div className="flex gap-2 items-center">
            <label className="font-semibold whitespace-nowrap">
              Search Term:
            </label>
            <input
              className="p-3 rounded-lg focus:outline-none border"
              type="text"
              placeholder="Search..."
              id="searchTerm"
              onChange={handleChange}
              value={searchData.searchTerm}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="all"
                onChange={handleChange}
                checked={searchData.type === "all"}
              />
              <span className="">Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="rent"
                onChange={handleChange}
                checked={searchData.type === "rent"}
              />
              <span className="">Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="sale"
                onChange={handleChange}
                checked={searchData.type === "sale"}
              />
              <span className="">Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="offer"
                onChange={handleChange}
                checked={searchData.offer}
              />
              <span className="">Offer</span>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <label className="  font-semibold">Facilities:</label>
            <div className="flex gap-2 ">
              <input
                className="w-5"
                type="checkbox"
                id="parking"
                onChange={handleChange}
                checked={searchData.parking}
              />
              <span className=" ">Parking</span>
            </div>

            <div className="flex gap-2 ">
              <input
                className="w-5"
                type="checkbox"
                id="furnished"
                onChange={handleChange}
                checked={searchData.furnished}
              />
              <span className=" ">Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="font-semibold">Sort</label>
            <select
              name="sort"
              id="sort-order"
              className="border rounded-lg p-3"
              onChange={handleChange}
              defaultValue={"created_at_asc"}
            >
              <option value="regularPrice_asc">Price low to high</option>
              <option value="regularPrice_desc">Price high to low</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
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
