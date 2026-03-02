import React, { useEffect, useState, useRef } from "react";
import MenuCard from "./MenuCard";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useBody from "../utils/useBody";
import useOnlineStatus from "../utils/useOnlineStatus";
import StatusModal from "./StatusModal";

const Body = () => {
  const { allRestaurants, allMenu } = useBody();
  const [listRestro, setListRestro] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDish, setSelectedDish] = useState("");
  const onlineStatus = useOnlineStatus();
  const [isTopRatedActive, setIsTopRatedActive] = useState(false);
  const listRef = useRef(null);
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    setListRestro(allRestaurants);
  }, [allRestaurants]);

  useEffect(() => {
    // when user types manually, clear dish filter
    if (searchText) {
      setSelectedDish("");
    }

    const query = searchText.trim().toLowerCase();
    if (!query) {
      setListRestro(allRestaurants);
      return;
    }
    const filtered = allRestaurants.filter((rest) =>
      rest.info.name.toLowerCase().includes(query)
    );
    setListRestro(filtered);
  }, [searchText, allRestaurants]);

  const handleDishClick = (menu) => {
    const dishText = (
      menu?.text ||
      menu?.action?.text ||
      menu?.name ||
      ""
    ).trim();
    if (!dishText) return;

    const query = dishText.toLowerCase();
    const filtered = allRestaurants.filter((rest) => {
      const name = rest?.info?.name || "";
      const cuisines = rest?.info?.cuisines || [];
      const inName = name.toLowerCase().includes(query);
      const inCuisine = cuisines.some((c) =>
        c.toLowerCase().includes(query)
      );
      return inName || inCuisine;
    });

    setSelectedDish(dishText);
    setIsTopRatedActive(false);
    setSearchText("");
    setListRestro(filtered);

    if (filtered.length === 0) {
      setModal({
        open: true,
        title: "No restaurants found",
        message: `We couldn't find any restaurants serving \"${dishText}\" right now.`,
      });
    } else if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (onlineStatus === false) {
    return <h2>Please, Check your internet connection!!</h2>;
  }

  if (allRestaurants.length === 0 || allMenu.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="max-w-[1250px] m-auto mt-20 px-3 pb-10">
      <div className="mb-20 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-green-50 shadow-[inset_0_-1px_0_rgba(255,255,255,1),_0_1px_0_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between px-4 pt-4">
          <h2 className="ml-[4px] text-3xl font-semibold text-gray-900">
            Favourite Dishes
          </h2>
          {selectedDish && (
            <button
              type="button"
              onClick={() => {
                setSelectedDish("");
                setSearchText("");
                setListRestro(allRestaurants);
              }}
              className="text-sm px-3 py-1 rounded-full bg-white/80 text-gray-700 border border-gray-200 hover:bg-white"
            >
              Clear dish filter
            </button>
          )}
        </div>
        <div className="flex flex-wrap justify-center py-3">
          {allMenu.map((menu) => {
            return (
              <MenuCard
                key={menu.id}
                menuData={menu}
                onClick={() => handleDishClick(menu)}
              />
            );
          })}
        </div>
      </div>

      <div className="flex gap-8 ml-5 mb-6 items-center">
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-md border border-gray-100">
    
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

    <button
      type="button"
      className="flex items-center gap-2 text-lg font-medium
      px-6 py-2 rounded-lg
      bg-green-400 text-white
      hover:bg-green-500 hover:scale-105
      active:scale-95 transition-all duration-200 pointer-events-none"
      aria-hidden
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
            setSelectedDish("");
            setSearchText("");
          }}
          className={`text-lg font-medium px-5  rounded-lg transition-all duration-300
    ${isTopRatedActive ? "bg-green-500 text-white" : "bg-gray-200 text-black"}
    hover:bg-green-400 hover:text-white hover:scale-105`}
        >
          ⭐ Top Rated Restaurants
        </button>
      </div>
      <div
        ref={listRef}
        className="res-container flex flex-wrap justify-center cursor-default mt-4"
      >
        {(selectedDish || searchText) && (
          <div className="w-full text-center mb-4 text-gray-700">
            Showing restaurants for{" "}
            <span className="font-semibold">
              {selectedDish || `"${searchText}"`}
            </span>
          </div>
        )}

        {listRestro.length === 0 ? (
          <div className="w-full max-w-md text-center mt-10 text-gray-600">
            <p className="text-lg font-medium mb-2">No results found</p>
            <p className="text-sm mb-4">
              Try a different dish, restaurant name, or{" "}
              <span className="font-semibold">clear filters</span> to see all
              restaurants.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedDish("");
                setSearchText("");
                setIsTopRatedActive(false);
                setListRestro(allRestaurants);
              }}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900"
            >
              Show all restaurants
            </button>
          </div>
        ) : (
          listRestro.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"restaurants/" + restaurant.info.id}
              className="all"
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          ))
        )}
      </div>
      <StatusModal
        isOpen={modal.open}
        onClose={() => setModal((m) => ({ ...m, open: false }))}
        type="error"
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
};
export default Body;
