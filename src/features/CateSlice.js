import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCate, removeCate, uploadCate, getAllCate } from './../api/Categoris';
import { getDataUserLoca } from "../app/getDataLoca";

async function getAll() {
  const { data: categories } = await getAllCate();
  const dataCategories = categories?.data?.filter((item) => item?.code_shop == getDataUserLoca().code)
  return dataCategories
}
export const getCategoriAll = createAsyncThunk(
  "categories/getCategoriAll",
  async () => {
    return getAll();
  }
);

export const uploadCategori = createAsyncThunk(
  "categories/uploadCategori",
  async (data) => {
    await uploadCate(data);
    return getAll();

  }
);
export const addCategori = createAsyncThunk(
  "categories/addCategori",
  async (data) => {
    await addCate(data);
    return getAll();

  }
);
export const removeCategori = createAsyncThunk(
  "categories/removeCategori",
  async (id) => {
    await removeCate(id);
    return getAll();

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
