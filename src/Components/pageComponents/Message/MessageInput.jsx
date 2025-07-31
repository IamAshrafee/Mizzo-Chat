import React from "react";
import Avatar from "../../common/Avatar";

const MessageInput = ({
  value,
  onChange,
  onSend,
  onKeyDown,
  currentUserDisplayName,
}) => {
  return (
    <div className="px-[28px] pb-[28px]">
      <div className="flex items-center gap-3">
        <Avatar name={currentUserDisplayName} size="medium" />
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-des"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <button
          className="bg-primary-des text-white rounded-lg py-2 px-4 hover:bg-primary-dark transition-colors"
          onClick={onSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
