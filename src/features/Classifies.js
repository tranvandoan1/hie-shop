import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addClassify, getAllClassify, removesClassify, uploadClassify } from './../api/Classify';


export const getAllClassifies = createAsyncThunk(
  "classifies/getAllClassifies",
  async () => {
    const { data: classifies } = await getAllClassify();
    return classifies;
  }
);

export const addClassifies = createAsyncThunk(
  "classifies/addComments",
  async (data) => {
    const { data: classifies } = await addClassify(data);
    return classifies;
  }
);
export const uploadtClassifies = createAsyncThunk(
  "classifies/uploadtClassifies",
  async (data) => {
    const { data: classifies } = await uploadClassify(data.id, data.dataUploat);
    return classifies;
  }
);
export const removesClassifies = createAsyncThunk(
  "classifies/removesClassifies",
  async (dataId) => {
    const { data: classifies } = await removesClassify(dataId);
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
