import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatBox = () => {
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

  if (!activeChat) {
    return (
      <div className="flex-2 flex-col flex bg-white rounded-[20px] h-full justify-center items-center">
        <p className="font-poppins text-[20px] font-[600] text-gray-400">
          Please select a chat to start messaging
        </p>
      </div>
    );
  }

  const chatName =
    activeChat.type === "friend"
      ? activeChat.receiverUid === data.user.uid
        ? activeChat.senderName
        : activeChat.receiverName
      : activeChat.groupName;

  return (
    <div className="flex-2 min-h-0">
      <div className="flex-col flex bg-white rounded-[20px] h-full">
        <ChatHeader
          chatName={chatName}
          isGroup={activeChat.type === "group"}
        />
        <MessageList
          messages={messages}
          currentUserId={data.user.uid}
          currentUserDisplayName={data.user.displayName}
          isGroupChat={activeChat.type === "group"}
        />
        <MessageInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onSend={handleMessageSend}
          onKeyDown={(e) => e.key === "Enter" && handleMessageSend()}
          currentUserDisplayName={data.user.displayName}
        />
      </div>
    </div>
  );
};

export default ChatBox;

