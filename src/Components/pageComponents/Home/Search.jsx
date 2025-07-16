import React from "react";

const Search = () => {
  return (
    <form className="w-full">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative shadow-[0_4px_20px_-5px_rgba(0,0,0,0.15)] rounded-[20px]">
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
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 bg-white rounded-[20px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Groups, Friends, Chats..."
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-slate-900 hover:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium rounded-[20px] text-sm px-4 py-2 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
