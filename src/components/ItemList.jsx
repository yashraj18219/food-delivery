import { MENU_URL } from "../utils/constants.jsx";
const ItemList = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <div
          key={item?.card?.info?.id}
          className="p-2 m-4 border-b-2 border-gray-200 text-left"
        >
          <div className="py-2 gap-1 flex justify-between">
            <div className="w-9/12">
              <span className="font-bold">{item.card.info.name} </span>
              <span className="font-bold text-gray-800">
                {" "}
                - ₹
                {item.card.info.defaultPrice / 100 ||
                  item.card.info.price / 100}
              </span>
              <p className="text-xs text-gray-400 ">
                {item.card.info.description}
              </p>
            </div>
            <div className="relative w-40 h-25">
              <img
                src={MENU_URL + item.card.info.imageId}
                className="w-40 rounded-lg h-25"
                alt="Dish Image"
              />
              <button
                className="absolute bottom-1 left-1/2 -translate-x-1/2
               bg-white shadow-lg px-3  rounded-lg
               text-green-600 font-bold text-sm"
              >
                ADD+
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ItemList;
