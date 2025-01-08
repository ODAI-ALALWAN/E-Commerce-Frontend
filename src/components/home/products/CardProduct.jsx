import React from 'react'
import { FaEye, FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { RiShoppingCartLine } from "react-icons/ri";
import { Link } from 'react-router-dom';


export default function CardProduct({ProductImag , reting , price , disc , icon}) {
  return (
    <div className='w-full h-[320px]'>
        <div className='border group transition-all duration-500 hover:shadow-md hover:-mt-3  border-[#eee] shadow-md  rounded-lg  h-[290px] w-[180px] cardProduct ' >  
              <div className='relative overflow-hidden'>
              <div className={`${disc ? 'flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2' : ''} `}>{disc}</div> 
                  <img src={ProductImag} alt='../../assets/9.webp' className='w-full p-[4px] border-b-2 border-[#eee] rounded-md h-[180px]' />   
                  <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                  <li className={` ${icon && " w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#eee]  hover:rotate-[720deg] transition-all"}`}>
                  {icon}
                  </li>
                  <Link to={'Id'}>
                  <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#eee] hover:rotate-[720deg] transition-all'>
                  <FaEye />
                  </li>
                  </Link>
                  <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#eee] hover:rotate-[720deg] transition-all'>
                  <RiShoppingCartLine />
                  </li>
                  </ul>      

                 </div>  
                    <p className='px-2 text-md  font-light h-[45px] w-full overflow-clip'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nulla rem maiores nesciunt accusamus incidunt mollitia ipsum</p>
                    <div className='flex justify-center flex-row gap-10 mt-3 flex-nowrap '>
                          <div>{price} $</div>
                          <div className='flex items-center font-extralight  text-sm'>
                            {reting}
                            <FaStar className='text-[#b6eb43]' />
                            <FaStar className='text-[#b6eb43]' />
                            <FaStar className='text-[#b6eb43]' />
                            <FaStar className='text-[#b6eb43]' />
                            <CiStar/>
                          </div>
                    </div>
        </div>   
    </div>
  )
}
