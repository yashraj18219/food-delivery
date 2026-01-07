import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useBody from "../utils/useBody";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const {allRestaurants,allMenu} = useBody();
  const [listRestro,setListRestro] = useState([]);
  const [searchText,setSearchText] = useState("");
  const onlineStatus = useOnlineStatus();
  

  
  useEffect(()=>{
      setListRestro(allRestaurants);
  },[allRestaurants]);

  if(onlineStatus === false)
  {
    return (<h2>Please, Check your internet connection!!</h2>)
  }

  if(listRestro.length === 0 || allMenu.length ===0)
  {
    return <Shimmer/>
  }
  return (
    <div className="max-w-[1250px] m-auto mt-20 ">
      <div className="mb-20 shadow-[inset_0_-1px_0_rgba(255,255,255,1),_0_1px_0_rgba(0,0,0,0.12)]" >
        <h2 className="ml-[15px] text-3xl font-semibold">Favourite Dishes</h2>
        <div className="flex flex-wrap justify-center py-2 ">
          {allMenu.map((menu) => {
            return <MenuCard key={menu.id} menuData={menu} />;
          })}
        </div>
      </div>

      <div className=" flex gap-15 ml-[80px] mb-5">
          <div className="flex gap-3">
            <input type="text" className="border-[1.5px] 
    rounded-lg 
    px-3 
    outline-none
    " value={searchText}  onChange={(e)=>{
                setSearchText(e.target.value);
            }}/>
            <button type="button" className="text-xl hover:cursor-pointer px-6 py-2 bg-green-100 rounded-lg" onClick={()=>{
              const filteredRestro = allRestaurants.filter((rest)=>{
                return rest.info.name.toLowerCase().includes(searchText.toLowerCase());
              });
              setListRestro(filteredRestro);
              
            }}>Search</button>
          </div>
        <button
          className="text-xl font-medium hover:cursor-pointer bg-gray-200 px-4 py-2 rounded-lg"
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
     <div className="res-container flex flex-wrap justify-center">
        {listRestro.map((restaurant) => {
          return (
            <Link key={restaurant.info.id} to={"restaurants/"+restaurant.info.id} className="all">
            <RestaurantCard  resData={restaurant} />
            </Link>
            
          );
        })}
      </div>

    </div>
  );
};
export default Body;
