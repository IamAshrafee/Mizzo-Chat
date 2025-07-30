import React from "react";

const Container = ({ children }) => {
  return (
    <div className="w-full h-screen p-[52px] flex gap-[25px] bg-gray-100">
      {children}
    </div>
  );
};

export default Container;
