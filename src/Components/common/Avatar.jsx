import React from "react";
import { HiUserGroup } from "react-icons/hi";

const Avatar = ({ name, isGroup, size = "large" }) => {
  const initial = name ? name.charAt(0).toUpperCase() : "";

  const sizeClasses = {
    small: "h-[30px] w-[30px]",
    medium: "h-[40px] w-[40px]",
    large: "h-[52px] w-[52px]",
    xlarge: "h-[60px] w-[60px]",
  };

  const textSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-xl",
    xlarge: "text-2xl",
  };

  return (
    <div
      className={`relative ${sizeClasses[size]} group perspective-500`}
    >
      {/* 3D Container */}
      <div
        className="
        h-full w-full
        transform-style-preserve-3d
        transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        group-hover:rotate-y-6 group-hover:rotate-x-2
      "
      >
        {/* Front Face */}
        <div
          className={`
          absolute inset-0 flex items-center justify-center
          font-poppins font-medium ${textSizeClasses[size]}
          text-slate-700 dark:text-slate-100
          bg-gradient-to-br from-slate-100 to-slate-200
          dark:from-slate-600 dark:to-slate-700
          rounded-full
          border border-slate-200 dark:border-slate-500
          shadow-[0_2px_12px_-1px_rgba(0,0,0,0.1)]
          transform translate-z-6
          overflow-hidden

          before:content-[''] before:absolute before:inset-0
          before:bg-[radial-gradient(ellipse_at_70%_30%,rgba(255,255,255,0.9)_0%,transparent_70%)]
          before:dark:bg-[radial-gradient(ellipse_at_70%_30%,rgba(255,255,255,0.15)_0%,transparent_70%)]
          before:opacity-80
        `}
        >
          {isGroup ? <HiUserGroup /> : initial}
        </div>

        {/* Edge Lighting */}
        <div
          className="
          absolute inset-0 rounded-full
          border-[3px] border-transparent
          border-b-slate-300/60 border-r-slate-300/60
          dark:border-b-slate-500/40 dark:border-r-slate-500/40
          transform translate-z-0
          pointer-events-none
        "
        />

        {/* Shadow Layer */}
        <div
          className="
          absolute inset-0 rounded-full
          bg-slate-300/30 dark:bg-slate-800/40
          transform translate-z-0
          blur-[2px]
          pointer-events-none
        "
        />
      </div>

      {/* Ambient Shadow */}
      <div className=" absolute -inset-2 rounded-full bg-gradient-to-br from-transparent via-slate-200/20 to-transparent dark:via-slate-800/20 filter blur-[4px]  opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
    </div>
  );
};

export default Avatar;

