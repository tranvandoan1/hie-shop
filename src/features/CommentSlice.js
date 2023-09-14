import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CommentAPI, { add, upload, remove } from "../api/CommentAPI";
import { getDataUserLoca } from "../app/getDataLoca";
async function getAll() {
  const { data: comments } = await CommentAPI.getAll();
  const dataComments = comments?.data?.filter((item) => item?.code_shop == getDataUserLoca().code)
  return dataComments
}
export const getAllComment = createAsyncThunk(
  "comment/getAllComment",
  async () => {
    return getAll();
  }
);

export const addComments = createAsyncThunk(
  "comment/addComments",
  async (data) => {
    await add(data);
    return getAll();
  }
);
export const uploadtComments = createAsyncThunk(
  "comment/uploadtComments",
  async (data) => {
    await upload(data);
    return getAll();
  }
);
export const removeComments = createAsyncThunk(
  "comment/removeComments",
  async (data) => {
    await remove(data);
    return getAll();
  }
);
const commentSlice = createSlice({
  name: "comment",
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
    builder.addCase(getAllComment.fulfilled, (state, action) => {
      console.log('vafp rồi')
      state.value = action.payload;
    });
    builder.addCase(addComments.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(uploadtComments.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(removeComments.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export const { removeComment, addComment } = commentSlice.actions;
export default commentSlice.reducer;
