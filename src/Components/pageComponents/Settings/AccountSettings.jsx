import React from 'react'
import { FaKey } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'

const AccountSettings = () => {
  return (
    <div className="p-9 bg-white rounded-[20px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.15)] flex-1 flex flex-col min-h-0 h-full">
    {/* Added flex-col min-h-0 h-full */}
    <h1 className="font-poppins text-[20px] font-[600] mb-6">
      Account Settings
    </h1>

    {/* Scrollable Content */}
    <div className="flex-1  overflow-y-auto pr-2">
      {" "}
      {/* Added pr-2 to prevent scrollbar overlap */}
      <div className="flex flex-col justify-start  max-w-[350px] ">
        <div className="flex flex-row items-center justify-start gap-4 px-8 rounded-[20px] bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer py-2 mt-2">
          <FaKey size={20} />
          <p className="font-nunito text-[16px] font-[500]">
            Change Password
          </p>
        </div>
        <div className="flex flex-row items-center justify-start gap-4 px-8 rounded-[20px] bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer py-2 mt-2">
          <MdDeleteOutline size={22} />
          <p className="font-nunito text-[16px] font-[500]">
            Delete Account
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AccountSettings
