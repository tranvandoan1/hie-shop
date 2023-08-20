import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadInfoUser, getInfoUser, uploadPassword, uploadEmail } from "../api/Users";

export const getUser = createAsyncThunk(
  "users/getUser",
  async (id) => {
    console.log(id, 'chào nehs')
    const { data: user } = await getInfoUser(id);
    return user;
  }
);

export const uploadUser = createAsyncThunk(
  "users/uploadUser",
  async (data) => {
    const { data: user } = await uploadInfoUser(data);
    return user;
  }
);

export const uploadEmailUser = createAsyncThunk(
  "users/uploadEmailUser",
  async (data) => {
    const { data: user } = await uploadEmail(data);
    return user;
  }
);
const userSlice = createSlice({
  name: "users",
  initialState: {
    value: [],
    password: {},
    email:null,
    loading: true
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });

    builder.addCase(uploadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });

    builder.addCase(uploadEmailUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
  },
});
export default userSlice.reducer;
