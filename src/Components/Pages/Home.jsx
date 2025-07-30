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
import { AnimatePresence, motion } from "framer-motion";

// Main Home component
const Home = () => {
  const loadingBarRef = useRef(null);
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(true);
  const data = useSelector((state) => state.userLogInfo.value);
  const navigate = useNavigate();
  const auth = getAuth();

  const [searchStates, setSearchStates] = useState({
    groups: { term: "", visible: false },
    friends: { term: "", visible: false },
    users: { term: "", visible: false },
    friendRequests: { term: "", visible: false },
    myGroups: { term: "", visible: false },
    blockedUsers: { term: "", visible: false },
  });

  const handleSearchToggle = (card, visible) => {
    setSearchStates((prev) => {
      const newState = { ...prev };
      // Close all other search bars
      for (const key in newState) {
        if (key !== card) {
          newState[key] = { ...newState[key], visible: false, term: "" };
        }
      }
      // Toggle the selected card's search bar
      newState[card] = {
        ...newState[card],
        visible,
        term: visible ? newState[card].term : "",
      };
      return newState;
    });
  };

  const handleSearchTermChange = (card, term) => {
    setSearchStates((prev) => ({
      ...prev,
      [card]: { ...prev[card], term },
    }));
  };

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
            <motion.div layout className="flex-1 flex flex-col min-h-0 gap-1">
              <AnimatePresence>
                {searchStates.groups.visible && (
                  <Search
                    searchTerm={searchStates.groups.term}
                    setSearchTerm={(term) => handleSearchTermChange("groups", term)}
                  />
                )}
              </AnimatePresence>
              <GroupsList
                searchTerm={searchStates.groups.term}
                showSearch={searchStates.groups.visible}
                onSearchToggle={(visible) => handleSearchToggle("groups", visible)}
              />
            </motion.div>

            <motion.div layout className="flex-1 flex flex-col min-h-0 gap-1">
              <AnimatePresence>
                {searchStates.friends.visible && (
                  <Search
                    searchTerm={searchStates.friends.term}
                    setSearchTerm={(term) => handleSearchTermChange("friends", term)}
                  />
                )}
              </AnimatePresence>
              <Friends
                searchTerm={searchStates.friends.term}
                showSearch={searchStates.friends.visible}
                onSearchToggle={(visible) => handleSearchToggle("friends", visible)}
              />
            </motion.div>

            <motion.div layout className="flex-1 flex flex-col min-h-0 gap-1">
              <AnimatePresence>
                {searchStates.users.visible && (
                  <Search
                    searchTerm={searchStates.users.term}
                    setSearchTerm={(term) => handleSearchTermChange("users", term)}
                  />
                )}
              </AnimatePresence>
              <UserList
                searchTerm={searchStates.users.term}
                showSearch={searchStates.users.visible}
                onSearchToggle={(visible) => handleSearchToggle("users", visible)}
              />
            </motion.div>
          </div>

          {/* Bottom Row */}
          <div className="flex-1 min-h-0 flex gap-4">
            <motion.div layout className="flex-1 flex flex-col min-h-0 gap-1">
              <AnimatePresence>
                {searchStates.friendRequests.visible && (
                  <Search
                    searchTerm={searchStates.friendRequests.term}
                    setSearchTerm={(term) =>
                      handleSearchTermChange("friendRequests", term)
                    }
                  />
                )}
              </AnimatePresence>
              <FriendRequest
                searchTerm={searchStates.friendRequests.term}
                showSearch={searchStates.friendRequests.visible}
                onSearchToggle={(visible) =>
                  handleSearchToggle("friendRequests", visible)
                }
              />
            </motion.div>

            <motion.div layout className="flex-1 flex flex-col min-h-0 gap-1">
              <AnimatePresence>
                {searchStates.myGroups.visible && (
                  <Search
                    searchTerm={searchStates.myGroups.term}
                    setSearchTerm={(term) => handleSearchTermChange("myGroups", term)}
                  />
                )}
              </AnimatePresence>
              <MyGroups
                searchTerm={searchStates.myGroups.term}
                showSearch={searchStates.myGroups.visible}
                onSearchToggle={(visible) => handleSearchToggle("myGroups", visible)}
              />
            </motion.div>

            <motion.div layout className="flex-1 flex flex-col min-h-0 gap-1">
              <AnimatePresence>
                {searchStates.blockedUsers.visible && (
                  <Search
                    searchTerm={searchStates.blockedUsers.term}
                    setSearchTerm={(term) =>
                      handleSearchTermChange("blockedUsers", term)
                    }
                  />
                )}
              </AnimatePresence>
              <BlockedUser
                searchTerm={searchStates.blockedUsers.term}
                showSearch={searchStates.blockedUsers.visible}
                onSearchToggle={(visible) =>
                  handleSearchToggle("blockedUsers", visible)
                }
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
