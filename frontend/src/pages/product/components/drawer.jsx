import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_BIDS_SUCCESS, getAllBidsAction } from "../../../redux/bids/bid.action";
import { useNavigate, useParams } from "react-router-dom";
import Svg from "../../../components/svg";
import { io } from "socket.io-client";
const Drawer = ({
  showDrawer,
  highestBid,
  setShowDrawer,
  bidAmount,
  _id,
  productName,
  startBid,
  latestBid,
  startDate,
  endDate,
  description,
  productImage,
  getProduct,
  setBidAmount,
  setHighestBid,
  notify
  
}) => {
  // const { itemImage, itemName } = item;
  // const socket = io('http://localhost:8080');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginUserDetail, isAuth } = useSelector((store) => store.userReducer);
  const [isGreaterAmount, setIsGreaterAmount] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const [socket, setSocket] = useState(null);
  const { allBids } = useSelector((store) => store.bidReducer)

  useEffect(() => {
    // console.log(bidAmount, highestBid, startBid);
    if (bidAmount > highestBid && bidAmount > startBid) {
      setIsGreaterAmount(true);
    } else {
      setIsGreaterAmount(false);
    }
  }, [bidAmount]);
  const { id } = useParams();
  useEffect(() => {
    const newSocket = io(`${process.env.REACT_APP_BASE_URL}`);
    newSocket.on('newBidAdded', (data) => {
      //  console.log( 'g', data)
      // getProduct();
      if (data.bidAmount > highestBid && data.productId==id) {
        setHighestBid(data.bidAmount)
      }
      if (data.productId == id) {
        // console.log('all', allBids)
        // dispatch({type:GET_ALL_BIDS_SUCCESS,payload:{allBids:[...allBids,data]}})
        dispatch(getAllBidsAction(id))
      }

   })
   setSocket(newSocket);
   // return () => {
   //   socket.disconnect();
   // };
 },[])
  const formatCardNumber = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isGreaterAmount) {
      return;
    }

    if (!isAuth) {
      navigate("/login");
      return;
    }

    let newObj = {
      createdBy: loginUserDetail?._id,
      userImage: loginUserDetail?.profileImage,
      userName: loginUserDetail?.userName,
      bidAmount,
      productId: _id,
    };
    if (!socket) {
      console.log('socket not initialize')
      return
    }
    socket?.emit('newBid', newObj)
    // socket.on('newBidAdded', (data) => {
    //   console.log( 'g', data)
    // })
    // socket.on('newBidAdded', (data) => {
    //   console.log( 'g', data)
    // })
    try {
      setIsloading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/bids/add`,
        newObj
      );
      getProduct()
      notify()
      await dispatch(getAllBidsAction(newObj?.productId));

      setIsloading(false);
      setTimeout(() => {
        setShowDrawer(false);
        setBidAmount('')
      }, 200);
    } catch (error) {
      setIsloading(false);

      console.log(error);
    }
  };
  return (
    <div
      class="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      {showDrawer && (
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      )}

      {showDrawer && (
        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div class="pointer-events-auto relative w-screen max-w-md">
                <div class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                  <button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="button"
                    class="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span class="absolute -inset-2.5"></span>
                    <span class="sr-only">Close panel</span>
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div class="px-4 sm:px-6">
                    <h2
                      class="text-base font-semibold leading-6 text-gray-900"
                      id="slide-over-title"
                    >
                      Confirm Bid
                    </h2>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    {/* <!-- Your content --> */}
                    <div className="flex gap-4">
                      <div className="w-[200px]  ">
                        <img
                          className="w-[100%] max-h-[120px] object-cover min-h-[120px] rounded-2xl"
                          src={productImage}
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="text-blue-600 font-bold">
                          {" "}
                          {productName}{" "}
                        </p>
                        <p> Bid Amount : ₹ {bidAmount} </p>
                        {isGreaterAmount ? (
                          ""
                        ) : (
                          <p className="text-red-600">
                            Your Bid Amount is Less than highest Bid or Starting
                            Price
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="pt-5">
                      <h1 className="text-blue-600 font-bold text-[1.5rem]">
                        Address
                      </h1>
                      <div>
                        <input
                          type="text"
                          name="street"
                          class="block w-full rounded-md border-2 py-1.5 pl-2 pr-2    placeholder:text-gray-400   "
                          placeholder="Enter Address line"
                        />
                      </div>
                    </div>
                    <div className="pt-5">
                      <h1 className="text-blue-600 font-bold text-[1.5rem]">
                        Payment
                      </h1>
                      <div>
                        <input
                          onChange={(e) =>
                            (e.target.value = formatCardNumber(e.target.value))
                          }
                          type="text"
                          name="cardNumber"
                          maxlength="14"
                          class="block w-full rounded-md border-2 py-1.5 pl-2 pr-2    placeholder:text-gray-400   "
                          placeholder="Enter Card Number "
                        />
                      </div>
                      <div className="flex gap-3 justify-between mt-4">
                        <input
                          type="text"
                          maxlength="3"
                          name="cvv"
                          class="block w-full rounded-md border-2 py-1.5 pl-2 pr-2    placeholder:text-gray-400   "
                          placeholder="Enter CVV"
                        />
                        <input
                          type="date"
                          name="expDate"
                          class="block w-full rounded-md border-2 py-1.5 pl-2 pr-2    placeholder:text-gray-400   "
                          placeholder="Enter Exp Date"
                        />
                      </div>
                    </div>
                    <div>
                      {/* {
                        isAllFilled ? '' : <p>Please Fill All Detail</p>
                      } */}
                    </div>
                  </div>
                  <div className="px-2">
                    {isLoading ? (
                      <button className=" w-full flex items-center justify-center gap-2 text-white  rounded-2xl
                       py-1.5 text-sm font-semibold leading-6 bg-indigo-600  shadow-sm
                    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                      
                      ">
                        <Svg /> loading
                      </button>
                    ) : (
                      <button
                        onClick={onSubmit}
                        className={` w-full text-white  rounded-2xl ${
                          isGreaterAmount
                            ? "cursor-pointer"
                            : "cursor-not-allowed"
                          } 
                          py-1.5 text-sm font-semibold leading-6 bg-indigo-600  shadow-sm
                    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                        
                         `}
                      >
                        {" "}
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drawer;
