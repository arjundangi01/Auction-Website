import React from "react";

const Card = () => {
    return (
      
    <div className="border rounded-xl hover:translate-y-0 translate-y-2 " >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
          alt=""
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700 px-3">Earthen Bottle</h3>
      <p className="mt-1 text-lg font-medium text-gray-900 px-3">Current Bid ₹48</p>
    </div>
  );
};

export default Card;
