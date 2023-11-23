import React from "react";
import { Link } from "react-router-dom";

const SearchCard = ({
  _id,
  productName,
  startBid,
  latestBid,
  startDate,
  endDate,
  description,
  productImage,
}) => {
  return (
    <Link to={`/product/${_id}`} >
      <div className="w-full justify-between px-3 mb-3 flex items-center">
        <div className="flex gap-3  items-center">
          {" "}
          <img
            src={productImage}
            className="w-10 h-10 rounded-[50%] object-cover"
            alt=""
          />
          <p>{productName}</p>
        </div>
        <div>
          <p>highest bid {latestBid ? latestBid : "-"} </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
