import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfilePicture1 from "../../../assets/images/ProfilePicture1.jpg";
import ProfilePicture2 from "../../../assets/images/ProfilePicture2.jpeg";
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

const FriendRequest = () => {
  const data = useSelector((state) => state.userLogInfo.value);

  const [FriendRequestList, setFriendRequestList] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const FriendRequestRef = ref(db, "FriendRequest/");
    onValue(FriendRequestRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (data.user.uid === item.val().receiverUid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setFriendRequestList(arr);
    });
  }, []);

  const handleAcceptRequest = (item) => {
    set(push(ref(db, "friends")), {
      ...item,
    }).then(() => {
      remove(ref(db, "FriendRequest/" + item.key)).then(() => {
        toast.success("Friend request accepted");
      });
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

  return (
    <>
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full bg-white rounded-[20px]  flex flex-col">
          <div className="flex justify-between items-center px-[22px] pt-[22px]">
            <h1 className="font-poppins text-[20px] font-[600]">
              <Toaster position="bottom-right" /> Friends Requests
            </h1>
            <BsThreeDotsVertical className="text-[20px] text-gray-500 hover:text-gray-700 cursor-pointer" />
          </div>
          <div className="flex-1 overflow-y-auto px-[22px] pb-[22px]">
            <AnimatePresence>
              {FriendRequestList.map((item) => (
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
                      alt=""
                      className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                    />
                    <div className="flex flex-col">
                      <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                        {item.senderName}
                      </p>
                      <p className="text-primary-des font-poppins text-[12px] font-medium">
                        Request sent at {formatTimestamp(item.sentAt)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <motion.button
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      onClick={() => handleAcceptRequest(item)}
                      className="px-5 p-1 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal"
                    >
                      Accept
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
