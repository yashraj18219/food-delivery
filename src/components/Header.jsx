import React, { useState } from "react";
import foodimg from "../assets/foodimg.jpg"
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const Header = ()=>{
    const[btnName,setBtnName] = useState("login");
    const onlineStatus = useOnlineStatus();

   const cartItems = useSelector((store) =>
  store.cart.items.reduce((total, item) => total + item.quantity, 0)
);

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
            cartItems === 0 ? "invisible" : "visible"
          }`}
        >
          ({cartItems})
        </span>
      </NavLink>
    </li>

    <li>
      <button
        className="  rounded-lg w-18 border hover:bg-gray-200 transition hover:cursor-pointer"
        onClick={() =>
          setBtnName(btnName === "login" ? "logout" : "login")
        }
      >
        {btnName}
      </button>
    </li>

  </ul>
</div>
    </div>)
}
export default Header
