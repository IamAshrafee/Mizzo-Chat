import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClear = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  return (
    <form className="w-full my-1">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative rounded-[17px] border-2 border-white"
      >
        <div className=" border-white absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
          ref={inputRef}
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="search"
          id="default-search"
          className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 bg-white rounded-[17px] focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all duration-200"
          required
          aria-label="Search"
        />
      </motion.div>
    </form>
  );
};

export default Search;
