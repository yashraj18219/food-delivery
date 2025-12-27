import { useState,useEffect } from "react";
import { DISH_URL } from "./constants";
const useRestaurantMenu = (resId)=>{
    const[resInfo,setResInfo] = useState(null);
   
    const fetchMenu = async()=>{
        const data = await fetch(DISH_URL+resId);
        const json = await data.json();
        setResInfo(json.data);
        
    }
     useEffect(()=>{
        fetchMenu();
    },[]);
    return resInfo;
}
export default useRestaurantMenu;