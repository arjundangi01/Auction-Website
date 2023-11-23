import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Drawer = ({
  showDrawer,
  setShowDrawer,
  bidAmount,
  _id,productName,startBid,latestBid,startDate,endDate,description,productImage
}) => {
  // const { itemImage, itemName } = item;
  const {loginUserDetail} = useSelector((store)=> store.userReducer)
  const onSubmit = async (e) => {
    e.preventDefault();
    let newObj = {
      createdBy: loginUserDetail?._id,
      userImage: loginUserDetail?.profileImage,
      userName:loginUserDetail?.userName,
      bidAmount,
      productId:_id
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/bids/add`,newObj)
     console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
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
                          className="w-[100%] rounded-2xl"
                          src={productImage}
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="text-blue-600 font-bold"> {productName} </p>
                        <p> Bid Amount : ₹ {bidAmount} </p>
                      </div>
                    </div>
                    <div className="pt-5" >
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
                    <div className="pt-5" >
                      <h1 className="text-blue-600 font-bold text-[1.5rem]">
                        Payment
                      </h1>
                      <div>
                        <input
                          type="text"
                          name="cardNumber"
                          
                          class="block w-full rounded-md border-2 py-1.5 pl-2 pr-2    placeholder:text-gray-400   "
                          placeholder="Enter Card Number"
                        />
                      </div>
                      <div className="flex gap-3 justify-between mt-4" >
                        <input
                          type="text"
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
                  </div>
                  <div className="px-2">
                    <button onClick={onSubmit} className="bg-blue-600 w-full text-white py-2 rounded-2xl">
                      {" "}
                      Submit
                    </button>
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
