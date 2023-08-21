import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "./API";

export const getAll = () => {

  const url = `/classifies`;
  return axiosClient.get(url);
}
export const get = (id) => {

  const url = `/classifies/${id}`;
  return axiosClient.get(url);
}


export const add = (cate) => {
  const url = `/classifies`;
  return axiosClient.post(url, cate);
};

export const upload = (id, data) => {
  const url = `/classifies/${id}`;
  return axiosClient.put(url, data);
};


export const removes = (data) => {
  const url = `/removes-classifies`;
  return axiosClient.post(url, data);
};


export const getAllClassifies = createAsyncThunk(
  "classifies/getAllClassifies",
  async () => {
    const { data: classifies } = await getAll();
    return classifies;
  }
);

export const addClassifies = createAsyncThunk(
  "classifies/addComments",
  async (data) => {
    const { data: classifies } = await add(data);
    return classifies;
  }
);
export const uploadtClassifies = createAsyncThunk(
  "classifies/uploadtClassifies",
  async (data) => {
    const { data: classifies } = await upload(data.id, data.dataUploat);
    return classifies;
  }
);
export const removesClassifies = createAsyncThunk(
  "classifies/removesClassifies",
  async (dataId) => {
    const { data: classifies } = await removes(dataId);
    return classifies;
  }
);
const classifieSlice = createSlice({
  name: "classifies",
  initialState: {
    value: [],
  },
  reducers: {
    addComment(state, action) {
      console.log(action.payload);
      state.value.push(action.payload);
    },
    removeComment(state, action) {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllClassifies.fulfilled, (state, action) => {
      console.log('vafp rồi')
      state.value = action.payload;
    });
    builder.addCase(addClassifies.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(uploadtClassifies.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(removesClassifies.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export const { removeComment, addComment } = classifieSlice.actions;
export default classifieSlice.reducer;
