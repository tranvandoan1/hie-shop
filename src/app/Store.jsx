import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/Products";
// import saveOrderSlice from "../reducers/SaveOrderSlice";
// import categorisSlice from "../reducers/CategoriSlice";
// import sliderSlice from "../reducers/SliderSlice";
// import allDataSlice from "../reducers/AllData";
// import shopOwnersSlice from "./../reducers/ShopOwner";
// import cateshopeeSlice from "../reducers/CateShop";
// import dataAddProSlice from "./../reducers/DataAddProSlice";
// import commentSlice from "../reducers/CommentSlice";
// import checkOutSlice from "../reducers/CheckOutSlice";
// import infoUserSlice from "../reducers/InfoUserSlice";
import classifieSlice from "../features/Classifies";
import userSlice from "../features/UserSlice";
import cateSlice from "../features/CateSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    // saveorders: saveOrderSlice,
    categories: cateSlice,
    // slides: sliderSlice,
    // dataAll: allDataSlice,
    // shopowners: shopOwnersSlice,
    // cateshops: cateshopeeSlice,
    // dataaddpro: dataAddProSlice,
    // comments: commentSlice,
    // checkOut: checkOutSlice,
    // infoUser: infoUserSlice,
    classifies:classifieSlice,
    users:userSlice,

  },
});
