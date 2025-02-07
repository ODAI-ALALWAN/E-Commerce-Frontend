import {  Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Cart from "./components/home/Cart";
import Washlist from "./components/home/Washlist";
import Shop from "./page/Home/Shop";
import Dashbord from "./page/Dashbord/Dashbord";
import Main from './page/Dashbord/Admin/Main'
import Users from "./page/Dashbord/Admin/Users";
import StoreHouse from "./page/Dashbord/Admin/StoreHouse";
import AddProducts from "./page/Dashbord/Admin/AddProducts";
import Orders from "./page/Dashbord/Admin/Orders";
import Offers from "./page/Dashbord/Admin/Offers";
import ProductId from "./components/home/products/ProductId";
import Categroy from "./page/Dashbord/Admin/Categroy";
import Profile from "./page/Dashbord/User/Profile";
import RequireAuth from "./components/auth/RequireAuth";
import NotFindPage from "./utils/NotFindPage";
import Invoice from "./page/Dashbord/Admin/Orders/Invoice";
import Id from "./page/Dashbord/Admin/ProductId/ProductId";
import CouponId from "../src/page/Dashbord/Admin/coupon/CouponId";
import CategroyId from "./page/Dashbord/Admin/categroy/CategroyId";
import Baaner from "./page/Dashbord/Admin/Baaner";






function App() {



  return (
    <>
    <Routes>
      <Route index element={<Home/>} />
      <Route path="SignIn" element={<Login/>}/>
      <Route path="SignUp" element={<Register/>}/>
      <Route path="Cart" element={<Cart/>}/>
      <Route path="Washlist" element={<Washlist/>}/>
      <Route path="Shop" element={<Shop/>} />
      <Route path="/:id" element={<ProductId/>}/>

      
      <Route path="/*" element={<NotFindPage/>}/>





      {/* Admin */}

        <Route element={<RequireAuth allowedRoles={['admin','user']}/>}> 

          <Route path="Dashbord" element={<Dashbord/>} >
              <Route element={<RequireAuth allowedRoles={['admin']}/>}>
                    <Route path="Admin/Main" element={<Main/>} />
                    <Route path="Admin/Users" element={<Users/>} />
                    <Route path="Admin/Orders" element={<Orders/>} />
                    <Route path="Admin/Orders/invo" element={<Invoice/>} />
                    <Route path="Admin/AddProduct" element={<AddProducts/>} />
                    <Route path="Admin/StoreHouse" element={<StoreHouse/>} />
                    <Route path="Admin/StoreHouse/:id" element={<Id/>} />
                    <Route path="Admin/Categroy" element={<Categroy/>} />
                    <Route path="Admin/Categroy/:id" element={<CategroyId/>} />
                    <Route path="Admin/Offers" element={<Offers/>} />
                    <Route path="Admin/Offers/:id" element={<CouponId/>} />
                    <Route path="Admin/Baaner" element={<Baaner/>} />

              </Route> 
              <Route element={<RequireAuth allowedRoles={['user']}/>}>          
                  <Route path="user/Profile" element ={<Profile/>}/>
             </Route>  

          </Route>

        </Route> 
        
    </Routes>
    </>

  );
}

export default App;
