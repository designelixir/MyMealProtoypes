/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../../utils/history";

export const fetchMenus = createAsyncThunk("menu/fetchMenus", async () => {
  const { data } = await axios.get(`/api/menus`);

  return data;
});

export const fetchMenu = createAsyncThunk(
  "menu/fetchMenu",
  async ({ menuId, cb }) => {
    const { data } = await axios.get(`/api/menus/${menuId}`);

    cb && cb(data);
    return data;
  }
);

export const createMenu = createAsyncThunk("menu/createMenu", async (body) => {
  const { data } = await axios.post(`/api/menus`, body);

  return data;
});

export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async ({ menuId, body }) => {
    const { data } = await axios.put(`/api/menus/${menuId}`, body);

    return data;
  }
);

export const swapCategoryOrder = createAsyncThunk(
  "menu/swapCategoryOrder",
  async ({ menuId, body }) => {
    const { data } = await axios.put(
      `/api/menus/${menuId}/categories/swap`,
      body
    );
    return data;
  }
);

export const createCategory = createAsyncThunk(
  "menu/createCategory",
  async ({ menuId, body, cb }) => {
    const { data } = await axios.post(`/api/menus/${menuId}/categories`, body);
    cb && cb(data);
    return data;
  }
);

export const updateCategoryArchived = createAsyncThunk(
  "category/updateCategoryArchived",
  async ({ categoryId, menuId, body, cb }) => {
    const { data } = await axios.put(
      `/api/categories/${categoryId}/menus/${menuId}`,
      body
    );
    cb && cb(data);
    return data;
  }
);

export const createMenuItem = createAsyncThunk(
  "menu/createMenuItem",
  async (body) => {
    const { data } = await axios.post(`/api/menus/items`, body);

    return data;
  }
);

export const uploadCSVFile = createAsyncThunk(
  "menu/uploadCSVFile",
  async ({ menuId, startingPosition, body, cb }) => {
    const { data } = await axios.post(
      `/api/menus/upload-csv/${menuId}/${startingPosition}`,
      body
    );
    cb && cb(data);
    return data;
  }
);

const INIT_STATE = {
  menus: [],
  menu: {},
  menuItems: [],
  isLoading: true,
  hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const menuSlice = createSlice({
  name: "menu",
  initialState: INIT_STATE,
  reducers: {
    setNew(state, action) {
      return { ...state };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.menus = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchMenu.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.menu = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.menu = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        state.menu = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.menu = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })

      .addCase(updateCategoryArchived.fulfilled, (state, action) => {
        state.menu = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(createMenuItem.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })

      .addCase(createMenuItem.fulfilled, (state, action) => {
        state.menuItems = [...state.menuItems, action.payload];
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(createMenuItem.rejected, (state, action) => {
        state = INIT_STATE;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setNew } = menuSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default menuSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectMenu = (state) => state.menu;
