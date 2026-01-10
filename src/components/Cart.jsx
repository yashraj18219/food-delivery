import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import CartItemList from "./CartItemList";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart</h1>

      <div className="w-6/12 m-auto">
        <button
          className="shadow-lg bg-red-400 px-3 py-2 m-3 rounded-lg
                     text-gray-800 font-bold text-xl hover:cursor-pointer"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>

        {cartItems.length === 0 && (
          <h1 className="text-red-400 text-lg">
            Cart is empty. Add items!
          </h1>
        )}

        <CartItemList items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
