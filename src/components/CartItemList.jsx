import { MENU_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const CartItemList = ({ items }) => {
  const dispatch = useDispatch();

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="p-2 m-4 border-b-2 border-gray-200 text-left"
        >
          <div className="flex justify-between items-center">
            
            {/* Item Info */}
            <div className="w-9/12">
              <p className="font-bold">{item.name}</p>
              <p className="text-gray-700">₹{item.price}</p>
            </div>

            {/* Image */}
            <div className="relative w-32">
              <img
                src={MENU_URL + item.imageId}
                className="w-32 h-24 rounded-lg object-cover"
                alt={item.name}
              />

              {/* + / − Controls */}
              <div
                className="absolute bottom-1 left-1/2 -translate-x-1/2
                           bg-white shadow-lg rounded-lg
                           flex items-center gap-3 px-3 py-1"
              >
                <button
                  className="text-lg font-bold text-green-600"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  −
                </button>

                <span className="font-bold">{item.quantity}</span>

                <button
                  className="text-lg font-bold text-green-600"
                  onClick={() => dispatch(addItem(item))}
                >
                  +
                </button>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemList;
