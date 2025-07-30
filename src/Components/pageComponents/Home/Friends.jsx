import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import { useSelector } from "react-redux";
import ProfilePicture1 from "../../../assets/images/ProfilePicture1.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineUserDelete } from "react-icons/ai";
import { CgBlock } from "react-icons/cg";
import { toast, Toaster } from "sonner";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";

const Friends = ({ searchTerm, showSearch, onSearchToggle }) => {
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
  }, [data.user.uid, db]);

  const handleUnfriend = (key) => {
    remove(ref(db, "friends/" + key)).then(() => {
      toast.success("Friend removed successfully.");
    });
  };

  const handleBlock = (item) => {
    const blockedUser = {
      blockerUid: data.user.uid,
      blockedUid:
        item.receiverUid === data.user.uid ? item.senderUid : item.receiverUid,
      blockedName:
        item.receiverUid === data.user.uid
          ? item.senderName
          : item.receiverName,
    };

    set(push(ref(db, "blocked/")), blockedUser).then(() => {
      remove(ref(db, "friends/" + item.key)).then(() => {
        toast.error("User has been blocked.");
      });
    });
  };

  const filteredFriends = friendList.filter((friend) => {
    const friendName =
      friend.receiverUid === data.user.uid
        ? friend.senderName
        : friend.receiverName;
    return friendName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <Toaster position="bottom-right" />
      <div className="h-full bg-white rounded-[20px] flex flex-col">
        <div className="flex justify-between items-center px-[22px] pt-[22px]  pb-[10px]">
          <h1 className="font-poppins text-[20px] font-[600]">Friends</h1>
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
            {filteredFriends.map((item) => (
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
                      {item.receiverUid === data.user.uid
                        ? item.senderName
                        : item.receiverName}
                    </p>
                    <p className="text-primary-des font-poppins text-[12px] font-medium">
                      Some message...
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUnfriend(item.key)}
                    className="bg-gray-200 border border-gray-200 hover:border hover:border-gray-400 py-1.5 rounded-2xl flex justify-center items-center px-3 cursor-pointer"
                  >
                    <AiOutlineUserDelete size={17} />
                  </button>
                  <button
                    onClick={() => handleBlock(item)}
                    className="bg-gray-200 border border-gray-200 hover:border hover:border-gray-400 py-1.5 rounded-2xl flex justify-center items-center px-3 cursor-pointer"
                  >
                    <CgBlock size={17} />
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

export default Friends;
