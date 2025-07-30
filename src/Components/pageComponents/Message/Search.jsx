import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  const [showClear, setShowClear] = useState(false);
  return (
    <div>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative shadow-[0_4px_20px_-5px_rgba(0,0,0,0.15)] rounded-[20px] border border-white flex items-center justify-center">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowClear(true);
          }}
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 bg-white rounded-[20px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        {!showClear ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => setSearchTerm("")}
          ></motion.button>
        ) : (
          <button
            onClick={() => {
              setSearchTerm("");
              setShowClear(false);
            }}
            className="text-white absolute end-2.5 bottom-2.5 bg-slate-900 hover:bg-slate-800 focus:ring-2 font-medium rounded-[20px] text-sm px-4 py-1.5 transition-colors cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
