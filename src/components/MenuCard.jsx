import React from "react";
import { MENU_URL } from "../utils/constants";

const Menu = ({ menuData, onClick }) => {
  const { text, imageId } = menuData;

  return (
    <div className="w-[160px] m-3 flex flex-col items-center">
      
      {/* Circular Image Wrapper */}
      <div
        className="
          w-[150px] 
          h-[150px] 
          rounded-full 
          overflow-hidden 
          flex 
          items-center 
          justify-center
          bg-white
          cursor-pointer
          transition-all 
          duration-300 
          ease-in-out
          hover:-translate-y-2
          hover:scale-105
          hover:shadow-[0_8px_18px_rgba(0,0,0,0.18)]
        "
        onClick={onClick}
      >
        <img
          className="w-full h-full object-contain"
          src={MENU_URL + imageId}
          alt={text || "menu img"}
        />
      </div>

      {/* Text */}
      {text && (
        <p className="mt-3 text-center text-sm leading-snug max-w-[150px] font-medium">
          {text}
        </p>
      )}
      
    </div>
  );
};

export default Menu;