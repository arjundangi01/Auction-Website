import { GET_ALL_BIDS_SUCCESS } from "./bid.action";

const initialState = {
  highestBid: 0,
  allBids: [],
};

export const bidReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_BIDS_SUCCESS:
      return {
        ...state,
        allBids: payload.allBids,
        highestBid: payload?.highestBid,
      };
    default:
      return state;
  }
};
