import { USER_DETAIL_REQUEST_SUCCESS, USER_LOGIN_REQUEST_SUCCESS, USER_LOGOUT_REQUEST_SUCCESS } from "./user.action_type";

const initialState = {
  isAuth: false,
  isAllLoading: false,
  loginUserDetail: {},
};
export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_LOGIN_REQUEST_SUCCESS:
            return {...state,isAuth:true}
        case USER_LOGOUT_REQUEST_SUCCESS:
            return {...state,isAuth:false,loginUserDetail:{}}
        case USER_DETAIL_REQUEST_SUCCESS:
            return {...state,loginUserDetail:payload,isAuth:true}
    default:
      return state;
  }
};
