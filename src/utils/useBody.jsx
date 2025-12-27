import { RES_LIST_URL } from "./constants";
import { useState,useEffect } from "react";
const useBody = ()=>{
    const [allMenu,setAllMenu] = useState([]);
    const [allRestaurants,setAllRestaurants] = useState([]);
    // const [listRestro,setListRestro] = useState("");

    const fetchData= async()=>{
        const data = await fetch(RES_LIST_URL);
        const json = await data.json();
        setAllRestaurants(json?.data?. cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        // setListRestro(json?.data?. cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setAllMenu(json?.data?. cards[0]?.card?.card?.gridElements?.infoWithStyle?.info);
    }
    useEffect(()=>{
        fetchData();
    },[]);


    return {
        allRestaurants,allMenu
    };
};
export default useBody;