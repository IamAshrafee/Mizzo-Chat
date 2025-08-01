import { MdOutlineDelete } from "react-icons/md";
import React, { useState } from "react";
import Avatar from "../../common/Avatar";
import MsgRemovePopup from "../../Popup/MsgRemovePopup";
import deleteMessage from "./deleteMessage";

const Message = ({
  message,
  isSender,
  isGroupChat,
  senderName,
  currentUserDisplayName,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = () => {
    deleteMessage(message.key);
    setShowPopup(false);
  };

  const isDeleted = message.message === "Message deleted";

  return (
    <div
      className={`flex items-end gap-3 mb-4 group ${
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
          className={` flex  items-center justify-center gap-2.5  ${
            isSender ? "flex-row-reverse" : "flex-row"
          } `}
        >
          <div
            className={`flex gap-2 rounded-lg px-[14px] py-2 shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)] max-w-[80vw] ${
              isSender ? "bg-slate-900 text-white" : "bg-slate-100"
            } ${isDeleted ? "bg-red-200 border-red-400" : ""}`}
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
          {/* delete msg button  */}
          {!isDeleted && (
            <div
              onClick={() => setShowPopup(true)}
              className={`bg-slate-100 border rounded-[14px] border-slate-200 cursor-pointer flex items-center justify-center h-[35px] w-[35px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isSender ? "block" : "hidden"
              } `}
            >
              <MdOutlineDelete size={20} className="text-slate-600" />
            </div>
          )}
        </div>
      </div>
      {showPopup && (
        <MsgRemovePopup
          onClose={() => setShowPopup(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Message;
