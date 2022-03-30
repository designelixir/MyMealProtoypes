/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../../utils/history";

export const fetchCorporations = createAsyncThunk(
  "corporation/fetchCorporations",
  async () => {
    const { data } = await axios.get(`/api/corporations`);

    return data;
  }
);

export const fetchCorporation = createAsyncThunk(
  "corporation/fetchCorporation",
  async (corporationId) => {
    const { data } = await axios.get(`/api/corporations/${corporationId}`);

    return data;
  }
);

export const fetchMyCorporation = createAsyncThunk(
  "corporation/fetchMyCorporation",
  async () => {
    const { data } = await axios.get(`/api/corporations/users/corporations`);

    return data;
  }
);

export const createCorporation = createAsyncThunk(
  "corporation/createCorporation",
  async (corporationName) => {
    const { data } = await axios.post(`/api/corporations`, {
      name: corporationName,
    });

    return data;
  }
);

export const createRestaurant = createAsyncThunk(
  "corporation/createRestaurant",
  async ({ restaurantName, corporationId }) => {
    const { data } = await axios.post(
      `/api/corporations/${corporationId}/restaurants`,
      {
        name: restaurantName,
        corporationId,
      }
    );

    return data;
  }
);

const INIT_STATE = {
  corporations: [],
  corporation: {},
  isLoading: true,
  hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const corporationSlice = createSlice({
  name: "corporation",
  initialState: INIT_STATE,
  reducers: {
    setNew(state, action) {
      return { ...state };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCorporations.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCorporations.fulfilled, (state, action) => {
        state.corporations = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchCorporations.rejected, (state, action) => {
        state = INIT_STATE;
      })
      .addCase(fetchCorporation.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCorporation.fulfilled, (state, action) => {
        state.corporation = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(createRestaurant.fulfilled, (state, action) => {
        state.corporation = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchMyCorporation.fulfilled, (state, action) => {
        state.corporation = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(createCorporation.fulfilled, (state, action) => {
        state.corporations = [...state.corporations, action.payload];
        state.isLoading = false;
        state.hasError = false;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setNew } = corporationSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default corporationSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectCorporation = (state) => state.corporation;
