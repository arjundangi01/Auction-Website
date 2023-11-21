import React from "react";

const Product = () => {
  return (
    <main className="mt-5" >
      <section className="w-[80%] m-auto">
        <div className="flex gap-10" >
          <div className="w-[70%]" >
            <img
              className="rounded-3xl w-[100%] max-h-[500px]"
              src="https://theme.bitrixinfotech.com/bidzone/assets/images/auction-card-1.png"
              alt=""
            />
          </div>
          <div className="bg-[#eff1f4] rounded-3xl px-5 w-[30%] py-2" >
            <h1 className="text-[2rem] " >
              Enchanting Decorative Ensembles: Adorn Your Space with Elegance
            </h1>
            <div className="my-5">
              <div className="flex justify-between border-b-[1px] border-black py-2" >
                <p>Start Bid</p>
                <p>₹ 40</p>
              </div>
              <div className="flex justify-between border-b-[1px] border-black py-2 ">
                <p>Latest Bid</p>
                <p>₹ 40</p>
              </div>
              <div className="flex justify-between border-b-[1px] border-black py-2">
                <p>Total Bids</p>
                <p>40</p>
              </div>
            </div>
            <div className="flex justify-between" >
              <input type="text" placeholder="Enter Amount" className="outline-none bg-transparent border-b-[1px] border-black" />
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg "  >Bid Now</button>
            </div>
          </div>
        </div>
        <div>{/* tabs */}</div>
      </section>
    </main>
  );
};

export default Product;
