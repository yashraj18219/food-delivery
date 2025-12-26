import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { DISH_URL } from "../utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const {resId} = useParams();

  useEffect(() => {
    const fetchMenu = async () => {
      const data = await fetch(DISH_URL + resId);
      const json = await data.json();
      setResInfo(json.data);
    };

    fetchMenu();
  }, []);

  //  Extract menu items here (NO extra function)
  useEffect(() => {
    if (!resInfo) return;

    const menuCards =
      resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

    const categoryCards = menuCards.filter(
      (c) =>
        c.card.card["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
        c.card.card["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
    );

    const items = [];

    categoryCards.forEach((cat) => {
      const card = cat.card.card;

      if (card?.categories) {
        card.categories.forEach((subCat) => {
          subCat.itemCards?.forEach((item) => items.push(item));
        });
      } else if (card?.itemCards) {
        card.itemCards.forEach((item) => items.push(item));
      }
    });

    setAllItems(items);
  }, [resInfo]);

  if (!resInfo) return <Shimmer />;

  const { name, cuisines, costForTwoMessage, areaName } =
    resInfo?.cards?.[2]?.card?.card?.info || {};

  return (
    <div className="menu">
      <h2>{name}</h2>
      <p>{cuisines?.join(", ")} - {costForTwoMessage}</p>
      <p>{areaName}</p>

      <h3>Menu</h3>

      {allItems.map((item, index) => {
  const info = item.card.info;
  return (
    <div key={`${info.id}-${index}`} className="menu-item">
      <h4>{info.name}</h4>
      <p>₹ {info.price / 100}</p>
      <p>{info.description}</p>
    </div>
  );
})}

    </div>
  );
};

export default RestaurantMenu;
