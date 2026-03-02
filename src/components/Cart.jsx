import { useNavigate } from "react-router-dom";
import { getCart, clearCart } from "../utils/cart";
import CartItemList from "./CartItemList";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = getCart();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart</h1>

      <div className="w-6/12 m-auto">
        <button
          className="shadow-lg bg-red-400 px-3 py-2 m-3 rounded-lg
                     text-gray-800 font-bold text-xl hover:cursor-pointer"
          onClick={clearCart}
        >
          Clear Cart
        </button>

        {cartItems.length === 0 && (
          <h1 className="text-red-400 text-lg">
            Cart is empty. Add items!
          </h1>
        )}

        <CartItemList items={cartItems} />

        {cartItems.length > 0 && (
          <div className="mt-6 p-4 border-t-2 border-gray-200">
            <p className="text-xl font-semibold mb-3">Total: ₹{totalAmount}</p>
            <button
              type="button"
              onClick={() => navigate("/checkout", { state: { totalAmount } })}
              className="shadow-lg bg-green-500 px-6 py-3 rounded-lg text-white font-bold text-lg hover:bg-green-600"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
