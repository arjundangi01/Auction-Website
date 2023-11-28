import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { FaTrophy } from "react-icons/fa6";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { TbCoinRupeeFilled } from "react-icons/tb";
const Work = () => {
  return (
    <main className="mt-4 mb-2 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3  xl:grid-cols-4">
      <div className="px-4">
        <div className="flex justify-between items-center">
          <MdAccountCircle className="text-[4rem] text-indigo-400" />
          <FaArrowRight className="text-[1.4rem]" />
        </div>
        <h1 className="text-[2rem] font-bold">Register</h1>
        <p className="mt-3">
          Sign up to unleash the excitement! Create an account to access
          exclusive auctions, track your bids, and join the bidding community.
          Registration is your passport to a world of thrilling auctions.
        </p>
      </div>
      <div className="px-4">
        <div className="flex justify-between items-center">
          <FaRegMoneyBill1 className="text-[4rem] text-indigo-400" />
          <FaArrowRight className="text-[1.4rem]" />
        </div>
        <h1 className="text-[2rem] font-bold">Buy or Bid</h1>
        <p className="mt-3">
          Browse our diverse collection of premium products. From rare
          collectibles to cutting-edge gadgets, find items that pique your
          interest. Your next prized possession is just a bid away!
        </p>
      </div>
      <div className="px-4">
        <div className="flex justify-between items-center">
          <TbCoinRupeeFilled className="text-[4rem] text-indigo-400" />
          <FaArrowRight className="text-[1.4rem]" />
        </div>
        <h1 className="text-[2rem] font-bold">Submit a Bid</h1>
        <p className="mt-3">
          Ready, set, bid! Elevate the thrill by placing your bid on the items
          you desire. Enter the amount you're willing to pay and watch the
          competition unfold. Keep a close eye as the clock counts down to
          secure your winning bid.
        </p>
      </div>
      <div className="px-4">
        <div className="flex justify-between items-center">
          <FaTrophy className="text-[4rem] text-indigo-400" />
        </div>
        <h1 className="text-[2rem] font-bold">Win</h1>
        <p className="mt-3">
          Victory is sweet! If your bid stands tall when the auction curtain
          falls, congratulations – you're the proud winner! Revel in the joy of
          securing the coveted item at the best possible price.
        </p>
      </div>
    </main>
  );
};

export default Work;
