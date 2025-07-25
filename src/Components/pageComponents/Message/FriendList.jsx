import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfilePicture1 from "../../../assets/images/ProfilePicture1.jpg";
import ProfilePicture2 from "../../../assets/images/ProfilePicture2.jpeg";

const FriendList = () => {
  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <div className="flex-col flex bg-white rounded-[20px]  h-full">
        <div className="flex justify-between items-center px-[22px] pt-[22px]">
          <h1 className="font-poppins text-[20px] font-[600]">Messages</h1>
          <button>
            <BsThreeDotsVertical className="text-[20px] text-gray-500 hover:text-gray-700 cursor-pointer" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-[22px] pb-[22px]">
          {/* Friend Item 1 */}
          <div className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-3">
              <img
                src={ProfilePicture1}
                alt=""
                className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
              />
              <div className="flex flex-col">
                <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                  Selina Mortugize
                </p>
                <p className="text-primary-des font-poppins text-[12px] font-medium">
                  Dinner?
                </p>
              </div>
            </div>
            <div>
              <button>
                <BsThreeDotsVertical className="text-[20px] text-gray-500 hover:text-gray-700 cursor-pointer" />
              </button>
            </div>
          </div>

          {/* Friend Item 2 */}
          <div className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-3">
              <img
                src={ProfilePicture2}
                alt=""
                className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
              />
              <div className="flex flex-col">
                <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                  Sarah Smith
                </p>
                <p className="text-primary-des font-poppins text-[12px] font-medium">
                  Movie night?
                </p>
              </div>
            </div>
            <div>
              <button>
                <BsThreeDotsVertical className="text-[20px] text-gray-500 hover:text-gray-700 cursor-pointer" />
              </button>
            </div>
          </div>

          {/* Friend Item 3 */}
          <div className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-3">
              <img
                src={ProfilePicture1}
                alt=""
                className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
              />
              <div className="flex flex-col">
                <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                  Michael Johnson
                </p>
                <p className="text-primary-des font-poppins text-[12px] font-medium">
                  Weekend plans?
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
      </div>
    </div>
  );
};

export default FriendList;
