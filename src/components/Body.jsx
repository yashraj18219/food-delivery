import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useBody from "../utils/useBody";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const { allRestaurants, allMenu } = useBody();
  const [listRestro, setListRestro] = useState([]);
  const [searchText, setSearchText] = useState("");
  const onlineStatus = useOnlineStatus();
  const [isTopRatedActive, setIsTopRatedActive] = useState(false);

  useEffect(() => {
    setListRestro(allRestaurants);
  }, [allRestaurants]);

  if (onlineStatus === false) {
    return <h2>Please, Check your internet connection!!</h2>;
  }

  if (listRestro.length === 0 || allMenu.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="max-w-[1250px] m-auto mt-20 ">
      <div className="mb-20 shadow-[inset_0_-1px_0_rgba(255,255,255,1),_0_1px_0_rgba(0,0,0,0.12)]">
        <h2 className="ml-[15px] text-3xl font-semibold">Favourite Dishes</h2>
        <div className="flex flex-wrap justify-center py-2 ">
          {allMenu.map((menu) => {
            return <MenuCard key={menu.id} menuData={menu} />;
          })}
        </div>
      </div>

      <div className=" flex gap-15 ml-20 mb-5">
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-md">
    
    {/* Search Input */}
    <input
      type="text"
      placeholder="Search restaurants..."
      className="border border-gray-300 rounded-lg px-4 py-2 w-72
      outline-none transition-all duration-200
      focus:border-green-500 focus:ring-2 focus:ring-green-200"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />

    {/* Search Button */}
    <button
      type="button"
      onClick={() => {
        const filteredRestro = allRestaurants.filter((rest) =>
          rest.info.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setListRestro(filteredRestro);
      }}
      className="flex items-center gap-2 text-lg font-medium
      px-6 py-2 rounded-lg
      bg-green-400 text-white
      hover:bg-green-500 hover:scale-105
      active:scale-95 transition-all duration-200"
    >
      🔍 Search
    </button>
  </div>
        <button
          type="button"
          onClick={() => {
            const filteredList = allRestaurants
              .filter((res) => res.info.avgRating > 4.3)
              .sort((a, b) => b.info.avgRating - a.info.avgRating); //  decreasing order

            setListRestro(filteredList);
            setIsTopRatedActive(true);
          }}
          className={`text-lg font-medium px-5  rounded-lg transition-all duration-300
    ${isTopRatedActive ? "bg-green-500 text-white" : "bg-gray-200 text-black"}
    hover:bg-green-400 hover:text-white hover:scale-105`}
        >
          ⭐ Top Rated Restaurants
        </button>
      </div>
      <div className="res-container flex flex-wrap justify-center">
        {listRestro.map((restaurant) => {
          return (
            <Link
              key={restaurant.info.id}
              to={"restaurants/" + restaurant.info.id}
              className="all"
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Body;
