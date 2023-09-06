import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/Products";
import saveOrderSlice from "../features/SaveOrderSlice";
// import categorisSlice from "../reducers/CategoriSlice";
// import sliderSlice from "../reducers/SliderSlice";
// import allDataSlice from "../reducers/AllData";
// import shopOwnersSlice from "./../reducers/ShopOwner";
// import cateshopeeSlice from "../reducers/CateShop";
// import dataAddProSlice from "./../reducers/DataAddProSlice";
// import commentSlice from "../reducers/CommentSlice";
// import checkOutSlice from "../reducers/CheckOutSlice";
import infoUserSlice from "../features/InfoUserSlice";
import classifieSlice from "../features/Classifies";
import userSlice from "../features/UserSlice";
import orderSlice from "../features/Order";
import cateSlice from "../features/CateSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    saveorders: saveOrderSlice,
    categories: cateSlice,
    // slides: sliderSlice,
    // dataAll: allDataSlice,
    // shopowners: shopOwnersSlice,
    // cateshops: cateshopeeSlice,
    // dataaddpro: dataAddProSlice,
    // comments: commentSlice,
    // checkOut: checkOutSlice,
    infoUsers: infoUserSlice,
    classifies:classifieSlice,
    orders:orderSlice,
    users:userSlice,

  },
});
