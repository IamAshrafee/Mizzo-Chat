import React, { useRef } from "react";
import Avatar from "./Avatar";
import { GoHome } from "react-icons/go";
import { IoExit } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router";
import { getAuth, signOut } from "firebase/auth";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from "react-toastify";
import { userLogInfo } from "../../slice/userSlice";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userLogInfo.value);

  const handleLogout = async () => {
    try {
      // Immediately start loading
      loadingBarRef.current.continuousStart();

      // Sign out from Firebase
      await signOut(auth);

      // Complete 40% of loading bar

      // Show success toast
      toast.success("Logged out successfully!", {
        autoClose: 1000,
        onClose: () => {
          // After toast closes (1000ms), complete loading and navigate
          dispatch(userLogInfo(null));
          localStorage.clear();
          loadingBarRef.current.complete();
          navigate("/login");
        },
      });
    } catch (error) {
      // Error handling
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
      <div className="w-[120px] bg-black rounded-[20px] flex flex-col justify-between shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] transition-all duration-300">
        <div className="h-[150px] w-full flex flex-col justify-center items-center">
          <Avatar name={data.user.displayName} />
          <p className="text-gray-600 text-[12px] mt-3 text-center">
            {data.user.displayName}
          </p>
        </div>

        <div className="mb-[200px]">
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
          <LoadingBar
            color="#000"
            ref={loadingBarRef}
            height={4}
            shadow={true}
          />
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
