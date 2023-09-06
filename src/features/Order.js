import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// @ts-ignore
import OrderAPI, { add } from "../API/Orders";
import { getDataUserLoca } from "../app/getDataLoca";
async function getAll() {
    const { data: orders } = await OrderAPI.getAll();

    const dataSaveorder = orders?.data?.filter(
        (item) =>
            item.code_shop == getDataUserLoca()?.code &&
            item.user_id == getDataUserLoca()?._id
    );
    return dataSaveorder;
}
export const getOrder = createAsyncThunk("order/getOrder", async () => {
    return getAll();
});
export const addOrder = createAsyncThunk("order/addOrder", async (data) => {
    await add(data);
    return getAll();
});
const orderSlice = createSlice({
    name: "order",
    initialState: {
        value: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.value = action.payload;
        });
        builder.addCase(addOrder.fulfilled, (state, action) => {
            state.value = action.payload;
        });
    },
});
export default orderSlice.reducer;
