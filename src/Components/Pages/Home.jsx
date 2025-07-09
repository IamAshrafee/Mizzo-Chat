import React from "react";
import ProfilePicture from "../../assets/images/ProfilePicture.jpg";
import { GoHome } from "react-icons/go";
import { IoExit } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";

const Home = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[120px] bg-black my-[30px] mx-[50px] rounded-[20px] flex flex-col justify-between">
        <div className="h-[150px] w-full flex justify-center items-center">
          <img
            className="rounded-full w-18 h-18 object-cover"
            src={ProfilePicture}
            alt=""
          />
        </div>
        <div className="mb-[200px]">
          <div className="py-8 w-full flex justify-center items-center">
            <GoHome className="text-white h-[45px] w-[45px]" />
          </div>
          <div className=" flex items-center justify-center">
            <div className="flex justify-center items-center  ">
              <AiOutlineMessage className="text-white h-[45px] w-[45px] hover:text-black hover:bg-white m-2" />
            </div>
          </div>

          <div className="py-8 w-full flex justify-center items-center">
            <IoMdSettings className="text-white h-[45px] w-[45px]" />
          </div>
        </div>
        <div className="h-[150px] w-full flex justify-center items-center">
          <IoExit className="text-white h-[45px] w-[45px]" />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
