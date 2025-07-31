import React from "react";
import Avatar from "../common/Avatar";
import { GoHome } from "react-icons/go";
import { IoExit } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";

const Test = () => {
  return (
      <div className="h-[300px] flex flex-col w-[344px] border  rounded-[20px] bg-white shadow-lg">
        <div className="flex justify-between items-center mb-6 px-[22px] pt-[22px]">
          <h1 className="font-poppins text-[20px] font-[600]">Friends</h1>
          <BsThreeDotsVertical className="text-[20px]" />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto px-[22px] pb-[22px]">
          <div className="flex mt-4 justify-between items-center border-b border-primary-opacity pb-2.5">
            <div className="flex items-center gap-3">
              <Avatar name="John Doe" />
              <div className="flex flex-col">
                <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                  John Doe
                </p>
                <p className="text-primary-des font-poppins text-[12px] font-medium">
                  Dinner?
                </p>
              </div>
            </div>
            <div>
              <p className="text-primary-opacity font-poppins text-[10px] font-medium">
                Today, 8:56pm
              </p>
            </div>
          </div>
          <div className="flex mt-4 justify-between items-center border-b border-primary-opacity pb-2.5">
            <div className="flex items-center gap-3">
              <Avatar name="John Doe" />
              <div className="flex flex-col">
                <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                  John Doe
                </p>
                <p className="text-primary-des font-poppins text-[12px] font-medium">
                  Dinner?
                </p>
              </div>
            </div>
            <div>
              <p className="text-primary-opacity font-poppins text-[10px] font-medium">
                Today, 8:56pm
              </p>
            </div>
          </div>
          <div className="flex mt-4 justify-between items-center border-b border-primary-opacity pb-2.5">
            <div className="flex items-center gap-3">
              <Avatar name="John Doe" />
              <div className="flex flex-col">
                <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                  John Doe
                </p>
                <p className="text-primary-des font-poppins text-[12px] font-medium">
                  Dinner?
                </p>
              </div>
            </div>
            <div>
              <p className="text-primary-opacity font-poppins text-[10px] font-medium">
                Today, 8:56pm
              </p>
            </div>
          </div>
          <div className="flex mt-4 justify-between items-center border-b border-primary-opacity pb-2.5">
            <div className="flex items-center gap-3">
              <Avatar name="John Doe" />
              <div className="flex flex-col">
                <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                  John Doe
                </p>
                <p className="text-primary-des font-poppins text-[12px] font-medium">
                  Dinner?
                </p>
              </div>
            </div>
            <div>
              <p className="text-primary-opacity font-poppins text-[10px] font-medium">
                Today, 8:56pm
              </p>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Test;
