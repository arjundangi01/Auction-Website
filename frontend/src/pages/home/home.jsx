import React, { useEffect, useRef, useState } from "react";
import "../../index.css";
import Card from "./components/card";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { onGetAllProducts } from "../../redux/product/product.action";
import SearchCard from "./components/search_card";
import Work from "./components/work";
const Home = () => {
  const dispatch = useDispatch();
  const searchRef = useRef("");
  const [search, setSearch] = useState(false);
  const [timerId, setTimerId] = useState("");
  const [allSearches, setAllSearches] = useState([]);
  // const timerId = useRef("");
  // --`
  const { allProducts } = useSelector((store) => store.productReducer);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(onGetAllProducts(setLoading));
  }, []);

  const handleChange = async () => {
    try {
      if (timerId) {
        clearTimeout(timerId);
      }
      setTimerId(
        setTimeout(() => {
          setSearch(true);
          if (!searchRef.current?.value) {
            setSearch(false);
          }
          // console.log(searchRef.current?.value);
          getProduct();
        }, 1000)
      );
    } catch (error) {}
  };
  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/all/?q=${searchRef.current?.value}`
      );
      // console.log(response)
      setAllSearches(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <section id="1" className="h-[40vh] md:h-[50vh] mt-4">
        <div className="flex flex-col items-center  justify-center gap-y-4 w-[90%] md:w-[50%] m-auto   text-center">
          <h1 className="text-[2rem] md:text-[3.5rem] font-bold text-blue-600">
            Join Exclusive Auction & Get The Finest.
          </h1>
          <div className=" relative flex flex-col  h-[3.5rem] w-[90%]  md:w-[70%] px-[1rem] rounded-xl border  py-2">
            <div className="flex h-[40px]">
              <input
                ref={searchRef}
                onChange={handleChange}
                type="text"
                placeholder="search for item"
                className="outline-none bg-transparent  w-[100%] "
              />
              <button className="bg-[#90e0ef] rounded-xl px-3  ">Search</button>
            </div>
            <div
              className={` ${
                search ? "visible" : "hidden"
              }  absolute  left-0 top-[55px] bg-white w-full rounded-xl border py-2`}
            >
              {allSearches?.map((ele) => (
                <SearchCard key={ele._id} {...ele} />
              ))}
            </div>
          </div>
        </div>
      </section>
     { loading && <div className="text-center text-3xl font-bold text-red-600 " >
        <h1>Connecting to Data Base. Please Wait </h1>
      </div>}
      <section className="w-[90%] md:w-[80%] m-auto  mt-5 px-5 ">
        <div className="text-center  ">
          <h1 className="text-[2rem] md:text-[2.5rem]   font-bold text-blue-600">
            Recent Auctions
          </h1>
        </div>
        <div className=" mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {allProducts?.map((item) => (
            <Card key={item._id} {...item} />
          ))}
        </div>
        <div className="mt-10 mb-14">
          <div>
            <h1 className="text-[2rem] font-bold text-blue-600">
              How it Works ?
            </h1>
          </div>

          <Work />
        </div>
      </section>
    </main>
  );
};

export default Home;
