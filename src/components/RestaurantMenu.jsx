import React, { useEffect, useState } from "react";
import ShimmerMenu from "./ShimmerMenu";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const [allItems, setAllItems] = useState([]);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (!resInfo) return <ShimmerMenu />;

  const menuCards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const categoryCards = menuCards.filter(
    (c) =>
      c.card.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
      c.card.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
  );

 

  const { name, cuisines, costForTwoMessage, areaName } =
    resInfo?.cards[2]?.card?.card?.info || {};

  return (
    <div className="text-center">
      <h2 className="font-bold  my-6 text-2xl">{name}</h2>
      <p className="font-bold text-lg text-gray-800">
        {cuisines?.join(", ")} - {costForTwoMessage}
      </p>
      <p className="text-gray-900 font-medium">Location : {areaName}</p>
      {categoryCards.map((category) => {
        return (
          <RestaurantCategory
            key={category.card.card.categoryId}
            data={category?.card?.card}
          />
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
