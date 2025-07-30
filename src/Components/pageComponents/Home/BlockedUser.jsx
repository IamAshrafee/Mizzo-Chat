import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfilePicture1 from "../../../assets/images/ProfilePicture1.jpg";
import { toast, Toaster } from "sonner";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";

const BlockedUser = ({ searchTerm, showSearch, onSearchToggle }) => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLogInfo.value);
  const [blockedList, setBlockedList] = useState([]);

  useEffect(() => {
    const blockedRef = ref(db, "blocked/");
    onValue(blockedRef, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        if (item.val().blockerUid === data.user.uid) {
          list.push({ ...item.val(), key: item.key });
        }
      });
      setBlockedList(list);
    });
  }, [data.user.uid, db]);

  const handleUnblock = (key) => {
    remove(ref(db, "blocked/" + key)).then(() => {
      toast.success("User has been unblocked.");
    });
  };

  const filteredBlockedUsers = blockedList.filter((user) =>
    user.blockedName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <Toaster position="bottom-right" />
      <div className="h-full bg-white rounded-[20px] flex flex-col">
        <div className="flex justify-between items-center px-[22px] pt-[22px] pb-[10px]">
          <h1 className="font-poppins text-[20px] font-[600]">Blocked Users</h1>
          <div className="flex gap-1.5 items-center justify-center">
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
            <BsThreeDotsVertical className="text-[20px] text-gray-500 hover:text-gray-700 cursor-pointer" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-[22px] pb-[22px]">
          <AnimatePresence>
            {filteredBlockedUsers.map((item) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                className="flex mt-2 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={ProfilePicture1}
                    alt="Profile"
                    className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                  />
                  <div className="flex flex-col">
                    <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                      {item.blockedName}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleUnblock(item.key)}
                    className="px-5 p-1 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal"
                  >
                    Unblock
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BlockedUser;
