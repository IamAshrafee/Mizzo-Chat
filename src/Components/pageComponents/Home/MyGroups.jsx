import { BiArrowBack } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfilePicture2 from "../../../assets/images/ProfilePicture1.jpg";
import GroupProfilePicture2 from "../../../assets/images/ProfilePicture2.jpeg";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import { toast, Toaster } from "sonner";

const MyGroups = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const db = getDatabase();
  const data = useSelector((state) => state.userLogInfo.value);

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [myGroupsList, setMyGroupsList] = useState([]);
  const [groupNameError, setGroupNameError] = useState("");

  const handleGroupName = (e) => {
    setGroupName(e.target.value);
    setGroupNameError("");
  };

  const handleGroupDescription = (e) => {
    setGroupDescription(e.target.value);
  };

  const handleCreateGroup = () => {
    if (!groupName) {
      setGroupNameError("Required!");
      return;
    }

    set(push(ref(db, "groups")), {
      groupName,
      groupDescription: groupDescription || "Mizzo-Life, chat everywhere...",
      adminName: data.user.displayName,
      adminUid: data.user.uid,
      createdAt: Date.now(),
    }).then(() => {
      toast.success("Group created successfully!");
      setShowCreateGroup(false);
      setGroupName("");
      setGroupDescription("");
    });
  };

  const handleDeleteGroup = (key) => {
    remove(ref(db, "groups/" + key)).then(() => {
      toast.success("Group deleted successfully!");
    });
  };

  useEffect(() => {
    const groupsRef = ref(db, "groups/");
    onValue(groupsRef, (snapshot) => {
      const list = [];
      snapshot.forEach((item) => {
        if (item.val().adminUid === data.user.uid) {
          list.push({ ...item.val(), key: item.key });
        }
      });
      setMyGroupsList(list);
    });
  }, [data.user.uid, db]);

  const handleShowNotification = () => {
    setShowNotification(true);
    setShowCreateGroup(false);
  };

  const handleShowCreateGroup = () => {
    setShowCreateGroup(true);
    setShowNotification(false);
  };

  const handleBack = () => {
    setShowCreateGroup(false);
    setShowNotification(false);
  };

  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <Toaster position="bottom-right" />
      <div className="h-full bg-white rounded-[20px] flex flex-col">
        <div className="flex justify-between items-center px-[22px] pt-[22px]">
          <h1 className="font-poppins text-[20px] font-[600]">My Groups</h1>
          <div className="flex gap-2 ">
            <AnimatePresence>
              {!showNotification && !showCreateGroup && (
                <>
                  <div className="relative">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      onClick={handleShowNotification}
                      className="z-0 flex font-poppins gap-2 cursor-pointer text-[13px] justify-center items-center bg-gray-100 border border-gray-100 hover:border hover:border-gray-200 py-1 px-1.5 rounded-lg text-gray-900"
                    >
                      <IoMdNotificationsOutline size={18} />
                      <div className="absolute top-[-4px] left-[-4px] z-1 h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center text-center text-[10px] text-white">
                        1
                      </div>

                      <span>Requests</span>
                    </motion.button>
                  </div>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={handleShowCreateGroup}
                    className="flex font-poppins gap-2 cursor-pointer text-[13px] justify-center items-center bg-gray-100 border border-gray-100 hover:border hover:border-gray-200 py-1 px-1.5 rounded-lg text-gray-900"
                  >
                    <MdOutlineCreateNewFolder size={18} /> Create new group
                  </motion.button>
                </>
              )}
              {(showNotification || showCreateGroup) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  onClick={handleBack}
                  className=" flex font-poppins gap-2 cursor-pointer text-[13px] justify-center items-center bg-gray-100 border border-gray-100 hover:border hover:border-gray-200 py-1 px-1.5 rounded-lg text-gray-900"
                >
                  <BiArrowBack size={18} /> Back
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {showNotification ? (
            <motion.div
              key="notification-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 overflow-y-auto px-[22px] pb-[22px]"
            >
              {/* Notification Panel Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={ProfilePicture2}
                    alt=""
                    className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                  />
                  <div className="flex flex-col">
                    <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                      Jackey Dane
                    </p>
                    <p className="text-primary-des font-poppins text-[12px] font-medium">
                      Wants to join -{" "}
                      <span className="text-gray-700">Big Boss</span>
                    </p>
                  </div>
                </div>
                <div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer bg-green-600 text-white py-1.5 px-3 hover:bg-green-700 rounded-2xl text-[14px] font-poppins flex items-center justify-center"
                  >
                    Accept
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ) : showCreateGroup ? (
            <motion.div
              key="create-group-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 overflow-y-auto px-[22px] pb-[22px] font-poppins text-[14px] flex flex-col justify-center items-center gap-2.5"
            >
              {/* Create Group Panel Content */}
              <div>
                <p className="text-[18px] text-center border-b border-b-gray-200 pb-2.5 px-2.5">
                  Create a new group!
                </p>
              </div>
              <div className="flex flex-col w-[90%]">
                <label
                  htmlFor="groupName"
                  className="text-gray-800 mb-1 flex gap-1"
                >
                  {"Name "} <p className="text-red-500">{groupNameError}</p>
                </label>
                <input
                  onChange={handleGroupName}
                  value={groupName}
                  type="text"
                  className={`mb-2.5 border ${
                    groupNameError ? "border-red-500" : "border-gray-200"
                  } rounded-lg text-[16px] px-1.5 py-1.5 focus:outline-gray-300 font-poppins`}
                />
                <label
                  htmlFor="groupDescription"
                  className="text-gray-800 mb-1 mt-2"
                >
                  Description
                </label>
                <textarea
                  onChange={handleGroupDescription}
                  value={groupDescription}
                  rows="3"
                  className="mb-2.5 border border-gray-200 rounded-lg text-[16px] px-1.5 py-1.5 focus:outline-gray-300 font-poppins resize-none"
                ></textarea>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleCreateGroup}
                  className="flex cursor-pointer text-[14px] justify-center items-center bg-gray-100 border border-gray-100 hover:border hover:border-gray-200 py-1.5 px-4 rounded-lg font-medium text-gray-900"
                >
                  Create Now
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="group-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 overflow-y-auto px-[22px] pb-[22px]"
            >
              {/* My Groups List */}
              <AnimatePresence>
                {myGroupsList.map((item) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                    className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={GroupProfilePicture2}
                        alt=""
                        className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                      />
                      <div className="flex flex-col">
                        <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                          {item.groupName}
                        </p>
                        <p className="text-primary-des font-poppins text-[12px] font-medium">
                          {item.groupDescription}
                        </p>
                      </div>
                    </div>
                    <div>
                      <motion.button
                        onClick={() => handleDeleteGroup(item.key)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer bg-red-600 text-white py-1.5 px-3 hover:bg-red-700 rounded-2xl text-[14px] font-poppins flex items-center justify-center"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyGroups;
