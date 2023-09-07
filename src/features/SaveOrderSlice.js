import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SaveOrderAPI, {
  add,
  remove_order,
  removes_order,
  upload,
  uploadSaveOrders,
  uploadSaveoderCart,
} from "../api/SaveOrder.js";
import { getDataUserLoca } from "../app/getDataLoca";
async function getAll() {
  const { data: saveorders } = await SaveOrderAPI.getAll();
  const dataSaveorder = saveorders?.filter((item) => item.code_shop == getDataUserLoca()?.code&& item.user_id == getDataUserLoca()?._id)
  return dataSaveorder;
}
export const getSaveOrderAll = createAsyncThunk(
  "saveorders/getSaveOrderAll",
  async () => {
    return getAll();
  }
);
export const addSaveOrder = createAsyncThunk(
  "saveorders/addSaveOrder",
  async (data) => {
    await add(data);
    return getAll();
  }
);
export const removeSaveOrder = createAsyncThunk(
  "saveorders/removeSaveOrder",
  async (data) => {
    console.log(data, '1e2wfrf')
    await remove_order(data);
    return getAll();
  }
);
export const removesSaveOrder = createAsyncThunk(
  "saveorders/removesSaveOrder",
  async (data) => {
    await removes_order(data);
    return getAll();

  }
);
export const uploadSaveOrder = createAsyncThunk(
  "saveorders/uploadSaveOrder",
  async (data) => {
    await upload(data);
    return getAll();
  }
);
export const uploadSaveOrderCart = createAsyncThunk(
  "saveorders/uploadSaveOrderCart",
  async (data) => {
    await uploadSaveoderCart(data);
    return getAll();
  }
);
export const uploadSaveOrderss = createAsyncThunk(
  "saveorders/uploadSaveOrderss",
  async (data) => {
    await uploadSaveOrders(data);
    return getAll();
  }
);
const saveOrderSlice = createSlice({
  name: "saveorders",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSaveOrderAll.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(addSaveOrder.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(uploadSaveOrder.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(removeSaveOrder.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(uploadSaveOrderss.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(removesSaveOrder.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(uploadSaveOrderCart.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export default saveOrderSlice.reducer;
