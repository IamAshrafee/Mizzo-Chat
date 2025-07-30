import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import ProfilePicture1 from "../../../assets/images/ProfilePicture1.jpg";
import GroupProfilePicture2 from "../../../assets/images/ProfilePicture2.jpeg";

const ChatList = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLogInfo.value);
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const friendRef = ref(db, "friends/");
    onValue(friendRef, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        if (
          item.val().receiverUid === data.user.uid ||
          item.val().senderUid === data.user.uid
        ) {
          list.push({ ...item.val(), key: item.key, type: "friend" });
        }
      });
      setFriends(list);
    });

    const groupsRef = ref(db, "groups/");
    onValue(groupsRef, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        // groups created by user
        if (item.val().adminUid === data.user.uid) {
          list.push({ ...item.val(), key: item.key, type: "group" });
        }
      });

      // groups joined by user
      const joinRequestsRef = ref(db, "groupJoinRequests/");
      onValue(joinRequestsRef, (snapshot) => {
        snapshot.forEach((item) => {
          if (
            item.val().requesterId === data.user.uid &&
            item.val().status === "accepted"
          ) {
            onValue(ref(db, "groups/" + item.val().groupId), (groupSnapshot) => {
              if (groupSnapshot.exists()) {
                list.push({
                  ...groupSnapshot.val(),
                  key: groupSnapshot.key,
                  type: "group",
                });
              }
            });
          }
        });
        setGroups(list);
      });
    });
  }, [data.user.uid, db]);

  const chatList = [...friends, ...groups].sort(
    (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
  );

  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <div className="h-full bg-white rounded-[20px] flex flex-col">
        <div className="flex justify-between items-center px-[22px] pt-[22px]">
          <h1 className="font-poppins text-[20px] font-[600]">Chats</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-[22px] pb-[22px]">
          <AnimatePresence>
            {chatList.map((item) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      item.type === "friend"
                        ? ProfilePicture1
                        : GroupProfilePicture2
                    }
                    alt="Profile"
                    className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                  />
                  <div className="flex flex-col">
                    <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                      {item.type === "friend"
                        ? item.receiverUid === data.user.uid
                          ? item.senderName
                          : item.receiverName
                        : item.groupName}
                    </p>
                    <p className="text-primary-des font-poppins text-[12px] font-medium">
                      {item.type === "group"
                        ? item.groupDescription
                        : "Some message..."}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ChatList;