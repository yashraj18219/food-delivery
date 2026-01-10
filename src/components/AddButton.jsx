import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const AddButton = ({ item }) => {
  const dispatch = useDispatch();

  const itemId = item.card.info.id;

  const cartItem = useSelector((store) =>
    store.cart.items.find((i) => i.id === itemId)
  );

  // Handler to add item
  const handleAddItem = (item) => {
    dispatch(
      addItem({
        id: itemId, // UNIQUE
        name: item.card.info.name,
        price: (item.card.info.defaultPrice ?? item.card.info.price) / 100,
        imageId: item.card.info.imageId,
      })
    );
  };

  // NOT IN CART
  if (!cartItem) {
    return (
      <button
        className="absolute bottom-1 left-1/2 -translate-x-1/2
             bg-white shadow-lg px-3 rounded-lg
             text-green-600 font-bold text-sm cursor-pointer
             transition-all duration-150
             hover:shadow-xl
             active:scale-95 hover:bg-green-100"
        onClick={() => handleAddItem(item)}
      >
        ADD +
      </button>
    );
  }

  // IN CART
  return (
    <div
      className="absolute bottom-1 left-1/2 -translate-x-1/2
                 bg-white shadow-lg rounded-lg
                 flex items-center gap-3 px-3 py-1"
    >
      <button
        className="text-lg font-bold text-green-600 cursor-pointer"
        onClick={() => dispatch(removeItem(itemId))}
      >
        −
      </button>

      <span className="font-bold">{cartItem.quantity}</span>

      <button
        className="text-lg font-bold text-green-600 cursor-pointer"
        onClick={() => handleAddItem(item)}
      >
        +
      </button>
    </div>
  );
};

export default AddButton;
