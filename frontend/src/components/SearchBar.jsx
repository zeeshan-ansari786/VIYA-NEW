import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 py-3 px-6 text-center shadow-md">
      <div className="flex items-center justify-center bg-white rounded-full px-5 py-2 w-3/4 sm:w-1/2 mx-auto shadow-lg transition-all hover:shadow-xl focus-within:shadow-xl">
        <FaSearch className="text-gray-500 text-lg mr-2" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-transparent text-gray-700 text-sm placeholder-gray-500 focus:ring-0 focus:outline-none"
          type="text"
          placeholder="Search products..."
        />
        <FaTimes
          onClick={() => setShowSearch(false)}
          className="text-gray-500 text-lg cursor-pointer hover:text-red-500 transition-all"
        />
      </div>
    </div>
  ) : null;
};

export default SearchBar;
