import { configureStore } from "@reduxjs/toolkit";

import orderDetailsReducer from "../Features/orderDetails";

export const store = configureStore({
  reducer: {
    orderdetails: orderDetailsReducer,
  },
});
