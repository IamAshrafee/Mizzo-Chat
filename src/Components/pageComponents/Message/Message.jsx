import React from "react";
import Avatar from "../../common/Avatar";

const Message = ({ message, isSender, isGroupChat, senderName, currentUserDisplayName }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`flex items-end gap-3 mb-4 ${
        isSender ? "flex-row-reverse" : ""
      }`}
    >
      <Avatar
        name={isSender ? currentUserDisplayName : senderName}
        size="small"
      />
      <div
        className={`flex flex-col max-w-[80%] ${
          isSender ? "items-end" : "items-start"
        }`}
      >
        {isGroupChat && !isSender && (
          <p
            className={`text-primary-des font-poppins text-[12px] font-medium mb-1 ${
              isSender ? "text-right" : ""
            }`}
          >
            {senderName}
          </p>
        )}
        <div
          className={`flex gap-2 rounded-lg px-[14px] py-2 shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)] max-w-[80vw] ${
            isSender ? "bg-slate-900 text-white" : "bg-slate-100"
          }`}
        >
          <p className="font-poppins m-0 text-[15px] font-[400] break-all whitespace-pre-wrap">
            {message.message}
          </p>
          <p
            className={`text-xs flex items-end font-medium flex-shrink-0 ${
              isSender ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
