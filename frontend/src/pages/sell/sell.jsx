import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { onAddNewProduct } from "../../redux/product/product.action";
import { uploadImage } from "../../config/firebase";
import Svg from "../../components/svg";
import { Spinner } from "../../components/loading";
const Sell = () => {
  const [imageUrl, setImageUrl] = useState("");
  const { isAuth } = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productNameRef = useRef("");
  const startBidRef = useRef("");
  const endDateRef = useRef("");
  const descRef = useRef("");
  const [isAllFilled, setIsAllFilled] = useState(true);
  const [isImageUploadLoading, setImageUploadLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  const handleImageChange = (e) => {
    setImageUploadLoading(true);
    // let image = e.target.files[0];
    uploadImage(e.target.files[0])
      .then((downloadURL) => {
        setImageUrl(downloadURL);
        setImageUploadLoading(false);

        // console.log(downloadURL);
      })
      .catch((err) => {
        console.log(err);
      });
    // setImageUrl(url);
  };
  // console.log(imageUrl);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !productNameRef.current?.value ||
      !startBidRef.current?.value ||
      !endDateRef.current?.value ||
      !descRef.current?.value ||
      !imageUrl
    ) {
      setIsAllFilled(false);

      return;
    }
    setIsAllFilled(true);

    const newObj = {
      productName: productNameRef.current?.value,
      startBid: startBidRef.current?.value,
      endDate: endDateRef.current?.value,
      description: descRef.current?.value,
      productImage: imageUrl,
    };
    setIsSubmitLoading(true);
    await dispatch(onAddNewProduct(newObj, navigate,setIsSubmitLoading));
    // setIsSubmitLoading(false);
  };
  return (
    <main className="w-[70%] m-auto">
      <form>
        <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-4 flex justify-between">
                <div>
                  <label class="block text-sm font-medium leading-6 text-gray-900">
                    Product Name
                  </label>
                  <div class="mt-2">
                    <div class="flex rounded-md  focus-within:ring-inset  ">
                      <input
                        ref={productNameRef}
                        type="text"
                        name="productName"
                        autocomplete="productName"
                        class="block border flex-1 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  "
                        placeholder="Enter Product Name"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    for="startBid"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Starting Bid
                  </label>
                  <div class="mt-2">
                    <div class="flex rounded-md  focus-within:ring-inset  ">
                      <input
                        ref={startBidRef}
                        type="number"
                        name="startBid"
                        autocomplete="startBid"
                        class="block border flex-1 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  "
                        placeholder="Enter start bid"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    for="date"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    End Date
                  </label>
                  <div class="mt-2">
                    <div class="flex rounded-md  focus-within:ring-inset  ">
                      <input
                        ref={endDateRef}
                        min={new Date().toISOString().split('T')[0]}
                        type="date"
                        name="end_date"
                        autocomplete="date"
                        class="block border flex-1 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  "
                        placeholder="Enter Auction End Date"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-span-full">
                <label
                  for="description"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  About Product
                </label>
                <div class="mt-2">
                  <textarea
                    ref={descRef}
                    id="description"
                    name="description"
                    rows="3"
                    class="block w-full rounded-md  py-1.5  shadow-sm border outline-none placeholder:text-gray-400   sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
                <p class="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about item.
                </p>
              </div>

              <div class="col-span-full">
                <label
                  for="cover-photo"
                  className=" text-sm font-medium leading-6 flex gap-3 items-center"
                >
                  Cover photo
                  {isImageUploadLoading && <Spinner />}
                </label>
                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div class="text-center">
                    {!imageUrl ? (
                      <svg
                        class="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    ) : (
                      <MdDeleteForever
                        className="text-red-400 text-[1.8rem]"
                        onClick={() => setImageUrl("")}
                      />
                    )}
                    <div class="mt-4 flex text-sm leading-6 text-gray-600">
                      {!imageUrl ? (
                        <>
                          {" "}
                          <label
                            for="file-upload"
                            class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                          </label>
                          <input
                            onChange={handleImageChange}
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            class="sr-only"
                          />
                        </>
                      ) : (
                        <img
                          className="max-w-sm min-w-sm max-h-52 min-h-52 "
                          src={imageUrl}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isAllFilled ? (
              ""
            ) : (
              <p className="text-red-600">Please Fill All Detail</p>
            )}
            <div className="flex justify-center mt-5">
              {isSubmitLoading ? (
                <button className="px-5 min-w-[30%]   flex items-center justify-center gap-2 text-white  rounded-2xl
                py-1.5 text-sm font-semibold leading-6 bg-indigo-600  shadow-sm
                    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                ">
                  <Svg /> loading..
                </button>
              ) : (
                <button
                  onClick={onSubmit}
                    className="  px-5 min-w-[30%] rounded-2xl text-white 
                    py-1.5 text-sm font-semibold leading-6 bg-indigo-600  shadow-sm
                    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                  
                  "
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default Sell;
