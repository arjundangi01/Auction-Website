import React from "react";
import "../../index.css";
import Card from "./components/card";
const Home = () => {
  // --`
  return (
    <main>
      <section id="1">
        <div className="flex flex-col items-center  justify-center gap-y-4 w-[50%] m-auto  text-center">
          <h1 className="text-[3.5rem] font-bold text-blue-600">
            Join Exclusive Auction & Get The Finest.
          </h1>
          <div className=" flex h-[3.5rem] w-[70%] px-[1rem] rounded-xl border py-2">
            <input
              type="text"
              placeholder="search for item"
              className="outline-none bg-transparent w-[100%] "
            />
            <button className="bg-[#90e0ef] rounded-xl px-3  ">Search</button>
          </div>
        </div>
      </section>
      <section className="w-[80%] m-auto  mt-5 px-5 ">
        <div className="text-center">
          <h1 className="text-[2.5rem] font-bold text-blue-600">
            Recent Auctions
          </h1>
        </div>
        <div className=" mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <Card />
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
