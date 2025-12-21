import React from "react";

const RestaurantCard = (props) => {
  const { resData } = props;
  return (
    <div className="res-card">
      <img className="res-img" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${resData.info.cloudinaryImageId}`} />
     <div className="res-details">
         <h3>{resData.info.name}</h3>
      
      <h4 className="cost">{resData.info.costForTwo}</h4>

      <div className="rating-row">
        <div className="rating-icon">
          <img src="./src/star.png" alt="star" />
          <span>{resData.info.avgRating}</span>
        </div>

        <span className="delivery-time">
          {resData.info.sla.slaString} 
        </span>
      </div>
      <span className="cuisines">{resData.info.cuisines.join(", ")}</span>
      <p>{resData.info.areaName}</p>
     </div>
    </div>
  );
};

export default RestaurantCard;
