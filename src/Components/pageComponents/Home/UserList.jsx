import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfilePicture2 from "../../../assets/images/ProfilePicture2.jpeg";
import { BiPlus } from "react-icons/bi";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const userRef = ref(db, "users/");
    const unsubscribe = onValue(userRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setUserList(arr);
    });

    return () => unsubscribe();
  }, [db]);

  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <div className="h-full bg-white rounded-[20px]  flex flex-col">
        <div className="flex justify-between items-center px-[22px] pt-[22px]">
          <h1 className="font-poppins text-[20px] font-[600]">User List</h1>
          <BsThreeDotsVertical className="text-[20px] text-gray-500 hover:text-gray-700 cursor-pointer" />
        </div>
        <div className="flex-1 overflow-y-auto px-[22px] pb-[22px]">
          {userList.map((item, index) => (
            <div
              key={index}
              className="flex mt-4 justify-between items-center pb-2.5 hover:bg-gray-50 rounded-lg p-2 transition-colors shadow-[0_2px_8px_-1px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center gap-3">
                <img
                  src={ProfilePicture2} // Use dynamic item image if available
                  alt=""
                  className="rounded-full w-[50px] h-[50px] object-cover shadow-[0_2px_6px_-1px_rgba(0,0,0,0.1)]"
                />
                <div className="flex flex-col">
                  <p className="font-poppins m-0 p-0 text-[15px] font-[600]">
                    {item.username || "Unknown User"}{" "}
                  </p>
                  <p className="text-primary-des font-poppins text-[12px] font-medium">
                    {item.email || "No email"}
                  </p>
                </div>
              </div>
              <div>
                <button className="px-3 p-2 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] cursor-pointer font-poppins font-normal">
                  <BiPlus className="text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
