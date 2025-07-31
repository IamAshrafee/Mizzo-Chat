import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Avatar from "../../common/Avatar";

const ChatHeader = ({ chatName, isGroup, status, avatarSize = "xlarge" }) => {
  return (
    <div className="px-[28px] pt-[28px]">
      <div className="flex justify-between items-center pb-3.5 border-b border-gray-200">
        <div className="flex flex-row items-center gap-3">
          <Avatar name={chatName} isGroup={isGroup} size={avatarSize} />
          <div>
            <p className="font-poppins m-0 p-0 text-[19px] font-[600]">
              {chatName}
            </p>
            <p className="text-primary-des font-poppins text-[12px] font-medium">
              {status || "Active Now"}
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
  );
};

export default ChatHeader;
