import axios from "axios";
import {
  USER_DETAIL_REQUEST,
  USER_DETAIL_REQUEST_SUCCESS,
} from "./user.action_type";
import Cookies from "js-cookie";

export const onUserLoginRequest = (userObj) => async () => {
    try {
        
    } catch (error) {
        
    }
}
export const onUserSignupRequest = (userObj) => async () => {
    try {
        
    } catch (error) {
        
    }
}

export const getUserDetailAction = () => async (dispatch) => {
  const userToken = Cookies.get("auction_token");
  dispatch({ type: USER_DETAIL_REQUEST });
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  try {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`, {
      headers: headers,
    });
    console.log(response);
    dispatch({ type: USER_DETAIL_REQUEST_SUCCESS, payload: response.data });
    // const blogResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/blogs?user=${userID}`)
    // console.log(response);
  } catch (error) {}
};
