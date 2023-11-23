import React, { useEffect, useRef, useState } from "react";
import "../../index.css";
import Card from "./components/card";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { onGetAllProducts } from "../../redux/product/product.action";
const Home = () => {
  const dispatch = useDispatch();
  const searchRef = useRef("");
  // const timerId = useRef("");
  // --`
  const { allProducts } = useSelector((store) => store.productReducer);
  useEffect(() => {
    dispatch(onGetAllProducts());
  }, []);
  let timerId;
  const handleChange = async () => {
    try {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        // console.log(searchRef.current?.value);
        getProduct()
      }, 500);
    } catch (error) {}
  };
  const getProduct = async () => {
    
  }
  return (
    <main>
      <section id="1">
        <div className="flex flex-col items-center  justify-center gap-y-4 w-[50%] m-auto  text-center">
          <h1 className="text-[3.5rem] font-bold text-blue-600">
            Join Exclusive Auction & Get The Finest.
          </h1>
          <div className=" relative flex flex-col  h-[3.5rem] w-[70%] px-[1rem] rounded-xl border py-2">
            <div className="flex h-[40px]">
              <input
                ref={searchRef}
                onChange={handleChange}
                type="text"
                placeholder="search for item"
                className="outline-none bg-transparent w-[100%] "
              />
              <button className="bg-[#90e0ef] rounded-xl px-3  ">Search</button>
            </div>
            <div className={` ${searchRef.current?.value ? 'visible':'hidden'  }  absolute  left-0 top-[55px] bg-white w-full rounded-xl border py-2`}>
              <h1>hiiiiiiii</h1>
              <h1>hiiiiiii2</h1>
              <h1>hiiiiiii2</h1>
              <h1>hiiiiiii2</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="w-[80%] m-auto  mt-5 px-5 ">
        <div className="text-center  ">
          <h1 className="text-[2.5rem]  font-bold text-blue-600">
            Recent Auctions
          </h1>
        </div>
        <div className=" mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {allProducts?.map((item) => (
            <Card key={item._id} {...item} />
          ))}
        </div>
        <div className="mt-10">
          <div>
            <h1 className="text-[2rem] font-bold text-blue-600">
              How it Works ?
            </h1>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
