import React from "react";
import { MENU_URL } from "../utils/constants";
const Menu = (props) => {
  const { menuData } = props;
  const { text, imageId } = menuData;
  return (
    <div className="w-[150px] h-[150px] rounded-full m-3 ">
      <img
        className="  w-full h-full
    rounded-full
    bg-transparent
    cursor-pointer
    transition-all duration-300 ease-in-out
    hover:-translate-y-2
    hover:scale-[1.06]
    hover:shadow-[0_6px_12px_rgba(0,0,0,0.18),_inset_0_-4px_6px_rgba(0,0,0,0.08)]"
        src={MENU_URL + imageId}
        alt="menu img"
      />
    </div>
  );
};
export default Menu;
