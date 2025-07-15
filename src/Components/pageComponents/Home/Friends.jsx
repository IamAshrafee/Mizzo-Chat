import React from "react";
import ProfilePicture1 from "../../../assets/images/ProfilePicture1.jpg";
import ProfilePicture2 from "../../../assets/images/ProfilePicture2.jpeg";
import { BsThreeDotsVertical } from "react-icons/bs";

const Friends = () => {
  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <div className="h-full bg-white rounded-[20px]  flex flex-col">
        <div className="flex justify-between items-center px-[22px] pt-[22px]">
          <h1 className="font-poppins text-[20px] font-[600]">Friends</h1>
          <BsThreeDotsVertical className="text-[20px] text-gray-500 hover:text-gray-700 cursor-pointer" />
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
                  Emily Wilson
                </p>
                <p className="text-primary-des font-poppins text-[12px] font-medium">
                  Coffee tomorrow?
                </p>
              </div>
            </div>
            <div>
              <p className="text-primary-opacity font-poppins text-[10px] font-medium">
                Today, 5:20pm
              </p>
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
                  David Brown
                </p>
                <p className="text-primary-des font-poppins text-[12px] font-medium">
                  Project update
                </p>
              </div>
            </div>
            <div>
              <p className="text-primary-opacity font-poppins text-[10px] font-medium">
                Today, 4:15pm
              </p>
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
                  Jessica Lee
                </p>
                <p className="text-primary-des font-poppins text-[12px] font-medium">
                  Birthday party
                </p>
              </div>
            </div>
            <div>
              <p className="text-primary-opacity font-poppins text-[10px] font-medium">
                Today, 3:30pm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
