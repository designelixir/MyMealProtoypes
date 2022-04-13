/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../../utils/history";

export const fetchLocation = createAsyncThunk(
  "location/fetchRestaurant",
  async (locationId) => {
    const { data } = await axios.get(`/api/locations/${locationId}`);

    return data;
  }
);

export const updateLocation = createAsyncThunk(
  "location/updateLocation",
  async ({ locationId, body }) => {
    const { data } = await axios.put(`/api/locations/${locationId}`, body);

    return data;
  }
);

const INIT_STATE = {
  restaurantLocation: {},
  isLoading: true,
  hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const locationSlice = createSlice({
  name: "location",
  initialState: INIT_STATE,
  reducers: {
    setNew(state, action) {
      return { ...state };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.restaurantLocation = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        state = INIT_STATE;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.restaurantLocation = action.payload;
        state.isLoading = false;
        state.hasError = false;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setNew } = locationSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default locationSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectLocation = (state) => state.location;
