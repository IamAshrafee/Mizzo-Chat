import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfilePicture from "../../../assets/images/ProfilePicture.jpg";
import ProfilePicture1 from "../../../assets/images/ProfilePicture1.jpg";
import GroupProfilePicture2 from "../../../assets/images/ProfilePicture2.jpeg";
import { useSelector } from "react-redux";

const Chat = () => {
  const activeChat = useSelector((state) => state.activeChat.value);
  const data = useSelector((state) => state.userLogInfo.value);

  return (
    <div className="flex-2 min-h-0 ">
      {activeChat ? (
        <div className="flex-col flex bg-white rounded-[20px] h-full">
          {/* Header */}
          <div className=" px-[28px] pt-[28px]">
            <div className=" flex justify-between items-center pb-3.5 border-b border-gray-200">
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
            {/* Message Item 1 */}
            <div className="flex items-end gap-3 mb-4">
              <img
                src={ProfilePicture1}
                alt=""
                className="rounded-full w-[30px] h-[30px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
              />
              <div className="flex flex-col">
                <p className="text-primary-des font-poppins text-[12px] font-medium ">
                  Today, 10:30 AM
                </p>
                <p className="font-poppins m-0 p-0 text-[15px] font-[400] bg-slate-100 rounded-lg py-2 px-[14px] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]">
                  Hey! How's it going?
                </p>
              </div>
            </div>
            {/* Message Reply Item 1 */}
            <div className="flex justify-start flex-row-reverse items-end gap-3 mb-4">
              <img
                src={ProfilePicture}
                alt=""
                className="rounded-full w-[30px] h-[30px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
              />
              <div className="flex flex-col">
                <p className="text-primary-des flex justify-end font-poppins text-[12px] font-medium ">
                  Today, 3:00 PM
                </p>
                <p className="font-poppins m-0 p-0 text-[15px] font-[400] bg-slate-900 text-white rounded-lg py-2 px-[14px] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]">
                  I'm good, thanks! Just working on some projects. How about you?
                </p>
              </div>
            </div>
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
              />
              <button className="bg-primary-des text-white rounded-lg py-2 px-4">
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
