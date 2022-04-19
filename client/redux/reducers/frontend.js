/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFrontendRestaurant = createAsyncThunk(
  "frontend/fetchFrontendRestaurant",
  async ({ restaurantId, locationId }) => {
    const { data } = await axios.get(
      `/api/frontends/restaurants/${restaurantId}/locations/${locationId}`
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
const frontendSlice = createSlice({
  name: "frontend",
  initialState: INIT_STATE,
  reducers: {
    setNew(state, action) {
      return { ...state };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFrontendRestaurant.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFrontendRestaurant.fulfilled, (state, action) => {
        state.restaurant = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchFrontendRestaurant.rejected, (state, action) => {
        state = INIT_STATE;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setNew } = frontendSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default frontendSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectFrontend = (state) => state.frontend;
