import React from "react";
import Message from "./Message";

const MessageList = ({ messages, currentUserId, currentUserDisplayName, isGroupChat }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString();
  };

  let lastDate = null;

  return (
    <div className="flex-1 overflow-y-auto px-[28px] pt-[28px] pb-[28px]">
      <div className="max-w-full">
        {messages.map((item) => {
          const currentDate = formatTimestamp(item.timestamp);
          const showDate = currentDate !== lastDate;
          lastDate = currentDate;
          const isSender = item.senderId === currentUserId;

          return (
            <div key={item.key}>
              {showDate && (
                <div className="text-center my-4">
                  <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full">
                    {currentDate}
                  </span>
                </div>
              )}
              <Message
                message={item}
                isSender={isSender}
                isGroupChat={isGroupChat}
                senderName={item.senderName}
                currentUserDisplayName={currentUserDisplayName}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageList;
