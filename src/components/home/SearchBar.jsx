
import { IoSearchSharp } from "react-icons/io5";

import { useState } from "react";
import { FaList } from "react-icons/fa";
import { IoIosArrowDown } from 'react-icons/io'
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [showCategroy , setShowCategroy] = useState(true)
 const categroy = ['Product','Product' , 'Product','Product' , 'Product']
  
  return (
    <div className="w-[85%]  lg:w-[90%] mx-auto ">
      <div className="w-full  gap-8  sm:gap-3 flex justify-center  items-center sm:flex-wrap">
          <div className="w-4/12 sm:w-full">
            <div className="bg-white  relative">
              <div  onClick={() => setShowCategroy(!showCategroy)} className="h-[50px] bg-[#eee] text-black flex justify-center sm:justify-between sm:px-6 items-center gap-3 font-bold text-md cursor-pointer " >
                <div className="flex justify-center items-center gap-3" >
                    <span><FaList/></span>
                    <span>All Categroy</span>
                    <span><IoIosArrowDown/> </span>
                </div>
              </div>
              <div className={`${showCategroy ? 'h-0' : 'h-[300px]'} overflow-hidden  transition-all sm:relative duration-500 absolute z-[999] bg-[#ddd] w-full border-x`} >  
                <ul className="p-2">
                  {categroy.map((ele , i)=> {
                    return (
                      <li key={i} className="flex  justify-start items-center gap-4 py-[6px] px-[24px]" >
                        <Link>{ele}</Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
      

        <div className="w-9/12  sm:w-full  ">
          <div className="flex  items-center gap-2">
            <input placeholder="What do you need ? " type="text" className="border w-8/12  sm:w-full  sm:mb-2  py-1 px-2 rounded-md text-black outline-none "  />
            <button><IoSearchSharp className="text-2xl"/></button>
          </div>

        </div>



      </div>
      

    </div>
   
  
  )
}
