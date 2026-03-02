import React from "react";
import foodimg from "../assets/foodimg.jpg";
import { Link, useNavigate } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { NavLink } from "react-router-dom";
import { logout, getUser } from "../utils/auth";
import { getCart } from "../utils/cart";

const Header = () => {
  const navigate = useNavigate();
  const user = getUser();
  const cartItems = getCart();
  const onlineStatus = useOnlineStatus();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const isDeliveryPartner = user?.role === "Delivery Partner";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

    return(<div className="flex justify-between items-center bg-gray-[150] p-1 shadow-xl  ">
            <Link to="/">
                <img  className="w-15 h-15 rounded-full mx-5" src={foodimg} alt="App logo" />
            </Link>
            
        
        <div>
  <ul className="flex mx-7 gap-4 text-xl font-medium items-center">

    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-2 py-1 ${
            isActive ? "text-orange-500" : "hover:text-gray-600"
          }`
        }
      >
        Home
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `px-2 py-1 ${
            isActive ? "text-orange-500" : "hover:text-gray-600"
          }`
        }
      >
        About
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `px-2 py-1 ${
            isActive ? "text-orange-500" : "hover:text-gray-600"
          }`
        }
      >
        Contact
      </NavLink>
    </li>

    {!isDeliveryPartner && (
    <li>
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `px-2 py-1 ${isActive ? "text-orange-500" : "hover:text-gray-600"}`
        }
      >
        My Orders
      </NavLink>
    </li>
    )}
    {isDeliveryPartner && (
    <li>
      <NavLink
        to="/delivery"
        className={({ isActive }) =>
          `px-2 py-1 ${isActive ? "text-orange-500" : "hover:text-gray-600"}`
        }
      >
        My Deliveries
      </NavLink>
    </li>
    )}
    <li>
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `px-2 py-1 flex items-center gap-1 ${
            isActive ? "text-orange-500" : "hover:text-gray-600"
          }`
        }
      >
        Cart
        <span
          className={`min-w-[23px] text-center ${
            cartCount === 0 ? "invisible" : "visible"
          }`}
        >
          ({cartCount})
        </span>
      </NavLink>
    </li>

    <li>
      <button
        className="rounded-lg w-22 border hover:bg-gray-200 transition hover:cursor-pointer px-3 py-1"
        onClick={handleLogout}
      >
        Logout
      </button>
    </li>

  </ul>
</div>
    </div>)
}
export default Header
