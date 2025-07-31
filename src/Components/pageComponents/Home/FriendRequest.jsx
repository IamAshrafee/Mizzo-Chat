import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Avatar from "../../common/Avatar";
import {
  getDatabase,
  onValue,
  ref,
  set,
  remove,
  push,
} from "firebase/database";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
import Card from "../../common/Card";
import SearchableList from "../../common/SearchableList";

const FriendRequest = ({ searchTerm, showSearch, onSearchToggle }) => {
  const data = useSelector((state) => state.userLogInfo.value);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const friendRequestRef = ref(db, "FriendRequest/");
    onValue(friendRequestRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (data.user.uid === item.val().receiverUid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setFriendRequestList(arr);
    });
  }, [data.user.uid, db]);

  const handleAcceptRequest = (item) => {
    set(push(ref(db, "friends")), {
      senderUid: item.senderUid,
      senderName: item.senderName,
      receiverUid: item.receiverUid,
      receiverName: item.receiverName,
    }).then(() => {
      remove(ref(db, "FriendRequest/" + item.key)).then(() => {
        toast.success("Friend request accepted");
      });
    });
  };

  const handleRejectRequest = (item) => {
    remove(ref(db, "FriendRequest/" + item.key)).then(() => {
      toast.error("Friend request rejected");
    });
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const sentDate = new Date(timestamp);

    const isToday = now.toDateString() === sentDate.toDateString();
    const isYesterday =
      new Date(now.setDate(now.getDate() - 1)).toDateString() ===
      sentDate.toDateString();

    if (isToday) {
      return `Today ${sentDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`;
    } else if (isYesterday) {
      return `Yesterday ${sentDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`;
    } else {
      return sentDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  };

  const filteredFriendRequests = friendRequestList.filter((request) =>
    request.senderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card
      title="Friend Requests"
      headerContent={
        <div className="flex gap-1.5 items-center justify-center">
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
        {filteredFriendRequests.map((item) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex mt-2 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center gap-3">
              <Avatar name={item.senderName} />
              <div className="flex flex-col">
                <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                  {item.senderName}
                </p>
                <p className="text-primary-des font-poppins text-[12px] font-medium">
                  Request sent at {formatTimestamp(item.sentAt)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={() => handleAcceptRequest(item)}
                className="px-5 p-1 bg-green-600 hover:bg-green-700 text-white rounded-[20px] cursor-pointer font-poppins font-normal"
              >
                Accept
              </motion.button>
              <motion.button
                onClick={() => handleRejectRequest(item)}
                className="px-5 p-1 bg-red-600 hover:bg-red-700 text-white rounded-[20px] cursor-pointer font-poppins font-normal"
              >
                Reject
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </Card>
  );
};

export default FriendRequest;

