import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfilePicture2 from "../../../assets/images/ProfilePicture2.jpeg";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const db = getDatabase();
  const data = useSelector((state) => state.userLogInfo.value);

  const [FriendRequestList, setFriendRequestList] = useState([]);

  useEffect(() => {
    const FriendRequestRef = ref(db, "FriendRequest/");
    onValue(FriendRequestRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push({
          key: item.key,
          senderUid: item.val().senderUid,
          receiverUid: item.val().receiverUid,
        });
      });
      setFriendRequestList(arr);
    });
  }, []);

  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (data.user.uid !== item.key) {
          arr.push({ ...item.val(), userUid: item.key });
        }
      });
      setUserList(arr);
    });
  }, []);

  const handleFriendRequest = (item) => {
    toast.success("Friend request has been sent!");
    set(push(ref(db, "FriendRequest/")), {
      senderUid: data.user.uid,
      senderName: data.user.displayName,
      receiverUid: item.userUid,
      receiverName: item.username,
      sentAt: Date.now(),
    });
  };

  const handleCancelRequest = (item) => {
    const request = FriendRequestList.find(
      (fr) =>
        (fr.senderUid === data.user.uid && fr.receiverUid === item.userUid) ||
        (fr.senderUid === item.userUid && fr.receiverUid === data.user.uid)
    );
    if (request) {
      const requestRef = ref(db, `FriendRequest/${request.key}`);
      remove(requestRef).then(() => {
        toast.info("Friend request cancelled");
      });
    }
  };

  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <div className="h-full bg-white rounded-[20px]  flex flex-col">
        <div className="flex justify-between items-center px-[22px] pt-[22px]">
          <h1 className="font-poppins text-[20px] font-[600]">User List</h1>
          <BsThreeDotsVertical className="text-[20px] text-gray-500 hover:text-gray-700 cursor-pointer" />
        </div>
        <Toaster position="bottom-right" />
        <div className="flex-1 overflow-y-auto px-[22px] pb-[22px]">
          <AnimatePresence>
            {userList.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={ProfilePicture2} // Use dynamic item image if available
                    alt=""
                    className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                  />
                  <div className="flex flex-col">
                    <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                      {item.username || "Unknown User"}{" "}
                    </p>
                    <p className="text-primary-des font-poppins text-[12px] font-medium">
                      {item.email || "No email"}
                    </p>
                  </div>
                </div>
                <div>
                  <AnimatePresence mode="wait">
                    {FriendRequestList.some(
                      (fr) =>
                        (fr.senderUid === data.user.uid &&
                          fr.receiverUid === item.userUid) ||
                        (fr.senderUid === item.userUid &&
                          fr.receiverUid === data.user.uid)
                    ) ? (
                      <motion.button
                        key="cancel"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        onClick={() => handleCancelRequest(item)}
                        className="px-3 p-2 bg-red-600 hover:bg-red-700 text-white rounded-[20px] cursor-pointer font-poppins font-normal"
                      >
                        <p className="text-[14px]">Cancel</p>
                      </motion.button>
                    ) : (
                      <motion.button
                        key="add"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        onClick={() => handleFriendRequest(item)}
                        className="px-3 p-2 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal"
                      >
                        <BiPlus className="text-white" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UserList;
