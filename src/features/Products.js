import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient, axiosClientMultipart } from "../api/API";


export const getAll = () => {

  const url = `/get-products`;
  return axiosClient.get(url);
}
export const get = (id) => {

  const url = `/products/${id}`;
  return axiosClient.get(url);
}
export const add = (data) => {
  const url = `/products`;
  return axiosClientMultipart.post(url, data);
};

export const upload = (data) => {
  const url = `/product-upload`;
  return axiosClientMultipart.post(url, data);
};
export const remove = (id) => {
  const url = `/product/${id}`;
  return axiosClient.delete(url);
};

export const removes = (dataId) => {
  const url = `/remove-products`;
  return axiosClient.post(url, dataId);
};
// async function getAll() {
//   const { data: products } = await ProAPI.getAll();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const dataProducts = products?.filter((item) =>item.user_id == user._id)
//   return dataProducts;
// }
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id) => {
    const { data: products } = await get(id);
    return products;
  }
);
export const getProductAll = createAsyncThunk(
  "products/getProductAll",
  async () => {
    const { data: products } = await getAll();
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

