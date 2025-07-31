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
import { BiPlus } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import Avatar from "../../common/Avatar";
import Card from "../../common/Card";
import SearchableList from "../../common/SearchableList";

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
    <Card
      title="User List"
      headerContent={
        <div className="flex gap-1.5 items-center">
          <SearchableList
            searchTerm={searchTerm}
            showSearch={showSearch}
            onSearchToggle={onSearchToggle}
          />
          <BsThreeDotsVertical className="text-[20px] text-gray-500 hover:text-gray-700 cursor-pointer" />
        </div>
      }
    >
      <Toaster position="bottom-right" />
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
                <Avatar name={item.username} />
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
    </Card>
  );
};

export default UserList;

