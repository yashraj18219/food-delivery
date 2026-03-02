import { getCart, addItem, removeItem } from "../utils/cart";

const AddButton = ({ item }) => {
  const itemId = item.card.info.id;
  const cartItem = getCart().find((i) => i.id === itemId);

  const handleAddItem = (item) => {
    addItem({
      id: itemId,
      name: item.card.info.name,
      price: (item.card.info.defaultPrice ?? item.card.info.price) / 100,
      imageId: item.card.info.imageId,
    });
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
        onClick={() => removeItem(itemId)}
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
