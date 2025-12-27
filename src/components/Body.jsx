import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useBody from "../utils/useBody";

const Body = () => {
  const {allRestaurants,allMenu} = useBody();
  const listRestro = allRestaurants;
  const [searchText,setSearchText] = useState("");
  
  if(listRestro.length === 0 || allMenu.length ===0)
  {
    return <Shimmer/>
  }
  return (
    <div className="body">
      <div className="menu-box">
        <h2>Favourite Dishes</h2>
        <div className="menu-container">
          {allMenu.map((menu) => {
            return <MenuCard key={menu.id} menuData={menu} />;
          })}
        </div>
      </div>

      <div className="search-bar">
          <div className="search-box">
            <input type="text" className="search-restro" value={searchText}  onChange={(e)=>{
                setSearchText(e.target.value);
            }}/>
            <button type="button" onClick={()=>{
              const filteredRestro = allRestaurants.filter((rest)=>{
                return rest.info.name.toLowerCase().includes(searchText.toLowerCase());
              });
              setListRestro(filteredRestro);
              
            }}>Search</button>
          </div>
        <button
          className="filter-restro"
          type="button"
          onClick={() => {
            const filteredList = allRestaurants.filter((res) => {
              return res.info.avgRating > 4.3;
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
            <Link key={restaurant.info.id} to={"restaurants/"+restaurant.info.id}>
            <RestaurantCard  resData={restaurant} />
            </Link>
            
          );
        })}
      </div>
    </div>
  );
};
export default Body;
