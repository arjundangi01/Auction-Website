import React, { useEffect, useState } from "react";
import Drawer from "./components/drawer";
import axios from "axios";
import { useParams } from "react-router-dom";
import About from "./components/about";
import Bids from "./components/bids";
import { useSelector } from "react-redux";
import { calculateTimeRemaining } from "../../utils/date";

const Product = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);
  const [product, setProduct] = useState();
  const [owner, setOwner] = useState(null);
  const [highestBid, setHighestBid] = useState(0);
  const [tab, setTabs] = useState("about");
  const [expireTime, setExpireTime] = useState();

  const { id } = useParams();
  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    if (product?.endDate) {
      setExpireTime(calculateTimeRemaining(product?.endDate) + 1);
    }
    // getProduct();
  }, [product]);

  const { loginUserDetail } = useSelector((store) => store.userReducer);

  const getProduct = async () => {
    // console.log(id)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/single/${id}`
      );
      // console.log(response);
      setProduct(response.data.product);
      setOwner(response.data.owner);
      if (response.data.highestBid) {
        setHighestBid(response.data.highestBid);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="mt-5 pb-[4rem]">
      <section className="w-[80%] m-auto">
        <div className="flex gap-10">
          <div className="w-[70%] relative">
            {product?.purchaseBy ? (
              <p className="absolute right-0 top-3 bg-green-200 text-[1.2rem] font-bold rounded-xl px-7 py-2 text-red-500">
                sold
              </p>
            ) : (
              <p className="absolute right-0 top-3 bg-green-200 text-[1.2rem] font-bold rounded-xl px-7 py-2 text-red-500">
                {expireTime} Day Left
              </p>
            )}

            <img
              className="rounded-3xl w-[100%] max-h-[500px] min-h-[500px] object-cover"
              src={product?.productImage}
              alt=""
            />
          </div>
          <div className="bg-[#eff1f4] rounded-3xl px-5 w-[30%] py-2">
            <h1 className="text-[2rem] ">{product?.productName}</h1>
            <div className="my-5">
              <div className="flex justify-between border-b-[1px] border-black py-2">
                <p>Start Bid</p>
                <p>₹ {product?.startBid}</p>
              </div>
              <div className="flex justify-between border-b-[1px] border-black py-2 ">
                <p>highestBid Bid</p>
                {highestBid ? <p>₹ {highestBid}</p> : <p>-</p>}
              </div>
              <div className="flex justify-between border-b-[1px] border-black py-2">
                <p>Total Bids</p>
                <p>{}</p>
              </div>
            </div>
            <div className="flex justify-between ">
              {product?.purchaseBy ? (
                product?.purchaseBy == "Expire" ? (
                  <>
                    <p className="text-[1.2rem] text-[red]  ">Expired</p>
                    <p> 'Auction Expired No one placed Bid' </p>
                  </>
                ) : (
                  <>
                    <p className="text-[1.2rem] text-[red]  ">Expired</p>
                    <p className="text-[1.2rem]  ">
                      Sold to {product?.purchaseByName}{" "}
                    </p>
                  </>
                )
              ) : loginUserDetail?._id == owner?._id ? (
                <p className="text-[1.2rem] text-[red] text-center ">
                  This product is listed by You
                </p>
              ) : (
                <>
                  {" "}
                  <input
                    onChange={(e) => setBidAmount(e.target.value)}
                    type="text"
                    placeholder="Enter Amount"
                    className="outline-none bg-transparent border-b-[1px] border-black"
                  />
                  <button
                    onClick={() => setShowDrawer(!showDrawer)}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg "
                  >
                    Bid Now
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {/* tabs div */}
        <div className=" mt-8 bg-[#eff1f4] rounded-3xl py-5">
          <div className="  w-[80%] m-auto">
            <div className="flex justify-around">
              <div
                onClick={() => setTabs("about")}
                className={` ${tab == "about" ? "bg-blue-600" : "bg-white"} ${
                  tab == "about" ? "text-white" : "text-black"
                } rounded-lg px-20 py-3 cursor-pointer ${
                  tab == "about" ? "border-[0px]" : "border-[1px]"
                } border-black `}
              >
                {" "}
                About{" "}
              </div>
              <div
                onClick={() => setTabs("bids")}
                className={` ${tab == "bids" ? "bg-blue-600" : "bg-white"} ${
                  tab == "bids" ? "text-white" : "text-black"
                } ${
                  tab == "bids" ? "border-[0px]" : " border-[1px]"
                } rounded-lg px-20 py-3 cursor-pointer border-black`}
              >
                {" "}
                All Bids{" "}
              </div>
            </div>
            <div className="mt-5 max-h-[240px] min-h-[240px]  overflow-y-scroll ">
              {tab == "about" ? (
                <About {...product} {...owner} />
              ) : (
                <Bids {...product} />
              )}
            </div>
          </div>
        </div>
      </section>
      {}
      <Drawer
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        {...product}
        bidAmount={bidAmount}
        highestBid={highestBid}
      />
    </main>
  );
};

export default Product;
