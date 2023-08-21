import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient, axiosClientMultipart } from "../api/API";

export const getAll = () => {
  const url = `/categoris`;
  return axiosClient.get(url);
}
export const get = (id) => {
  const url = `/categoris/${id}`;
  return axiosClient.get(url);
}

export const add = (cate) => {
  const url = `/categoris`;
  return axiosClientMultipart.post(url, cate);
};

export const remove = (cate) => {
  console.log(cate, '3ed')
  const url = `/categoris-remove`;
  return axiosClient.post(url, cate);
};

export const upload = (data) => {
  const url = `/categoris-upload`;
  return axiosClientMultipart.post(url, data);
};

export const getCateAll = createAsyncThunk(
  "categories/getCateAll",
  async () => {
    const { data: categories } = await getAll();
    console.log(categories, 'categories121312')
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
    console.log(data, 'data')
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
