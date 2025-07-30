import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfilePicture from "../../../assets/images/ProfilePicture.jpg";
import ProfilePicture1 from "../../../assets/images/ProfilePicture1.jpg";
import GroupProfilePicture2 from "../../../assets/images/ProfilePicture2.jpeg";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, push, set } from "firebase/database";

const Chat = () => {
  const db = getDatabase();
  const activeChat = useSelector((state) => state.activeChat.value);
  const data = useSelector((state) => state.userLogInfo.value);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleMessageSend = () => {
    if (message.trim() !== "") {
      const messageRef = ref(db, "messages/");
      const newMessageRef = push(messageRef);
      set(newMessageRef, {
        senderId: data.user.uid,
        senderName: data.user.displayName,
        receiverId:
          activeChat.type === "friend"
            ? activeChat.receiverUid === data.user.uid
              ? activeChat.senderUid
              : activeChat.receiverUid
            : activeChat.key,
        message: message,
        timestamp: Date.now(),
        type: activeChat.type,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    if (activeChat) {
      const messageRef = ref(db, "messages/");
      onValue(messageRef, (snapshot) => {
        const messageList = [];
        snapshot.forEach((item) => {
          if (
            (item.val().type === "friend" &&
              ((item.val().senderId === data.user.uid &&
                item.val().receiverId ===
                  (activeChat.receiverUid === data.user.uid
                    ? activeChat.senderUid
                    : activeChat.receiverUid)) ||
                (item.val().senderId ===
                  (activeChat.receiverUid === data.user.uid
                    ? activeChat.senderUid
                    : activeChat.receiverUid) &&
                  item.val().receiverId === data.user.uid))) ||
            (item.val().type === "group" &&
              item.val().receiverId === activeChat.key)
          ) {
            messageList.push({ ...item.val(), key: item.key });
          }
        });
        setMessages(messageList);
      });
    }
  }, [activeChat, data.user.uid, db]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    return date.toLocaleDateString();
  };

  const renderMessages = () => {
    let lastDate = null;
    return messages.map((item) => {
      const currentDate = formatTimestamp(item.timestamp);
      const showDate = currentDate !== lastDate;
      lastDate = currentDate;
      return (
        <div key={item.key}>
          {showDate && (
            <div className="text-center my-4">
              <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full">
                {currentDate}
              </span>
            </div>
          )}
          <div
            className={`flex items-end gap-3 mb-4 ${
              item.senderId === data.user.uid ? "flex-row-reverse" : ""
            }`}
          >
            <img
              src={
                item.senderId === data.user.uid
                  ? ProfilePicture
                  : ProfilePicture1
              }
              alt=""
              className="rounded-full w-[30px] h-[30px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)] flex-shrink-0"
            />
            <div
              className={`flex flex-col max-w-[80%] ${
                item.senderId === data.user.uid ? "items-end" : "items-start"
              }`}
            >
              {activeChat.type === "group" &&
                item.senderId !== data.user.uid && (
                  <p
                    className={`text-primary-des font-poppins text-[12px] font-medium mb-1 ${
                      item.senderId === data.user.uid ? "text-right" : ""
                    }`}
                  >
                    {item.senderName}
                  </p>
                )}
              <div
                className={`flex gap-2 rounded-lg px-[14px] py-2 shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)] max-w-[80vw] ${
                  item.senderId === data.user.uid
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100"
                }`}
              >
                <p className="font-poppins m-0 text-[15px] font-[400] break-all whitespace-pre-wrap">
                  {item.message}
                </p>
                <p
                  className={`text-xs flex items-end font-medium flex-shrink-0 ${
                    item.senderId === data.user.uid
                      ? "text-gray-300"
                      : "text-gray-500"
                  }`}
                >
                  {new Date(item.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex-2 min-h-0">
      {activeChat ? (
        <div className="flex-col flex bg-white rounded-[20px] h-full">
          {/* Header */}
          <div className="px-[28px] pt-[28px]">
            <div className="flex justify-between items-center pb-3.5 border-b border-gray-200">
              <div className="flex flex-row items-center gap-3">
                {/* Chat's Profile Picture  */}
                <img
                  src={
                    activeChat.type === "friend"
                      ? ProfilePicture1
                      : GroupProfilePicture2
                  }
                  alt=""
                  className="rounded-full w-[60px] h-[60px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                />
                <div>
                  {/* ChatName  */}
                  <p className="font-poppins m-0 p-0 text-[19px] font-[600]">
                    {activeChat.type === "friend"
                      ? activeChat.receiverUid === data.user.uid
                        ? activeChat.senderName
                        : activeChat.receiverName
                      : activeChat.groupName}
                  </p>
                  <p className="text-primary-des font-poppins text-[12px] font-medium">
                    Active Now
                  </p>
                </div>
              </div>
              <div>
                <button>
                  <BsThreeDotsVertical className="text-[20px] text-gray-500 hover:text-gray-700 cursor-pointer" />
                </button>
              </div>
            </div>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-[28px] pt-[28px] pb-[28px]">
            <div className="max-w-full">{renderMessages()}</div>
          </div>

          {/* Input Area */}
          <div className="px-[28px] pb-[28px]">
            <div className="flex items-center gap-3">
              <img
                src={ProfilePicture}
                alt=""
                className="rounded-full w-[40px] h-[40px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
              />
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-des"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleMessageSend()}
              />
              <button
                className="bg-primary-des text-white rounded-lg py-2 px-4 hover:bg-primary-dark transition-colors"
                onClick={handleMessageSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-col flex bg-white rounded-[20px] h-full justify-center items-center">
          <p className="font-poppins text-[20px] font-[600] text-gray-400">
            Please select a chat to start messaging
          </p>
        </div>
      )}
    </div>
  );
};

export default Chat;
