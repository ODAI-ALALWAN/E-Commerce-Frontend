import React from 'react'
import Stat from './Stat'
import { formatCurrency } from '../../../../utils/helpers'
import { FaUsers } from "react-icons/fa";
import { LuBoxes } from "react-icons/lu";
import { PiMoneyDuotone } from "react-icons/pi";
import { AiTwotoneShopping } from "react-icons/ai";

export default function Statistics() {

  return (
    <div className='box flex flex-wrap items-center md:gap-[20px] justify-evenly p-[20px] mt-5'>
        <Stat 
        Icon={<LuBoxes/>}
        color={'bg-[#baa3c8]'}  
        TextValue={"Total Orders"}  
        NumberValue={"2,000"}
        />
        <Stat 
        Icon={<PiMoneyDuotone/>}
        color={'bg-[#a29ca2]'}  
        TextValue={"Sales"}  
        NumberValue={formatCurrency(10000)} />
        <Stat 
         Icon={<AiTwotoneShopping/>}
        color={'bg-[#dfe8d9]'}  
        TextValue={"Product"}  
        NumberValue={50} />
        <Stat 
        Icon={<FaUsers/>}
        color={'bg-[#c4cdb6]'} 
        TextValue={"Customers"} 
        NumberValue={1023} />
    </div>
  )
}
