import axios from "axios";
import React, { useEffect, useState } from "react";
import BidCard from "./bidCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBidsAction } from "../../../redux/bids/bid.action";

const Bids = ({ _id }) => {
  const dispatch = useDispatch();
  const { allBids } = useSelector((store) => store.bidReducer)
  console.log(allBids)
  useEffect(() => {
    // getBids();
    dispatch(getAllBidsAction(_id))
  }, []);
  

  return (
    <div className="pr-3" >
      <h1 className="text-[2rem] " >All Bids</h1>
      <div className="mt-2">
        {allBids.map((bid) => (
       
          
         <BidCard {...bid} />
        ))}
      </div>
    </div>
  );
};

export default Bids;
