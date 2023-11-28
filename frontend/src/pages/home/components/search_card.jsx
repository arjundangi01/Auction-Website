import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { calculateTimeRemaining } from "../../../utils/date";

const SearchCard = ({
  _id,
  productName,
  startBid,
  purchaseBy,
  latestBid,
  startDate,
  endDate,
  description,
  productImage,
}) => {
  const [expireTime, setExpireTime] = useState();
  useEffect(() => {
    if (endDate) {
      setExpireTime(calculateTimeRemaining(endDate) + 1);
    }
    // getProduct();
  }, []);
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
        {purchaseBy ? (
                purchaseBy == "Expire" ? (
                  <p className="absolute right-0 top-3 bg-green-200 text-[1.2rem] font-bold rounded-xl px-4 py-1 text-red-500">
                   Auction Ended
                  </p>
                ) : (
                  <p className="absolute right-0 top-3 bg-green-200 text-[1.2rem] font-bold rounded-xl px-4 py-1 text-red-500">
                    sold
                  </p>
                )
              ) : (
                <p className="absolute right-0 top-3 bg-green-200 text-[1.2rem] font-bold rounded-xl px-4 py-1 text-red-500">
                  {expireTime} Day Left
                </p>
              )}
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
