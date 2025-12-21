import React from "react";
// import ReactDOM from "react/client";
const Header = ()=>{
    return(<div className="header">
        <div className="logo-container">
            <img  src="./src/5514794.jpg" alt="App logo" />
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
