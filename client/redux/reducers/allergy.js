/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../../utils/history";

export const fetchAllergies = createAsyncThunk(
  "question/fetchAllergies",
  async () => {
    const { data } = await axios.get(`/api/allergies`);

    return data;
  }
);

export const createAllergy = createAsyncThunk(
  "question/createAllergy",
  async (body) => {
    const { data } = await axios.post(`/api/allergies`, body);

    return data;
  }
);

const INIT_STATE = {
  allergies: [],
  isLoading: true,
  hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const allergySlice = createSlice({
  name: "allergy",
  initialState: INIT_STATE,
  reducers: {
    setNew(state, action) {
      return { ...state };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllergies.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchAllergies.fulfilled, (state, action) => {
        state.allergies = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchAllergies.rejected, (state, action) => {
        state = INIT_STATE;
      })
      .addCase(createAllergy.fulfilled, (state, action) => {
        state.allergies = action.payload;
        state.isLoading = false;
        state.hasError = false;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setNew } = allergySlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default allergySlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectAllergy = (state) => state.allergy;
