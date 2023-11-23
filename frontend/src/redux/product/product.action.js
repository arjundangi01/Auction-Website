import axios from "axios";
import Cookies from "js-cookie";
import { getAllBidsAction } from "../bids/bid.action";

export const GET_ALL_PRODUCT_SUCCESS = "GET_ALL_PRODUCT_SUCCESS";

export const onGetAllProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/products/all`
    );
    // console.log(response)
    dispatch({ type: GET_ALL_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
export const onAddNewProduct = (newObj,navigate) => async (dispatch) => {
  const userToken = Cookies.get("auction_token");
  if (!userToken) {
    return;
  }

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/products/add`,
      newObj,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    navigate('/')
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export const onAddNewBid = (newObj) => async (dispatch) => {
  const userToken = Cookies.get("auction_token");
  if (!userToken) {
    // console.log('in')
    return;
  }

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/bids/add`,
      newObj,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    // console.log('th', response);
    dispatch(getAllBidsAction(newObj?.productId));
  } catch (error) {
    console.log(error);
  }
};
