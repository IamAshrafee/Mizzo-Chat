import { MdDeleteOutline } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { BiHelpCircle } from "react-icons/bi";
import { MdAddPhotoAlternate } from "react-icons/md";
import { BiMessageAltDots } from "react-icons/bi";
import { BiMessageSquareEdit } from "react-icons/bi";
import Container from "../Layout/Container";
import ProfilePicture from "../../assets/images/ProfilePicture.jpg";
import Sidebar from "../common/Sidebar";


const Settings = () => {
  return (
    <Container>
      {/* Sidebar - unchanged */}
      <Sidebar activeItem="Settings" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-4 h-full min-h-0">
        {" "}
        {/* Added h-full min-h-0 */}
        {/* Search Form - unchanged */}
        <div>
          <form className="w-full">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative shadow-[0_4px_20px_-5px_rgba(0,0,0,0.15)] rounded-[20px]">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 bg-white rounded-[20px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Settings, Help..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-slate-900 hover:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium rounded-[20px] text-sm px-4 py-2 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        {/* Dual Panel Layout */}
        <div className="flex-1 flex flex-row gap-6 overflow-hidden min-h-0 h-full">
          {/* Added h-full */}
          {/* Left Panel - Scrollable */}
          <div className="p-9 bg-white rounded-[20px] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.15)] flex-1 flex flex-col min-h-0 h-full">
            {" "}
            {/* Added flex-col min-h-0 h-full */}
            <h1 className="font-poppins text-[20px] font-[600] mb-6">
              Profile Settings
            </h1>
            <div className="flex flex-row items-center border-b border-gray-200 pb-6 mb-6">
              <img
                src={ProfilePicture}
                alt=""
                className="rounded-full w-[60px] h-[60px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
              />
              <div className="flex flex-col ms-4">
                <p className="mt-2 text-gray-700">John Doe</p>
                <p className="text-gray-500">johndoe@example.com</p>
              </div>
            </div>
            {/* Scrollable Content */}
            <div className="flex-1  overflow-y-auto pr-2">
              {" "}
              {/* Added pr-2 to prevent scrollbar overlap */}
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
          {/* Right Panel */}
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
        </div>
      </div>
    </Container>
  );
};

export default Settings;
