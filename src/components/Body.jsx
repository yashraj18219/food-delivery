import React, { useState } from "react";
import MenuCard from "./MenuCard";
import RestaurantCard from "./RestaurantCard";
import { resList } from "../utils/mockData";
import { menuObj } from "../utils/mockData";
const Body = () => {

  const [allRestaurants] = useState(resList)
  let [listRestro,setListRestro] = useState(resList);
  
  return (
    <div className="body">
      <div className="menu-box">
        <h2>What's on your mind?</h2>
        <div className="menu-container">
          {menuObj.map((menu) => {
            return <MenuCard key={menu.id} menuData={menu} />;
          })}
        </div>
      </div>

      <div className="search-bar">
        <input type="text" />
        <button
          className="filter-restro"
          onClick={() => {
            const filteredList = allRestaurants.filter((res) => {
              return res.info.avgRating > 4.4;
            });
            setListRestro(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listRestro.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant.info.id} resData={restaurant} />
          );
        })}
      </div>
    </div>
  );
};
export default Body;
