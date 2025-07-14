import { BiPlus } from "react-icons/bi";
import React from "react";
import ProfilePicture from "../../assets/images/ProfilePicture.jpg";
import { GoHome } from "react-icons/go";
import { IoExit } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import Container from "../Layout/Container";
import ProfilePicture1 from "../../assets/images/ProfilePicture1.jpg";
import ProfilePicture2 from "../../assets/images/ProfilePicture2.jpeg";

const Home = () => {
  return (
    <Container>
      {/* Sidebar */}
      <div className="w-[120px] bg-black rounded-[20px] flex flex-col justify-between shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] transition-all duration-300">
        <div className="h-[150px] w-full flex justify-center items-center">
          <img
            className="rounded-full w-18 h-18 object-cover shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-300"
            src={ProfilePicture}
            alt="Profile"
          />
        </div>
        <div className="mb-[200px]">
          {/* Active Home Button */}
          <div className="group relative mb-3 py-2 flex items-center justify-center cursor-pointer">
            <div className="absolute inset-y-0 left-[15px] right-0 rounded-l-[20px] bg-white" />
            <div className="absolute right-0 top-0 h-full w-5 bg-black rounded-tl-[10px] rounded-bl-[10px]" />
            <GoHome className="relative z-10 text-black h-[40px] w-[40px] transition-all duration-200" />
          </div>

          {/* Messages Button */}
          <div className="group relative mb-3 py-2 flex items-center justify-center cursor-pointer">
            <div
              className="absolute inset-y-0 left-[15px] right-0 rounded-l-[20px] bg-white opacity-0 group-hover:opacity-100 
                    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
            <div
              className="absolute right-0 top-0 h-full w-5 bg-black rounded-tl-[10px] rounded-bl-[10px] 
                    opacity-0 group-hover:opacity-100 transition-all duration-200 delay-100"
            />
            <AiOutlineMessage className="relative z-10 text-white group-hover:text-black h-[40px] w-[40px] transition-colors duration-200" />
          </div>

          {/* Settings Button */}
          <div className="group relative mb-3 py-2 flex items-center justify-center cursor-pointer">
            <div
              className="absolute inset-y-0 left-[15px] right-0 rounded-l-[20px] bg-white opacity-0 group-hover:opacity-100 
                    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            />
            <div
              className="absolute right-0 top-0 h-full w-5 bg-black rounded-tl-[10px] rounded-bl-[10px] 
                    opacity-0 group-hover:opacity-100 transition-all duration-200 delay-100"
            />
            <IoMdSettings className="relative z-10 text-white group-hover:text-black h-[40px] w-[40px] transition-all duration-200 group-hover:rotate-45" />
          </div>
        </div>
        <div className="h-[150px] w-full flex justify-center items-center">
          <div className="p-2 rounded-full hover:bg-white/10 transition-all duration-300">
            <IoExit className="text-white h-[45px] w-[45px] hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden gap-4">
        {/* Top Row */}
        <div className="flex-1 min-h-0 flex gap-4">
          {/* First Column */}
          <div className="flex-1 flex flex-col min-h-0 gap-4">
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
                  placeholder="Search Groups, Friends, Chats..."
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

            <div className="flex-1 min-h-0 overflow-hidden">
              <div className="h-full bg-white rounded-[20px]  flex flex-col">
                <div className="flex justify-between items-center px-[22px] pt-[22px]">
                  <h1 className="font-poppins text-[20px] font-[600]">
                    Groups List
                  </h1>
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
                          John Doe
                        </p>
                        <p className="text-primary-des font-poppins text-[12px] font-medium">
                          Dinner?
                        </p>
                      </div>
                    </div>
                    <div>
                      <button className="px-5 p-1 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal">
                        Join
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
                      <button className="px-5 p-1 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal">
                        Join
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
                      <button className="px-5 p-1 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal">
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Column */}
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

          {/* Third Column */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="h-full bg-white rounded-[20px]  flex flex-col">
              <div className="flex justify-between items-center px-[22px] pt-[22px]">
                <h1 className="font-poppins text-[20px] font-[600]">
                  User List
                </h1>
                <BsThreeDotsVertical className="text-[20px] text-gray-500 hover:text-gray-700 cursor-pointer" />
              </div>
              <div className="flex-1 overflow-y-auto px-[22px] pb-[22px]">
                {/* Friend Item 1 */}
                <div className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-3">
                    <img
                      src={ProfilePicture2}
                      alt=""
                      className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                    />
                    <div className="flex flex-col">
                      <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                        Robert Taylor
                      </p>
                      <p className="text-primary-des font-poppins text-[12px] font-medium">
                        Meeting notes
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="px-3 p-2 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal">
                      <BiPlus className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Friend Item 2 */}
                <div className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-3">
                    <img
                      src={ProfilePicture1}
                      alt=""
                      className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                    />
                    <div className="flex flex-col">
                      <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                        Olivia Martinez
                      </p>
                      <p className="text-primary-des font-poppins text-[12px] font-medium">
                        Lunch next week?
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="px-3 p-2 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal">
                      <BiPlus className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Friend Item 3 */}
                <div className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-3">
                    <img
                      src={ProfilePicture2}
                      alt=""
                      className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                    />
                    <div className="flex flex-col">
                      <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                        Daniel Anderson
                      </p>
                      <p className="text-primary-des font-poppins text-[12px] font-medium">
                        Gym session
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="px-3 p-2 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal">
                      <BiPlus className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex-1 min-h-0 flex gap-4">
          {/* First Column */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="h-full bg-white rounded-[20px]  flex flex-col">
              <div className="flex justify-between items-center px-[22px] pt-[22px]">
                <h1 className="font-poppins text-[20px] font-[600]">
                  Friends Requests
                </h1>
                <BsThreeDotsVertical className="text-[20px] text-gray-500 hover:text-gray-700 cursor-pointer" />
              </div>
              <div className="flex-1 overflow-y-auto px-[22px] pb-[22px]">
                <div className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-3">
                    <img
                      src={ProfilePicture1}
                      alt=""
                      className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                    />
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
                    <button className="px-5 p-1 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal">
                      Accept
                    </button>
                  </div>
                </div>
                <div className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-3">
                    <img
                      src={ProfilePicture2}
                      alt=""
                      className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                    />
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
                    <button className="px-5 p-1 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal">
                      Accept
                    </button>
                  </div>
                </div>
                <div className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-3">
                    <img
                      src={ProfilePicture1}
                      alt=""
                      className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                    />
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
                    <button className="px-5 p-1 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal">
                      Accept
                    </button>
                  </div>
                </div>
                {/* Add more friend items as needed */}
              </div>
            </div>
          </div>

          {/* Second Column */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="h-full bg-white rounded-[20px]  flex flex-col">
              <div className="flex justify-between items-center px-[22px] pt-[22px]">
                <h1 className="font-poppins text-[20px] font-[600]">
                  My Groups
                </h1>
                <BsThreeDotsVertical className="text-[20px] text-gray-500 hover:text-gray-700 cursor-pointer" />
              </div>
              <div className="flex-1 overflow-y-auto px-[22px] pb-[22px]">
                <div className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-3">
                    <img
                      src={ProfilePicture2}
                      alt=""
                      className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                    />
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
                <div className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-3">
                    <img
                      src={ProfilePicture1}
                      alt=""
                      className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                    />
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
                {/* Add more friend items as needed */}
              </div>
            </div>
          </div>

          {/* Third Column */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="h-full bg-white rounded-[20px] flex flex-col">
              <div className="flex justify-between items-center px-[22px] pt-[22px]">
                <h1 className="font-poppins text-[20px] font-[600]">
                  Blocked Users
                </h1>
                <BsThreeDotsVertical className="text-[20px] text-gray-500 hover:text-gray-700 cursor-pointer" />
              </div>
              <div className="flex-1 overflow-y-auto px-[22px] pb-[22px]">
                <div className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-3">
                    <img
                      src={ProfilePicture2}
                      alt=""
                      className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                    />
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
                    <button className="px-5 p-1 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal">
                      Unblock
                    </button>
                  </div>
                </div>
                <div className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-3">
                    <img
                      src={ProfilePicture1}
                      alt=""
                      className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                    />
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
                    <button className="px-5 p-1 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal">
                      Unblock
                    </button>
                  </div>
                </div>
                {/* Add more friend items as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
