/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import category from "./category";

export const fetchFrontendRestaurant = createAsyncThunk(
  "frontend/fetchFrontendRestaurant",
  async ({ restaurantId, locationId }) => {
    const { data } = await axios.get(
      `/api/frontends/restaurants/${restaurantId}/locations/${locationId}`
    );

    return data;
  }
);

export const fetchFrontendCategoryMenuitems = createAsyncThunk(
  "frontend/fetchFrontendCategoryMenuitems",
  async ({ categoryId, cb }) => {
    const { data } = await axios.get(
      `/api/frontends/categories/${categoryId}/menuitems`
    );
    cb && cb(data);
    return { categoryId, menuitems: data };
  }
);

const INIT_STATE = {
  restaurant: {},
  categories: [],
  selectedAllergies: {},
  isLoading: true,
  hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const frontendSlice = createSlice({
  name: "frontend",
  initialState: INIT_STATE,
  reducers: {
    setSelectedAllergy(state, action) {
      return { ...state, selectedAllergies: action.payload };
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
        state.categories = action.payload.locations[0].menu.categories.map(
          (category) => ({ ...category, menuitems: [] })
        );
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchFrontendRestaurant.rejected, (state, action) => {
        state = INIT_STATE;
      })
      .addCase(fetchFrontendCategoryMenuitems.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFrontendCategoryMenuitems.fulfilled, (state, action) => {
        const { categoryId, menuitems } = action.payload;
        const categoryIdx = state.categories.findIndex(
          ({ id }) => id === categoryId
        );
        state.categories[categoryIdx].menuitems = menuitems;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchFrontendCategoryMenuitems.rejected, (state, action) => {
        state = INIT_STATE;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setSelectedAllergy } = frontendSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default frontendSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectFrontend = (state) => state.frontend;
