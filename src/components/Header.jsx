import React, { useState } from "react";
import foodimg from "../assets/foodimg.jpg"
import { Link } from "react-router-dom";
const Header = ()=>{
    const[btnName,setBtnName] = useState("login");
    return(<div className="header">
        <div className="logo-container">
            <img  src={foodimg} alt="App logo" />
        </div>
        <div className="nav-items">
            <ul>
                
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li><Link to="/about">About Us</Link>
                </li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li>Cart</li>
                <button className="login-logout" onClick={()=>{
                    if(btnName ==="login")
                    setBtnName("logout");
                else{
                    setBtnName("login");
                }
                }}>{btnName}</button>
            </ul>
        </div>
    </div>)
}
export default Header
