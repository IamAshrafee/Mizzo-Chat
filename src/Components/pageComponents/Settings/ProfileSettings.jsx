import React from "react";
import Avatar from "../../common/Avatar";
import { BiMessageSquareEdit } from "react-icons/bi";
import { BiMessageAltDots } from "react-icons/bi";
import { MdAddPhotoAlternate } from "react-icons/md";
import { BiHelpCircle } from "react-icons/bi";
import { useSelector } from "react-redux";

const ProfileSettings = () => {
  const data = useSelector((state) => state.userLogInfo.value);

  return (
    <div className="p-9 bg-white rounded-[20px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.15)] flex-1 flex flex-col min-h-0 h-full">
      <h1 className="font-poppins text-[20px] font-[600] mb-6">
        Profile Settings
      </h1>
      <div className="flex flex-row items-center border-b border-gray-200 pb-6 mb-6">
        <Avatar name={data.user.displayName} size="xlarge" />
        <div className="flex flex-col ms-4">
          <p className="mt-2 text-gray-800 text-[20px] font-semibold">
            {data.user.displayName}
          </p>
          <p className="text-gray-500">{data.user.email}</p>
        </div>
      </div>
      {/* Scrollable Content */}
      <div className="flex-1  overflow-y-auto pr-2">
        <div className="flex flex-col justify-start  max-w-[350px] ">
          <div className="flex flex-row items-center justify-start gap-4 px-8 rounded-[20px] bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer py-2 mt-2">
            <BiMessageSquareEdit size={22} />
            <p className="font-nunito text-[16px] font-[500]">
              Edit Profile Name
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-4 px-8 rounded-[20px] bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer py-2 mt-2">
            <BiMessageAltDots size={22} />
            <p className="font-nunito text-[16px] font-[500]">
              Edit Profile status info
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-4 px-8 rounded-[20px] bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer py-2 mt-2">
            <MdAddPhotoAlternate size={22} />
            <p className="font-nunito text-[16px] font-[500]">
              Edit Profile Photo
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-4 px-8 rounded-[20px] bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer py-2 mt-2">
            <BiHelpCircle size={22} />
            <p className="font-nunito text-[16px] font-[500]">Help</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;

