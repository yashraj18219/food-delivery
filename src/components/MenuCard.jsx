import react from "react";
import {MENU_URL} from "../utils/constants"
const Menu = (props) => {
  const { menuData } = props;
  return (
    <div>
      <div className="menu-card">
        <img
          src={`${MENU_URL}${menuData.imageId}`}
          alt="menu img"
        />
        <p>{menuData.text}</p>
      </div>
    </div>
  );
};
export default Menu;
