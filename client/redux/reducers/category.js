/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../../utils/history";

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (categoryId) => {
    const { data } = await axios.get(`/api/categories/${categoryId}`);

    return data;
  }
);
export const createMenuItem = createAsyncThunk(
  "category/createMenuItem",
  async ({ categoryId, body }) => {
    const { data } = await axios.post(
      `/api/categories/${categoryId}/menuitems`,
      body
    );

    return data;
  }
);
const INIT_STATE = {
  category: {},
  isLoading: true,
  hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const categorySlice = createSlice({
  name: "category",
  initialState: INIT_STATE,
  reducers: {
    setNew(state, action) {
      return { ...state };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state = INIT_STATE;
      })
      .addCase(createMenuItem.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isLoading = false;
        state.hasError = false;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setNew } = categorySlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default categorySlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectCategory = (state) => state.category;
