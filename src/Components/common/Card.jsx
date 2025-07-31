import React from "react";
import { motion } from "framer-motion";

const Card = ({ title, children, headerContent }) => {
  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <div className="h-full bg-white rounded-[20px] flex flex-col">
        <div className="flex justify-between items-center px-[22px] pt-[22px] pb-[10px]">
          <h1 className="font-poppins text-[20px] font-[600]">{title}</h1>
          {headerContent}
        </div>
        <div className="flex-1 overflow-y-auto px-[22px] pb-[22px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
