import React, { useEffect } from 'react'
import CardProduct from './products/CardProduct'

import washlist from "../../assets/washlist.webp";
import { useDispatch, useSelector } from 'react-redux';
import { GETLogged_User_Wishlist } from '../../rtk/slices/WishList-slice';
import Lodaing from '../../ui/Lodaing';



export default function Washlist() {

  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  const { data , loading } = useSelector((state) => state.wishList);


  useEffect(() => {
    if (isLogin) {
      dispatch(GETLogged_User_Wishlist());
    }
  }, [dispatch, isLogin]);


  if (loading) return <div className="container mt-4 "><Lodaing /></div>;

  return (
    <div className='container flex flex-col h-full min-h-screen  gap-1'>
      <div className='bg-[#eee] w-full h-[100px] mt-2  flex justify-evenly shadow-md'>
        <h3 className='flex items-center font-serif tracking-wider ' >My WISHLIST</h3>
        <div className=' px-10 items-center' >
        <img src={washlist} alt='wishlist icon' className='w-[100px]' />
        </div>
          
      </div>
      <div className='mt-4 w-full max-w-[1000px] mx-auto '>
        <div className='Products' >
        {data?.map((ele , i) =>  {
            return (
                <CardProduct key={ele._id} data={ele} />
            )
        })}
    

        </div>
      </div>

        
    </div>
  )
}
