import React, { useRef } from "react";
import ProfilePicture from "../../assets/images/ProfilePicture.jpg";
import { GoHome } from "react-icons/go";
import { IoExit } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router";
import { getAuth, signOut } from "firebase/auth";
import LoadingBar from "react-top-loading-bar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SidebarItem = ({
  icon: Icon,
  active = false,
  label,
  onClick,
  loadingBarRef,
}) => {
  const handleClick = () => {
    if (loadingBarRef?.current) {
      loadingBarRef.current.continuousStart();
      setTimeout(() => {
        loadingBarRef.current.complete();
      }, 500); // Shorter duration for navigation
    }
    onClick();
  };

  return (
    <div
      className="group relative mb-3 py-2 flex items-center justify-center cursor-pointer"
      onClick={handleClick}
      aria-label={label}
      role="button"
    >
      {active && (
        <>
          <div className="absolute inset-y-0 left-[15px] right-0 rounded-l-[20px] bg-white" />
          <div className="absolute right-0 top-0 h-full w-5 bg-black rounded-tl-[10px] rounded-bl-[10px]" />
        </>
      )}
      {!active && (
        <>
          <div className="absolute inset-y-0 left-[15px] right-0 rounded-l-[20px] bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]" />
          <div className="absolute right-0 top-0 h-full w-5 bg-black rounded-tl-[10px] rounded-bl-[10px] opacity-0 group-hover:opacity-100 transition-all duration-200 delay-100" />
        </>
      )}
      <Icon
        className={`relative z-10 ${
          active ? "text-black" : "text-white group-hover:text-black"
        } h-[40px] w-[40px] transition-all duration-200 ${
          label === "Settings" ? "group-hover:rotate-45" : ""
        }`}
      />
    </div>
  );
};

const Sidebar = ({ activeItem = "Home" }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const loadingBarRef = useRef(null);

  const handleLogout = async () => {
    try {
      loadingBarRef.current.continuousStart();
      await signOut(auth);
      loadingBarRef.current.complete();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      loadingBarRef.current.complete();
      toast.error(`Logout failed: ${error.message}`);
      console.error("Logout error:", error);
    }
  };

  const handleNavigation = (path) => {
    loadingBarRef.current.continuousStart();
    setTimeout(() => {
      loadingBarRef.current.complete();
      navigate(path);
    }, 300);
  };

  return (
    <>
      <LoadingBar
        color="#000"
        ref={loadingBarRef}
        height={4}
        shadow={true}
      />
      <div className="w-[120px] bg-black rounded-[20px] flex flex-col justify-between shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] transition-all duration-300">
        <div className="h-[150px] w-full flex justify-center items-center">
          <img
            className="rounded-full w-18 h-18 object-cover shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-300"
            src={ProfilePicture}
            alt="User profile"
          />
        </div>

        <div className="mb-[200px]">
          <SidebarItem
            icon={GoHome}
            active={activeItem === "Home"}
            label="Home"
            onClick={() => handleNavigation("/home")}
            loadingBarRef={loadingBarRef}
          />
          <SidebarItem
            icon={AiOutlineMessage}
            active={activeItem === "Messages"}
            label="Messages"
            onClick={() => handleNavigation("/messages")}
            loadingBarRef={loadingBarRef}
          />
          <SidebarItem
            icon={IoMdSettings}
            active={activeItem === "Settings"}
            label="Settings"
            onClick={() => handleNavigation("/settings")}
            loadingBarRef={loadingBarRef}
          />
        </div>

        <div className="h-[150px] w-full flex justify-center items-center">
          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 focus:outline-none"
            aria-label="Logout"
          >
            <IoExit className="text-white h-[45px] w-[45px] hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
