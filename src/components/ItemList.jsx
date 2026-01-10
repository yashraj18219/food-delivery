import AddButton from "./AddButton";
import {MENU_URL} from "../utils/constants"

const ItemList = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-4 border-b-2 border-gray-200 text-left"
        >
          <div className="py-2 gap-1 flex justify-between">
            <div className="w-9/12">
              <span className="font-bold">
                {item.card.info.name}
              </span>
              <span className="font-bold text-gray-800">
                {" "}
                - ₹
                {item.card.info.defaultPrice / 100 ||
                  item.card.info.price / 100}
              </span>
              <p className="text-xs text-gray-400">
                {item.card.info.description}
              </p>
            </div>

            <div className="relative w-40 h-25">
              <img
                src={MENU_URL + item.card.info.imageId}
                className="w-40 h-25 rounded-lg"
                alt="Dish"
              />

              
              <AddButton item={item} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
