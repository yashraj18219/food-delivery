import React, { useState } from "react";
import foodimg from "../assets/foodimg.jpg"
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = ()=>{
    const[btnName,setBtnName] = useState("login");
    const onlineStatus = useOnlineStatus();

    return(<div className="flex justify-between items-center bg-gray-[150] p-1 shadow-xl mb-5 ">
        <div >
            <img  className="w-22 rounded-full " src={foodimg} alt="App logo" />
        </div>
        <div>
            <ul className="flex p-4 m-3 gap-6 text-xl font-medium">
                <li>
                     Status: {(onlineStatus? "🍏" : "🍎")}
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li><Link to="/about">About Us</Link>
                </li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li>Cart</li>
                <button className="w-18 cursor-pointer rounded-lg border-1 hover:bg-gray-400" onClick={()=>{
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
