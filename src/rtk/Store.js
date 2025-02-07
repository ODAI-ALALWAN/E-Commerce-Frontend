import { configureStore } from "@reduxjs/toolkit";

import Productlist from "./slices/Product-slice";
import CategroyList from "./slices/Categroy-slice";

import AuthUserSlice from "./slices/AuthUser-slice";
import UsersSlice from "./slices/User-slice";
import  AdminOrderSlice  from "./slices/OrderAdmin-slice";
import CouponSlice  from "./slices/Coupon-slice";
import Banner  from "./slices/Banner";
import  ReviewList  from "./slices/ReviewSlice";
import  Cartlist  from "./slices/Cart-slice";
import WishList from "./slices/WishList-slice"
const store = configureStore({
  reducer: {
    auth: AuthUserSlice,
    user: UsersSlice,
    adminOrder : AdminOrderSlice ,
    products : Productlist,
    categroy : CategroyList,
    coupon : CouponSlice,
    banner : Banner,
    review : ReviewList ,
    cart : Cartlist,
    wishList : WishList,
    


  },
});

export default store;
