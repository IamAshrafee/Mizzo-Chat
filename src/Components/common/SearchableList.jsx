import React from "react";
import { motion } from "framer-motion";
import { BiSearchAlt2, BiArrowBack } from "react-icons/bi";

const SearchableList = ({ showSearch, onSearchToggle }) => {
  return (
    <>
      {!showSearch ? (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => onSearchToggle(true)}
          className=" flex font-poppins gap-1.5 cursor-pointer text-[13px] justify-center items-center bg-gray-100 border border-gray-100 hover:border hover:border-gray-200 py-1 px-1.5 rounded-lg text-gray-900"
        >
          <BiSearchAlt2 size={18} /> Search
        </motion.button>
      ) : (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => onSearchToggle(false)}
          className=" flex font-poppins gap-2 cursor-pointer text-[13px] justify-center items-center bg-gray-100 border border-gray-100 hover:border hover:border-gray-200 py-1 px-1.5 rounded-lg text-gray-900"
        >
          <BiArrowBack size={18} /> Back
        </motion.button>
      )}
    </>
  );
};

export default SearchableList;
