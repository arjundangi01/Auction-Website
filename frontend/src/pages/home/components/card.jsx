import React from "react";
import { Link } from "react-router-dom";

const Card = ({_id,productName,startBid,latestBid,startDate,endDate,description,productImage}) => {
  return (
    <Link to={`/product/${_id}`} >
      <div className="border rounded-xl hover:translate-y-0 translate-y-2 ">
        <div className="max-h-[220px] min-h-[220px] w-full overflow-hidden rounded-lg bg-gray-200 ">
          <img
            src={productImage}
            alt=""
            className="h-full min-h-[220px] w-full max-h-[100%] object-cover group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-[1.2rem] text-gray-700 px-3">{productName}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900 px-3">
          Current Bid {latestBid}
        </p>
      </div>
    </Link>
  );
};

export default Card;
