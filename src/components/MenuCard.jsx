import React from "react";
import {MENU_URL} from "../utils/constants"
const Menu = (props) => {
  const { menuData } = props;
  const{text,imageId} = menuData;
  return (
    <div>
      <div className="menu-card">
        <img
          src={MENU_URL+imageId}
          alt="menu img"
        />
        <p>{text}</p>
      </div>
    </div>
  );
};
export default Menu;
