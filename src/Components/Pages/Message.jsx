import Container from "../Layout/Container";
import ProfilePicture from "../../assets/images/ProfilePicture.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfilePicture1 from "../../assets/images/ProfilePicture1.jpg";
import ProfilePicture2 from "../../assets/images/ProfilePicture2.jpeg";
import Sidebar from "../common/Sidebar";

const Message = () => {
  return (
    <Container>
      {/* Sidebar */}
      <Sidebar activeItem="Messages" />

      {/* Main Content */}
      <div className="flex flex-row flex-1 h-full overflow-hidden gap-4">
        <div className="flex flex-col flex-1 min-h-0 gap-4">
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
                placeholder="Search friends or messages..."
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
            <div className="flex-col flex bg-white rounded-[20px]  h-full">
              <div className="flex justify-between items-center px-[22px] pt-[22px]">
                <h1 className="font-poppins text-[20px] font-[600]">
                  Messages
                </h1>
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
        </div>
        <div className="flex-2 min-h-0 ">
          <div className="flex-col flex bg-white rounded-[20px] h-full">
            {/* Header */}
            <div className=" px-[28px] pt-[28px]">
              <div className=" flex justify-between items-center pb-3.5 border-b border-gray-200">
                <div className="flex flex-row items-center gap-3">
                  <img
                    src={ProfilePicture1}
                    alt=""
                    className="rounded-full w-[60px] h-[60px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                  />
                  <div>
                    <p className="font-poppins m-0 p-0 text-[19px] font-[600]">
                      Selina Mortugize
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
                    I'm good, thanks! Just working on some projects. How about
                    you?
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
        </div>
      </div>
    </Container>
  );
};

export default Message;
