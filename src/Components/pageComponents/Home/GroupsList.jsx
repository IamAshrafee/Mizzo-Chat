import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfilePicture1 from "../../../assets/images/ProfilePicture1.jpg";

const GroupsList = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.userLogInfo.value);
  const [groupsList, setGroupsList] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState(new Set());
  const [hoveredGroup, setHoveredGroup] = useState(null);

  useEffect(() => {
    const groupsRef = ref(db, "groups/");
    onValue(groupsRef, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        if (item.val().adminUid !== data.user.uid) {
          list.push({ ...item.val(), key: item.key });
        }
      });
      setGroupsList(list);
    });
  }, []);

  const handleJoinGroup = (key) => {
    setJoinedGroups((prev) => new Set(prev).add(key));
  };

  const handleLeaveGroup = (key) => {
    setJoinedGroups((prev) => {
      const newSet = new Set(prev);
      newSet.delete(key);
      return newSet;
    });
  };

  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <div className="h-full bg-white rounded-[20px] flex flex-col">
        <div className="flex justify-between items-center px-[22px] pt-[22px]">
          <h1 className="font-poppins text-[20px] font-[600]">Groups List</h1>
          <BsThreeDotsVertical className="text-[20px] text-gray-500 hover:text-gray-700 cursor-pointer" />
        </div>
        <div className="flex-1 overflow-y-auto px-[22px] pb-[22px]">
          <AnimatePresence>
            {groupsList.map((item) => (
              <motion.div
                key={item.key}
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
                      {item.groupName}
                    </p>
                    <p className="text-primary-des font-poppins text-[12px] font-medium">
                      Admin: {item.adminName}
                    </p>
                  </div>
                </div>
                <div
                  onMouseEnter={() => setHoveredGroup(item.key)}
                  onMouseLeave={() => setHoveredGroup(null)}
                >
                  <AnimatePresence mode="wait">
                    {joinedGroups.has(item.key) ? (
                      hoveredGroup === item.key ? (
                        <motion.button
                          key="leave"
                          onClick={() => handleLeaveGroup(item.key)}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="px-5 p-1 bg-red-600 hover:bg-red-700 text-white rounded-[20px] cursor-pointer font-poppins font-normal"
                        >
                          Leave
                        </motion.button>
                      ) : (
                        <motion.button
                          key="joined"
                          disabled
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="px-5 p-1 bg-gray-300 text-gray-500 rounded-[20px] cursor-not-allowed font-poppins font-normal"
                        >
                          Joined
                        </motion.button>
                      )
                    ) : (
                      <motion.button
                        key="join"
                        onClick={() => handleJoinGroup(item.key)}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="px-5 p-1 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal"
                      >
                        Join
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

export default GroupsList;
