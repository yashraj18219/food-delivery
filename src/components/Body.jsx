import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import  menuObj  from "../utils/mockData";
import { Link } from "react-router-dom";

const Body = () => {

  const [allRestaurants, setAllRestaurants]= useState([])
  let [listRestro,setListRestro] = useState([]);
  const [searchText,setSearchText] = useState("");
  
  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async()=>{
      const data = await fetch("https://foodfire.onrender.com/api/restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING")
      const json = await data.json();
      console.log(json);
      setAllRestaurants(json?.data?. cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setListRestro(json?.data?. cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      
  }
  if(listRestro.length === 0)
  {
    return <Shimmer/>
  }
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
