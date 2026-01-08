import React from "react";
import { RES_URL } from "../utils/constants";
import star from "../assets/star.png";
import { Link } from "react-router-dom";
const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, costForTwo, avgRating, cuisines } = resData?.info;

  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div
      className="res-card w-62.5 p-2 m-4 rounded-xl  transition-all duration-300 ease-in-out
    hover:bg-[#e3dfcc]
    hover:cursor-pointer
    hover:-translate-y-2
    hover:scale-[1.05]
    hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)]"
    >
      <img
        className="res-img w-full h-36.5 rounded-xl "
        src={RES_URL + resData.info.cloudinaryImageId}
      />
      <div className="res-details p-1 rounded-xl">
        <h3 className="font-bold ">{name}</h3>

        <h4>{costForTwo}</h4>

        <div className="rating-row flex items-center mt-1 mb-1 text-sm gap-5 font-medium">
          <div className="rating-icon flex items-center">
            <img className="w-3.5 h-3.5 " src={star} alt="star" />
            <span>{avgRating}</span>
          </div>

          <span>{resData.info.sla.slaString}</span>
        </div>
        <span className="cuisines block truncate ">{cuisines.join(", ")}</span>
        <p>{toTitleCase(resData.info.areaName)}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
