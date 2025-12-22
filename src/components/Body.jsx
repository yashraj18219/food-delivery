import React from "react";
import MenuCard from "./MenuCard";
import RestaurantCard from "./RestaurantCard";
import { resList } from "../utils/mockData";
import { menuObj } from "../utils/mockData";
const Body = () => {
  return (
    <div className="body">
      <div className="menu-box">
          <h2>What's on your mind?</h2>
        <div className="menu-container">
          {menuObj.map((menu) => {
            return <MenuCard key = {menu.id} menuData={menu} />;
          })}
        </div>
      </div>

      <div className="search-bar">
        <input type="text" />
        <button>Submit</button>
      </div>
      <div className="res-container">
        {resList.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant.info.id} resData={restaurant} />
          );
        })}
      </div>
    </div>
  );
};
export default Body;
