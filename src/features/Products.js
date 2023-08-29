import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPro, getAllPro, getPro, removePro, removesPro, uploadPro } from './../api/ProAPI';

// async function getAll() {
//   const { data: products } = await ProAPI.getAll();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const dataProducts = products?.filter((item) =>item.user_id == user._id)
//   return dataProducts;
// }
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id) => {
    const { data: products } = await getPro(id);
    return products;
  }
);
export const getProductAll = createAsyncThunk(
  "products/getProductAll",
  async () => {
    const { data: products } = await getAllPro();
    return products;
  }
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data) => {
    const { data: products } = await addPro(data);
    return products;
  }
);
export const uploadProduct = createAsyncThunk(
  "products/uploadProduct",
  async (data) => {
    const { data: products } = await uploadPro(data);
    return products;
  }
);
export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (data) => {
    console.log(data,'3ewfrfddata')
    const { data: products } = await removePro(data);
    return products;
  }
);
export const removeProducts = createAsyncThunk(
  "products/removeProducts",
  async (dataId) => {
    const { data: products } = await removesPro(dataId);
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

