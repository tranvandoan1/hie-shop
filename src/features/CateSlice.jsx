import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadInfoUser, getInfoUser, uploadPassword, uploadEmail } from "../api/Users";
import CateAPI, { add, remove, upload } from "../api/Categoris";

export const getCateAll = createAsyncThunk(
  "categories/getCateAll",
  async () => {
    const { data: categories } = await CateAPI.getAll();
    console.log(categories,'categories121312')
    return categories;
  }
);

export const uploadCate = createAsyncThunk(
  "categories/uploadCate",
  async (data) => {
    const { data: categories } = await upload(data);
    return categories;
  }
);
export const addCate = createAsyncThunk(
  "categories/addCate",
  async (data) => {
    console.log(data,'data')
    const { data: categories } = await add(data);
    return categories;
  }
);
export const removeCate = createAsyncThunk(
  "categories/removeCate",
  async (id) => {
    const { data: categories } = await remove(id);
    return categories;
  }
);


const cateSlice = createSlice({
  name: "categories",
  initialState: {
    value: [],
    loading: false
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getCateAll.fulfilled, (state, action) => {
      state.loading = true;
      state.value = action.payload;
    });

    builder.addCase(uploadCate.fulfilled, (state, action) => {
      state.loading = true;
      state.value = action.payload;
    });

    builder.addCase(removeCate.fulfilled, (state, action) => {
      state.loading = true;
      state.value = action.payload;
    });
    builder.addCase(addCate.fulfilled, (state, action) => {
      state.loading = true;
      state.value = action.payload;
    });
  },
});
export default cateSlice.reducer;
