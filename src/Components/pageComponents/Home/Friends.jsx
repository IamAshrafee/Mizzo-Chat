import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import ProfilePicture1 from "../../../assets/images/ProfilePicture1.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";

const Friends = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLogInfo.value);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    const friendRef = ref(db, "friends/");
    onValue(friendRef, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        if (
          item.val().receiverUid === data.user.uid ||
          item.val().senderUid === data.user.uid
        ) {
          list.push({ ...item.val(), key: item.key });
        }
      });
      setFriendList(list);
    });
  }, []);

  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <div className="h-full bg-white rounded-[20px] flex flex-col">
        <div className="flex justify-between items-center px-[22px] pt-[22px]">
          <h1 className="font-poppins text-[20px] font-[600]">Friends</h1>
          <BsThreeDotsVertical className="text-[20px] text-gray-500 hover:text-gray-700 cursor-pointer" />
        </div>
        <div className="flex-1 overflow-y-auto px-[22px] pb-[22px]">
          <AnimatePresence>
            {friendList.map((item) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={ProfilePicture1} 
                    alt="Profile"
                    className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                  />
                  <div className="flex flex-col">
                    <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                      {/* Display the friend's name, not the current user's name */}
                      {item.receiverUid === data.user.uid
                        ? item.senderName
                        : item.receiverName}
                    </p>
                    <p className="text-primary-des font-poppins text-[12px] font-medium">
                      Some message...
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-primary-opacity font-poppins text-[10px] font-medium">
                    Today, 5:20pm
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Friends;