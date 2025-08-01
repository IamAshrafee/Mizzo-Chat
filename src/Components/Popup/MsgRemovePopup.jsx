import React from "react";
import { motion } from "framer-motion";

const MsgRemovePopup = ({ onClose, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-[4px] flex justify-center items-center z-40"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 0 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 0 }}
        transition={{ type: "spring", damping: 18, duration: 1 }}
        className="h-max w-max px-5 pt-6 pb-7 bg-gray-200 flex flex-col justify-center rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-center font-medium font-poppins text-[18px]">
          Are you sure you want to delete this message?
        </p>
        <p className="text-center font-[400] font-poppins text-[14px] text-neutral-600 mb-5 mt-2 break-words w-[500px]">
          This action will remove the message for everyone and cannot be undone.
          Make sure you selected the right message.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="bg-gray-300 border border-gray-300 hover:border hover:border-gray-400 px-3 py-1.5 rounded-[12px] cursor-pointer hover: font-poppins text-[16px]"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className=" bg-red-600 text-white hover:bg-red-700 px-3 py-1.5 rounded-[12px] cursor-pointer hover: font-poppins text-[16px]"
          >
            Yes, Remove
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MsgRemovePopup;
