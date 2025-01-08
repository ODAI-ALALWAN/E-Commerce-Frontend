import { configureStore } from "@reduxjs/toolkit";

import Productlist from "./slices/Product-slice";
import CategroyList from "./slices/Categroy-slice";

import AuthUserSlice from "./slices/AuthUser-slice";
import UsersSlice from "./slices/User-slice";
import  AdminOrderSlice  from "./slices/OrderAdmin-slice";

const store = configureStore({
  reducer: {
    auth: AuthUserSlice,
    user: UsersSlice,
    adminOrder : AdminOrderSlice ,
    products : Productlist,
    categroy : CategroyList,
    


  },
});

export default store;
