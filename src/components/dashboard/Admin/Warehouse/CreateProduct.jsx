import React from 'react'
import { FaRegImage } from "react-icons/fa6";
import { IoMdImages } from "react-icons/io";

export default function CreateProduct() {
  return (
    <div className='flex justify-center items-center flex-col'> 
        <form>
            <div className='flex flex-col  w-[250px] my-2'>
            <label className=' font-light text-sm '  >Tilte</label>
            <input type='text' id='tilte' name='tilte' placeholder='Tilte' className=' border-black rounded-md  outline-none p-2'  />
            </div>
            <div className='flex flex-col  w-[250px] my-2 '>
                <label  className=' font-light text-sm '   >Description</label>
                <textarea type='text' id='description' name='description' placeholder='Description Product ....' className=' border-black rounded-md p-2 outline-none h-16' />
                </div>
                <div className='flex flex-col  w-[250px] my-2'>
                <label  className=' font-light text-sm ' >Quantity</label>
                <input defaultValue={1} type='number' id='quantity' name='quantity' placeholder='quantity' className=' border-black rounded-md  outline-none p-2' />
                </div>
                <div className='flex flex-col  w-[250px] my-2'>
                <label  className=' font-light text-sm ' >Price</label>
                <input defaultValue={0} type='number' id='price' name='price' placeholder='price' className=' border-black rounded-md  outline-none p-2' />
                </div>
                <div className='flex flex-col  w-[250px] my-2'>
                <label  className=' font-light text-sm ' >Category</label> 
                <select  name='category'  value='category' className=' border-black rounded-md  outline-none p-2' >
                <option>category</option>
                </select> 
                </div>
                <div className='flex flex-col  w-[250px] my-2 cursor-pointer'>
                <label  className=' font-light text-sm  ' >Image Cover</label>
                <span><FaRegImage/></span>
                <input type='file' id='' name='imageCover'  accept='image/*' placeholder='imageCover...' className=' border-black rounded-md hidden  outline-none p-2' />
                </div>
                <div className='flex flex-col  w-[250px] my-2 border-black rounded-md cursor-pointer '>
                <label htmlFor='images' className=' font-light text-sm ' >Images</label> 
                <span><IoMdImages/></span>
                <input multiple type='file' id='images' name='images' className='hidden' />

                </div>

        </form>
            <button className='bg-sky-500 hover:bg-sky-700 w-[100px] rounded-md p-1 text-white text-l m-5 flex  justify-center items-center' >Create</button>
    </div>
     
  )
}
