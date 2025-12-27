import React from "react";
import { RES_URL } from "../utils/constants";
import star from "../assets/star.png"
const RestaurantCard = (props) => {
  const { resData } = props;
  const {name,costForTwo,avgRating,cuisines} = resData?.info
  return (
    <div className="res-card">
      <img className="res-img" src={RES_URL+resData.info.cloudinaryImageId} />
     <div className="res-details">
         <h3>{name}</h3>
      
      <h4 className="cost">{costForTwo}</h4>

      <div className="rating-row">
        <div className="rating-icon">
          <img src={star} alt="star" />
          <span>{avgRating}</span>
        </div>

        <span className="delivery-time">
          {resData.info.sla.slaString} 
        </span>
      </div>
      <span className="cuisines">{cuisines.join(", ")}</span>
      <p>{resData.info.areaName}</p>
     </div>
    </div>
  );
};

export default RestaurantCard;
