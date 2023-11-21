import { USER_DETAIL_REQUEST_SUCCESS } from "./user.action_type";

const initialState = {
  isAuth: false,
  isAllLoading: false,
  loginUserDetail: {},
};
export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_DETAIL_REQUEST_SUCCESS:
            return {...state,loginUserDetail:payload}
    default:
      return state;
  }
};
