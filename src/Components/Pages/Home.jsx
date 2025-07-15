import React, { useState, useEffect, useRef } from "react";
import Container from "../Layout/Container";
import Sidebar from "../common/Sidebar";
import VerifyEmailMessage from "../common/VerifyEmailMessage";
import { ToastContainer, toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import FriendRequest from "../pageComponents/Home/FriendRequest";
import GroupsList from "../pageComponents/Home/GroupsList";
import MyGroups from "../pageComponents/Home/MyGroups";
import Friends from "../pageComponents/Home/Friends";
import UserList from "../pageComponents/Home/UserList";
import BlockedUser from "../pageComponents/Home/BlockedUser";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

// Main Home component
const Home = () => {
  const loadingBarRef = useRef(null);
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(true);
  const data = useSelector((state) => state.userLogInfo.value);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    if (!data) {
      navigate("/Login");
    }
  }, [data, navigate]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) {
        setVerify(true);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (!loading && !verify) {
      toast.error("Please verify your email first");
    }
  }, [loading, verify]);

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

              <GroupsList />
            </div>

            {/* Second Column */}
            <Friends />

            {/* Third Column */}
            <UserList />
          </div>

          {/* Bottom Row */}
          <div className="flex-1 min-h-0 flex gap-4">
            {/* First Column */}
            <FriendRequest />

            {/* Second Column */}
            <MyGroups />

            {/* Third Column */}
            <BlockedUser />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
