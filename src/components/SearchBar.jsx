// src/components/SearchBar.jsx
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("ExtraMart");

  // Notify parent whenever tab changes
  useEffect(() => {
    onTabChange(activeTab);
  }, [activeTab]);

  return (
    <div className="w-[70%] sm:w-[75%] md:w-[60%] lg:w-[45%] xl:w-[40%] mx-auto mt-6 flex flex-col items-center gap-4">
      {/* Toggle Section */}
      <div className="relative flex bg-gray-100 rounded-full shadow-inner border border-gray-200 p-1 w-fit">
        <div
          className={`absolute top-1 bottom-1 left-1 w-[48%] rounded-full transition-all duration-300 ${
            activeTab === "ExtraMart"
              ? "translate-x-0 bg-green-500"
              : "translate-x-[100%] bg-orange-500"
          }`}
        ></div>

        <button
          onClick={() => setActiveTab("ExtraMart")}
          className={`relative z-10 w-32 text-md sm:text-base font-semibold transition-all duration-300 ${
            activeTab === "ExtraMart"
              ? "text-white"
              : "text-gray-600 hover:text-green-600"
          }`}
        >
          ExtraMart
        </button>

        <button
          onClick={() => setActiveTab("ExtraBakes")}
          className={`relative z-10 w-32 text-md sm:text-base font-semibold transition-all duration-300 ${
            activeTab === "ExtraBakes"
              ? "text-white"
              : "text-gray-600 hover:text-orange-600"
          }`}
        >
          ExtraBakes
        </button>
      </div>

      {/* Search Bar Section */}
      <div className="w-full flex items-center bg-white border border-gray-200 rounded-full px-3 py-2 shadow-sm focus-within:shadow-md focus-within:ring-2 focus-within:ring-green-400 transition-all duration-300">
        <input
          type="text"
          placeholder={`Search in ${activeTab}...`}
          className="flex-1 bg-transparent outline-none px-3 text-gray-700 placeholder-gray-400 text-sm md:text-base"
        />
        <button className="text-green-600 hover:text-green-700 transition-transform hover:scale-110 p-1">
          <FaSearch size={18} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
