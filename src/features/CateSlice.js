import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCate, removeCate, uploadCate, getAllCate } from './../api/Categoris';

export const getCategoriAll = createAsyncThunk(
  "categories/getCategoriAll",
  async () => {
    const { data: categories } = await getAllCate();
    return categories;
  }
);

export const uploadCategori = createAsyncThunk(
  "categories/uploadCategori",
  async (data) => {
    const { data: categories } = await uploadCate(data);
    return categories;
  }
);
export const addCategori = createAsyncThunk(
  "categories/addCategori",
  async (data) => {
    const { data: categories } = await addCate(data);
    return categories;
  }
);
export const removeCategori = createAsyncThunk(
  "categories/removeCategori",
  async (id) => {
    const { data: categories } = await removeCate(id);
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
    builder.addCase(getCategoriAll.fulfilled, (state, action) => {
      state.loading = true;
      state.value = action.payload;
    });

    builder.addCase(uploadCategori.fulfilled, (state, action) => {
      state.loading = true;
      state.value = action.payload;
    });

    builder.addCase(removeCategori.fulfilled, (state, action) => {
      state.loading = true;
      state.value = action.payload;
    });
    builder.addCase(addCategori.fulfilled, (state, action) => {
      state.loading = true;
      state.value = action.payload;
    });
  },
});
export default cateSlice.reducer;
