import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, removeAdress, updateInfoAdress, upload } from "../API/InFoUser";
import InfoUserAPI from "./../API/InFoUser";
import { getDataUserLoca } from "../app/getDataLoca";
async function getAll() {
  const { data: info_user } = await InfoUserAPI.getAll();
console.log(info_user,'info_user')
  const dataProducts = info_user?.data?.filter((item) => item.user_id == getDataUserLoca()._id)
  return dataProducts;
}
export const getInfoUser = createAsyncThunk(
  "infouser/getInfoUser",
  async () => {
    await InfoUserAPI.getAll();
    return getAll();
  }
);
export const addInfoUser = createAsyncThunk(
  "infouser/addInfoUser",
  async (data) => {
    await add(data);
    return getAll();
  }
);
export const removeInfoUser = createAsyncThunk(
  "infouser/removeInfoUser",
  async (data) => {
    await removeAdress(data);
    return getAll();
  }
);
export const uploadUserAdress = createAsyncThunk(
  "infouser/uploadUserAdress",
  async (data) => {
    console.log(data, '132eqw')
    await upload(data);
    return getAll();
  }
);
export const uploadUserInfoAdress = createAsyncThunk(
  "infouser/uploadUserInfoAdress",
  async (data) => {
    console.log(data, '132eqw')
    await updateInfoAdress(data);
    return getAll();
  }
);

const infoUserSlice = createSlice({
  name: "infoUuser",
  initialState: {
    value: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInfoUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(getInfoUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getInfoUser.rejected, (state, action) => {
      state.loading = true;
    });
    builder.addCase(removeInfoUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(addInfoUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(uploadUserAdress.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(uploadUserInfoAdress.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
  },
});
export default infoUserSlice.reducer;
