import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfilePicture2 from "../../../assets/images/ProfilePicture2.jpeg";

const MyGroups = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <div className="h-full bg-white rounded-[20px] flex flex-col">
        <div className="flex justify-between items-center px-[22px] pt-[22px]">
          <h1 className="font-poppins text-[20px] font-[600]">My Groups</h1>
          <AnimatePresence>
            {!showCreateGroup && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => setShowCreateGroup(true)}
                className="flex font-poppins gap-2 cursor-pointer text-[13px] justify-center items-center bg-gray-100 border border-gray-100 hover:border hover:border-gray-200 py-1 px-1.5 rounded-lg text-gray-900"
              >
                <MdOutlineCreateNewFolder size={18} /> Create new group
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {showCreateGroup ? (
            <motion.div
              key="create-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 overflow-y-auto px-[22px] pb-[22px] font-poppins text-[14px]"
            >
              <div className="flex flex-col justify-center items-center gap-2.5">
                <div>
                  <p className="text-[18px] text-center border-b border-b-gray-200 pb-2.5 px-2.5 mt-2.5">
                    Create a new group!
                  </p>
                </div>
                <div className="flex flex-col w-[90%]">
                  <label htmlFor="groupName" className="text-gray-800 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="mb-2.5 border border-gray-200 rounded-lg text-[16px] px-1.5 py-1.5 focus:outline-gray-300 font-poppins"
                  />
                  <label
                    htmlFor="groupDescription"
                    className="text-gray-800 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    rows="3"
                    className="mb-2.5 border border-gray-200 rounded-lg text-[16px] px-1.5 py-1.5 focus:outline-gray-300 font-poppins resize-none"
                  ></textarea>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowCreateGroup(false)}
                    className="flex cursor-pointer text-[14px] justify-center items-center bg-gray-100 border border-gray-100 hover:border hover:border-gray-200 py-1.5 px-4 rounded-lg font-medium text-gray-900"
                  >
                    Create Now
                  </button>
                  <button
                    onClick={() => setShowCreateGroup(false)}
                    className="flex cursor-pointer text-[14px] justify-center items-center bg-gray-100 border border-gray-100 hover:border hover:border-gray-200 py-1.5 px-4 rounded-lg font-medium text-gray-900"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="group-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 overflow-y-auto px-[22px] pb-[22px]"
            >
              <div className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3">
                  <img
                    src={ProfilePicture2}
                    alt=""
                    className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                  />
                  <div className="flex flex-col">
                    <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                      Friends groups
                    </p>
                    <p className="text-primary-des font-poppins text-[12px] font-medium">
                      Dinner?
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-primary-opacity font-poppins text-[10px] font-medium">
                    Today, 8:56pm
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyGroups;
