import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfilePicture2 from "../../../assets/images/ProfilePicture2.jpeg";
import { BiArrowBack, BiPlus, BiSearchAlt2 } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";

const UserList = ({ searchTerm, showSearch, onSearchToggle }) => {
  const [userList, setUserList] = useState([]);
  const db = getDatabase();
  const data = useSelector((state) => state.userLogInfo.value);

  const [friendRequestList, setFriendRequestList] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

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

    const friendRequestRef = ref(db, "FriendRequest/");
    onValue(friendRequestRef, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        list.push({ ...item.val(), key: item.key });
      });
      setFriendRequestList(list);
    });

    const friendsRef = ref(db, "friends/");
    onValue(friendsRef, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        list.push({ ...item.val(), key: item.key });
      });
      setFriendsList(list);
    });
  }, [data.user.uid, db]);

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
    const request = friendRequestList.find(
      (fr) => fr.senderUid === data.user.uid && fr.receiverUid === item.userUid
    );
    if (request) {
      remove(ref(db, `FriendRequest/${request.key}`)).then(() => {
        toast.info("Friend request cancelled");
      });
    }
  };

  const getButtonState = (item) => {
    const isFriend = friendsList.some(
      (f) =>
        (f.senderUid === data.user.uid && f.receiverUid === item.userUid) ||
        (f.senderUid === item.userUid && f.receiverUid === data.user.uid)
    );
    if (isFriend) return "Friends";

    const sentRequest = friendRequestList.some(
      (fr) => fr.senderUid === data.user.uid && fr.receiverUid === item.userUid
    );
    if (sentRequest) return "Pending";

    const receivedRequest = friendRequestList.some(
      (fr) => fr.senderUid === item.userUid && fr.receiverUid === data.user.uid
    );
    if (receivedRequest) return "Accept";

    return "Add";
  };

  const filteredUsers = userList.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <div className="h-full bg-white rounded-[20px]  flex flex-col">
        <div className="flex justify-between items-center px-[22px] pt-[22px] pb-[10px]">
          <h1 className="font-poppins text-[20px] font-[600]">User List</h1>
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
        <Toaster position="bottom-right" />
        <div className="flex-1 overflow-y-auto px-[22px] pb-[22px]">
          <AnimatePresence>
            {filteredUsers.map((item, index) => {
              const buttonState = getButtonState(item);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex mt-2 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={ProfilePicture2}
                      alt=""
                      className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                    />
                    <div className="flex flex-col">
                      <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                        {item.username || "Unknown User"}
                      </p>
                      <p className="text-primary-des font-poppins text-[12px] font-medium">
                        {item.email || "No email"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <AnimatePresence mode="wait">
                      {buttonState === "Add" && (
                        <motion.button
                          key="add"
                          onClick={() => handleFriendRequest(item)}
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          className="px-3 p-2 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal"
                        >
                          <BiPlus className="text-white" />
                        </motion.button>
                      )}
                      {buttonState === "Pending" && (
                        <motion.button
                          key="cancel"
                          onClick={() => handleCancelRequest(item)}
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          className="px-3 p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-[20px] cursor-pointer font-poppins font-normal"
                        >
                          <p className="text-[14px]">Pending</p>
                        </motion.button>
                      )}
                      {buttonState === "Friends" && (
                        <motion.button
                          key="friends"
                          disabled
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          className="px-3 p-1 bg-green-600 text-white rounded-[20px] cursor-not-allowed font-poppins font-normal"
                        >
                          <p className="text-[14px]">Friends</p>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UserList;
