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

export const editRestaurant = createAsyncThunk(
  "corporation/editRestaurant",
  async ({ body, restaurantId }) => {
    const { data } = await axios.put(`/api/restaurants/${restaurantId}`, body);

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

export const duplicateMenu = createAsyncThunk(
  "restaurant/duplicateMenu",
  async ({ restaurantId, menuId }) => {
    const { data } = await axios.post(
      `/api/restaurants/${restaurantId}/menus/${menuId}`
    );

    return data;
  }
);

export const createLocation = createAsyncThunk(
  "restaurant/createLocation",
  async ({ restaurantId, body }) => {
    const { data } = await axios.post(
      `/api/restaurants/${restaurantId}/locations`,
      body
    );

    return data;
  }
);

export const removeImage = createAsyncThunk(
  "restaurant/removeImage",
  async ({ restaurantId, body }) => {
    const { data } = await axios.put(
      `/api/restaurants/${restaurantId}/images`,
      body
    );

    return data;
  }
);

export const uploadCSVLocations = createAsyncThunk(
  "restaurant/uploadCSVLocations",
  async ({ menuId, restaurantId, body }) => {
    const { data } = await axios.post(
      `/api/restaurants/${restaurantId}/locations/${menuId}`,
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
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.restaurant = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(uploadCSVLocations.fulfilled, (state, action) => {
        state.restaurant = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(duplicateMenu.fulfilled, (state, action) => {
        state.restaurant = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(editRestaurant.fulfilled, (state, action) => {
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
