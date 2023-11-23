import axios from "axios";
import React, { useEffect, useState } from "react";
import BidCard from "./bidCard";

const Bids = ({ _id }) => {
  const [allBids, setAllBids] = useState([]);
  useEffect(() => {
    getBids();
  }, []);
 
  const getBids = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/bids/all/${_id}`
      );
      // console.log(response);
      setAllBids(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
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
