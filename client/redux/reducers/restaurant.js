/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../../utils/history";

export const fetchRestaurant = createAsyncThunk(
  "restaurant/fetchRestaurant",
  async (restaurantId) => {
    const { data } = await axios.get(`/api/restaurants/${restaurantId}`);

    return data;
  }
);
export const createMenu = createAsyncThunk(
  "restaurant/createMenu",
  async (body) => {
    const { data } = await axios.post(
      `/api/restaurants/${body.data.restaurantId}/menus`,
      body
    );

    return data;
  }
);
const INIT_STATE = {
  restaurant: {},
  isLoading: true,
  hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: INIT_STATE,
  reducers: {
    setNew(state, action) {
      return { ...state };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurant.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchRestaurant.fulfilled, (state, action) => {
        state.restaurant = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchRestaurant.rejected, (state, action) => {
        state = INIT_STATE;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.restaurant = action.payload;
        state.isLoading = false;
        state.hasError = false;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setNew } = restaurantSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default restaurantSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectRestaurant = (state) => state.restaurant;
