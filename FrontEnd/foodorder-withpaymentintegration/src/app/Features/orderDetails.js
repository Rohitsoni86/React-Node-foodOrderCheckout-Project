import { createSlice } from "@reduxjs/toolkit";

//Define Initial State

const initialState = {
  orderItems: [
    {
      id: 1,
      Name: "Margarita B",
      Ingredients: "tuna & cucumber",
      Price: 112,
      Category: "Pizza",
    },
    {
      id: 2,
      Name: "Margarita A",
      Ingredients: "crab & cucumber",
      Price: 412,
      Category: "Pizza",
    },
    {
      id: 3,
      Name: "Margarita C",
      Ingredients: "smoked salmon over rice with extra sauce",
      Price: 1236,
      Category: "Pizza",
    },
  ],
};

export const orderSlice = createSlice({
  name: "userOrderSlice",
  initialState,
  reducers: {
    setUserOrder: (state, action) => {
      state.orderItems = [];
    },
  },
});

export default orderSlice.reducer;

export const { setUserOrder } = orderSlice.actions;
