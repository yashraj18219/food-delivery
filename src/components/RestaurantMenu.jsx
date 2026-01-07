import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const [allItems, setAllItems] = useState([]);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (!resInfo) return <Shimmer />;

  const menuCards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const categoryCards = menuCards.filter(
    (c) =>
      c.card.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
      c.card.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
  );

  // const items = [];
  // console.log(categoryCards);

  // categoryCards.forEach((cat) => {
  //   const card = cat.card.card;

  //   if (card?.categories) {
  //     card.categories.forEach((subCat) => {
  //       subCat.itemCards?.forEach((item) => items.push(item));
  //     });
  //   } else if (card?.itemCards) {
  //     card.itemCards.forEach((item) => items.push(item));
  //   }
  // });
  // setAllItems(items);

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
