import { BiPlus } from "react-icons/bi";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Container from "../Layout/Container";

// Importing sample profile images
import ProfilePicture1 from "../../assets/images/ProfilePicture1.jpg";
import ProfilePicture2 from "../../assets/images/ProfilePicture2.jpeg";

// Getting user data from redux
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import Sidebar from "../common/Sidebar";

// Firebase real-time database functions
import { getDatabase, ref, onValue } from "firebase/database";

// Email verification message component
import VerifyEmailMessage from "../common/VerifyEmailMessage";

// Toast message and loading bar
import { ToastContainer, toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import { userLogInfo } from "../../slice/userSlice";

// Main Home component
const Home = () => {
  // List of users from database
  const [userList, setUserList] = useState([]);

  // Getting user data from redux
  const data = useSelector((state) => state.userLogInfo.value);

  // For navigating programmatically
  const navigate = useNavigate();

  // Firebase auth instance
  const auth = getAuth();

  // Firebase database instance
  const db = getDatabase();

  // Ref for loading bar (not used now but kept for later use)
  const loadingBarRef = useRef(null);

  // For checking if email is verified
  const [verify, setVerify] = useState(false);

  // To check if data is loading
  const [loading, setLoading] = useState(true);

  // Redirect to login page if no user is logged in
  useEffect(() => {
    if (!data) {
      navigate("/Login");
    }
  }, [data, navigate]);

  // Check if user's email is verified
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) {
        setVerify(true);
      }
      setLoading(false);
    });

    // Clean up when component unmounts
    return () => unsubscribe();
  }, [auth]);

  // Show error if email is not verified
  useEffect(() => {
    if (!loading && !verify) {
      toast.error("Please verify your email first");
    }
  }, [loading, verify]);

  // Fetch all users from the Firebase database
  useEffect(() => {
    const userRef = ref(db, "users/");
    const arr = [];

    const unsubscribe = onValue(userRef, (snapshot) => {
      arr.length = 0; // clear previous data
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setUserList(arr);
    });

    // Clean up listener
    return () => unsubscribe();
  }, [db]);

  console.log(userList); // moved here to show updated data

  const dispatch = useDispatch;
  // If still loading, show a simple loading text
  if (loading) {
    return <p></p>;
  }

  // If not verified, show verify email message
  if (!verify) {
    return <VerifyEmailMessage />;
  }

  return (
    <>
      <LoadingBar
        color="#11175D" // You can change this color to match your theme
        ref={loadingBarRef}
        height={4}
        shadow={true}
      />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <Container>
        {/* Sidebar */}
        <Sidebar activeItem="Home" />

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
                  <h1 className="font-poppins text-[20px] font-[600]">
                    Friends
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
                  {
                    // Loop through each user item in userList
                    userList.map((item, index) => {
                      return (
                        // Each item must be wrapped in a return (JSX block)
                        <div
                          key={index} // Always use a unique key when mapping
                          className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]"
                        >
                          {/* Left side: profile image and user info */}
                          <div className="flex items-center gap-3">
                            <img
                              src={ProfilePicture2} // Use dynamic item image if available
                              alt=""
                              className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                            />
                            <div className="flex flex-col">
                              <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                                {item.username || "Unknown User"}{" "}
                                {/* Show user name */}
                              </p>
                              <p className="text-primary-des font-poppins text-[12px] font-medium">
                                {item.email || "No email"} {/* Show email */}
                              </p>
                            </div>
                          </div>

                          {/* Right side: action button */}
                          <div>
                            <button className="px-3 p-2 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal">
                              <BiPlus className="text-white" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  }
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
    </>
  );
};

export default Home;
