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
import Search from "../pageComponents/Home/Search";

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
            <div className="flex-1 flex flex-col min-h-0 gap-2.5">
              <Search />
              <GroupsList />
            </div>

            {/* Second Column */}
            <div className="flex-1 flex flex-col min-h-0 gap-2.5">
              <Search />
              <Friends />
            </div>

            {/* Third Column */}

            <div className="flex-1 flex flex-col min-h-0 gap-2.5">
              <Search />
              <UserList />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex-1 min-h-0 flex gap-4">
            {/* First Column */}
            <div className="flex-1 flex flex-col min-h-0 gap-2.5">
              <Search />
              <FriendRequest />
            </div>

            {/* Second Column */}
            <div className="flex-1 flex flex-col min-h-0 gap-2.5">
              <Search />
              <MyGroups />
            </div>

            {/* Third Column */}
            <div className="flex-1 flex flex-col min-h-0 gap-2.5">
              <Search />
              <BlockedUser />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
