import React from "react";
import foodimg from "../assets/foodimg.jpg"
// import ReactDOM from "react/client";
const Header = ()=>{
    return(<div className="header">
        <div className="logo-container">
            <img  src={foodimg} alt="App logo" />
        </div>
        <div className="nav-items">
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Cart</li>
            </ul>
        </div>
    </div>)
}
export default Header
