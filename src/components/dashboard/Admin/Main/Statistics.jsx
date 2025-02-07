import React, { useEffect } from 'react'
import Stat from './Stat'
import { formatCurrency } from '../../../../utils/helpers'
import { FaUsers } from "react-icons/fa";
import { LuBoxes } from "react-icons/lu";
import { PiMoneyDuotone } from "react-icons/pi";
import { AiTwotoneShopping } from "react-icons/ai";
import { useDispatch , useSelector } from 'react-redux';
import { Get_Product } from '../../../../rtk/slices/Product-slice';
import { GET_USERS } from '../../../../rtk/slices/User-slice';
import Lodaing from '../../../../ui/Lodaing';
import { GET_All_Order } from '../../../../rtk/slices/OrderAdmin-slice';

export default function Statistics() {

  const { data : user , loader : userloader } = useSelector((state) => state.user);
  const { data : Order , loader : adminOrderloader } = useSelector((state) => state.adminOrder);
  const { data : products , loader : productsloader } = useSelector((state) => state.products);

  const dispatch = useDispatch()

  const sales = Order.reduce((acc, cur) => acc + cur.totalOrderPrice, 0);

  useEffect (() => {
    dispatch(GET_All_Order())
    dispatch(Get_Product())
    dispatch(GET_USERS())
  },[dispatch])

  if (  userloader || adminOrderloader || productsloader ) return  <div className='container mt-4 '><Lodaing/></div>  

  
  
  return (
    <div className='box flex flex-wrap items-center md:gap-[20px] justify-evenly p-[20px] mt-5'>
        <Stat 
        Icon={<LuBoxes/>}
        color={'bg-[#baa3c8]'}  
        TextValue={"Total Orders"}  
        NumberValue={Order.length}
        />
        <Stat 
        Icon={<PiMoneyDuotone/>}
        color={'bg-[#a29ca2]'}  
        TextValue={"Sales"}  
        NumberValue={formatCurrency(sales)} />

        <Stat 
        Icon={<AiTwotoneShopping/>}
        color={'bg-[#dfe8d9]'}  
        TextValue={"Product"}  
        NumberValue={products.length} />

        <Stat 
        Icon={<FaUsers/>}
        color={'bg-[#c4cdb6]'} 
        TextValue={"Customers"} 
        NumberValue={user.length} />
    </div>
  )
}
