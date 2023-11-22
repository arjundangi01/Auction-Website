import React, { useEffect, useState } from "react";
import Drawer from "./components/drawer";
import axios from "axios";
import { useParams } from "react-router-dom";

const Product = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [bidAmount,setBidAmount] = useState(0)
  const [product, setProduct] = useState({});
 const {id} = useParams() 
  useEffect(() => {
    getProduct()
  }, [])
  
  const getProduct = async () => {
    // console.log(id)
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/single/${id}`);
      console.log(response)
      setProduct(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <main className="mt-5" >
      <section className="w-[80%] m-auto">
        <div className="flex gap-10" >
          <div className="w-[70%]" >
            <img
              className="rounded-3xl w-[100%] max-h-[500px]"
              src={product?.productImage}
              alt=""
            />
          </div>
          <div className="bg-[#eff1f4] rounded-3xl px-5 w-[30%] py-2" >
            <h1 className="text-[2rem] " >
              {product?.productName}
            </h1>
            <div className="my-5">
              <div className="flex justify-between border-b-[1px] border-black py-2" >
                <p>Start Bid</p>
                <p>₹ {product?.startBid}</p>
              </div>
              <div className="flex justify-between border-b-[1px] border-black py-2 ">
                <p>Latest Bid</p>
                <p>₹ {product?.latestBid}</p>
              </div>
              <div className="flex justify-between border-b-[1px] border-black py-2">
                <p>Total Bids</p>
                <p>{}</p>
              </div>
            </div>
            <div className="flex justify-between" >
              <input type="text" placeholder="Enter Amount" className="outline-none bg-transparent border-b-[1px] border-black" />
              <button onClick={()=>setShowDrawer(!showDrawer)} className="bg-blue-600 text-white px-5 py-2 rounded-lg "  >Bid Now</button>
            </div>
          </div>
        </div>
        <div>{/* tabs */}</div>
      </section>
      {}
      <Drawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} {...product} bidAmount={bidAmount} />
      
      
    </main>
  );
};

export default Product;
