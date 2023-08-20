import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProAPI, { add, remove, removes, upload } from "../API/ProAPI";
import axios from 'axios';

// async function getAll() {
//   const { data: products } = await ProAPI.getAll();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const dataProducts = products?.filter((item) =>item.user_id == user._id)
//   return dataProducts;
// }
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id) => {
    const { data: products } = await ProAPI.get(id);
    return products;
  }
);
export const getProductAll = createAsyncThunk(
  "products/getProductAll",
  async () => {
    const { data: products } = await ProAPI.getAll();
    return products;
  }
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data) => {
    console.log(data, 'test xem')
    const { data: products } = await add(data);
    return products;
  }
);
export const uploadProduct = createAsyncThunk(
  "products/uploadProduct",
  async (data) => {
    console.log(data, 'test xem')
    const { data: products } = await upload(data);
    return products;
  }
);
export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id) => {
    const { data: products } = await remove(id);
    return products;
  }
);
export const removeProducts = createAsyncThunk(
  "products/removeProducts",
  async (dataId) => {
    const { data: products } = await removes(dataId);
    return products;
  }
);
const productSlice = createSlice({
  name: "products",
  initialState: {
    value: [],
    loading: true
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {

      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(getProductAll.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
      console.log('2e312')
    });
    builder.addCase(removeProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
      console.log('2e312')
    });
    builder.addCase(uploadProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
      console.log('2e312')
    });
  },
});
export default productSlice.reducer;

