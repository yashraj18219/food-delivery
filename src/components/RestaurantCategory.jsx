import { useState } from "react";
import ItemList from "./ItemList";

const getItemsFromCategory = (data) => {
  // Case 1: Direct itemCards
  if (data?.itemCards) {
    return data.itemCards;
  }

  // Case 2: Nested categories
  if (data?.categories) {
    return data.categories.flatMap(
      (cat) => cat.itemCards || []
    );
  }

  return [];
};

const RestaurantCategory = ({ data }) => {
  const items = getItemsFromCategory(data);
   const [showItems,setShowItems] = useState(true); 
  if (!items.length) return null;
     const handleClick =()=>{
            setShowItems(!showItems);
     }
  return (
    <div className="w-6/12 m-auto shadow-xl  my-4 py-4 px-2 rounded-sm">
      <div className="flex justify-between cursor-pointer " onClick={handleClick}>
        <span className="font-bold text-xl">
          {data.title} ({items.length})
        </span>
        <span>⏬</span>
      </div>

      {showItems && <ItemList items={items} />}
    </div>
  );
};

export default RestaurantCategory;
