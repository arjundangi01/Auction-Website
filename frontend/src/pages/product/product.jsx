import React, { useEffect, useState } from "react";
import Drawer from "./components/drawer";
import axios from "axios";
import { useParams } from "react-router-dom";
import About from "./components/about";
import Bids from "./components/bids";
import { useSelector } from "react-redux";
import { calculateTimeRemaining } from "../../utils/date";
import { useDispatch } from "react-redux";
import { getAllBidsAction } from "../../redux/bids/bid.action";
import { io } from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";
import { ProductBannerLoading } from "../../components/loading";
const Product = () => {
  const notify = () => toast.success("Your Bid is Submitted");

  const [showDrawer, setShowDrawer] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);
  const [product, setProduct] = useState();
  const [owner, setOwner] = useState(null);
  const [highestBid, setHighestBid] = useState(0);
  const [tab, setTabs] = useState("about");
  const [expireTime, setExpireTime] = useState();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const { allBids } = useSelector((store) => store.bidReducer);

  useEffect(() => {
    getProduct();
    dispatch(getAllBidsAction(id));
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
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/single/${id}`
      );
      // console.log(response);
      setIsLoading(false);
      setProduct(response.data.product);
      setOwner(response.data.owner);
      if (response.data.highestBid) {
        setHighestBid(response.data.highestBid);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />

      <main className="mt-5 pb-[4rem]">
        <section className="w-[90%] lg:w-[80%] m-auto">
          <div className="flex base:flex-col   flex-col lg:flex-row gap-10">
            <div className="lg:w-[70%] w-[100%] relative">
              {product?.purchaseBy ? (
                product?.purchaseBy == "Expire" ? (
                  <p className="absolute right-0 top-3 bg-green-200 text-[1.2rem] font-bold rounded-xl px-7 py-2 text-red-500">
                  Auction Ended
                  </p>
                ) : (
                  <p className="absolute right-0 top-3 bg-green-200 text-[1.2rem] font-bold rounded-xl px-7 py-2 text-red-500">
                    sold
                  </p>
                )
              ) : (
                <p className="absolute right-0 top-3 bg-green-200 text-[1.2rem] font-bold rounded-xl px-7 py-2 text-red-500">
                  {expireTime} Day Left
                </p>
              )}

              {isLoading ? (
                <ProductBannerLoading />
              ) : (
                <img
                  className="rounded-3xl w-[100%] max-h-[500px] min-h-[500px] object-cover"
                  src={product?.productImage}
                  alt=""
                />
              )}
            </div>
            <div className="bg-[#eff1f4] rounded-3xl px-5 lg:w-[30%] w-[100%]  py-2">
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
                  <p>{allBids?.length}</p>
                </div>
              </div>
              <div className="flex justify-between ">
                {product?.purchaseBy ? (
                  product?.purchaseBy == "Expire" ? (
                    <div className="flex justify-between w-full items-center">
                      <p className="text-[1.2rem] text-[red]  ">Expired</p>
                      <p> Auction Expired No one placed Bid </p>
                    </div>
                  ) : (
                    <div className="flex justify-between w-full items-center">
                      <p className="text-[1.2rem] text-[red]  ">
                        Auction Ended
                      </p>
                      <p className="text-[1.2rem]  ">
                        Sold to {product?.purchaseByName}{" "}
                      </p>
                    </div>
                  )
                ) : loginUserDetail?._id == owner?._id ? (
                  <p className="text-[1.2rem] text-[red] text-center ">
                    This product is listed by You
                  </p>
                ) : (
                  <>
                    {" "}
                    <input
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      type="text"
                      placeholder="Enter Amount"
                      className="outline-none bg-transparent border-b-[1px] border-black"
                    />
                    <button
                      onClick={() => setShowDrawer(!showDrawer)}
                          className=" text-white px-5 py-2 rounded-lg 
                           text-sm font-semibold leading-6 bg-indigo-600  shadow-sm
                    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                      "
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
            <div className="  w-[90%] lg:w-[80%] m-auto">
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
                  } rounded-lg px-20  py-3 cursor-pointer border-black`}
                >
                  {" "}
                  All Bids{" "}
                </div>
              </div>
              <div className="mt-5 max-h-[240px] min-h-[240px]  overflow-y-scroll ">
                {tab == "about" ? (
                  <About {...product} {...owner} />
                ) : (
                  <Bids {...product} highestBid={highestBid} />
                )}
              </div>
            </div>
          </div>
        </section>
        {}
        <Drawer
          notify={notify}
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          {...product}
          bidAmount={bidAmount}
          highestBid={highestBid}
          setBidAmount={setBidAmount}
          getProduct={getProduct}
          setHighestBid={setHighestBid}
        />
      </main>
    </>
  );
};

export default Product;
