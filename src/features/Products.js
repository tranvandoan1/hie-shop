import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPro, getAllPro, getPro, removePro, removesPro, uploadPro } from './../api/ProAPI';
import { getDataUserLoca } from "../app/getDataLoca";

async function getAll() {
  const { data: products } = await getAllPro();

  const dataProducts = products?.data?.filter((item) => item.code_shop == getDataUserLoca().code)
  return dataProducts
}
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
    return getAll();
  }
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data) => {
    await addPro(data);
    return getAll();

  }
);
export const uploadProduct = createAsyncThunk(
  "products/uploadProduct",
  async (data) => {
    await uploadPro(data);
    return getAll();

  }
);
export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (data) => {
    console.log(data, '3ewfrfddata')
    await removePro(data);
    return getAll();

  }
);
export const removeProducts = createAsyncThunk(
  "products/removeProducts",
  async (dataId) => {
    await removesPro(dataId);
    return getAll();

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

