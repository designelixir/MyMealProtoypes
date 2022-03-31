/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../../utils/history";

export const fetchMenuItem = createAsyncThunk(
  "menuitem/fetchMenuItem",
  async ({ menuitemId, cb }) => {
    const { data } = await axios.get(`/api/menuitems/${menuitemId}`);
    cb(data);
    return data;
  }
);

export const updateMenuItem = createAsyncThunk(
  "menuitem/updateMenuItem",
  async ({ menuitemId, body }) => {
    const { data } = await axios.put(`/api/menuitems/${menuitemId}`, body);
    return data;
  }
);

const INIT_STATE = {
  menuitem: {},
  isLoading: true,
  hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const menuitemSlice = createSlice({
  name: "menuitem",
  initialState: INIT_STATE,
  reducers: {
    setNew(state, action) {
      return { ...state };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItem.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchMenuItem.fulfilled, (state, action) => {
        state.menuitem = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchMenuItem.rejected, (state, action) => {
        state = INIT_STATE;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setNew } = menuitemSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default menuitemSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectMenuitem = (state) => state.menuitem;
