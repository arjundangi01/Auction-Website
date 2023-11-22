import axios from "axios";
import Cookies from "js-cookie";

export const onAddNewProduct = (newObj) => async (dispatch) => {
    const userToken = Cookies.get('auction_token');
    if (!userToken) {
        return;
    }
    
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/products/add`,
        newObj, {
            headers: {
              Authorization : `Bearer ${userToken}`
          }
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
