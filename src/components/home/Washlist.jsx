import React from 'react'
import CardProduct from './products/CardProduct'
import Imag from "../../assets/9.webp";
import washlist from "../../assets/washlist.webp";


export default function Washlist() {
  return (
    <div className='container flex flex-col h-full min-h-screen  gap-1'>
      <div className='bg-[#eee] w-full h-[100px] mt-2  flex justify-evenly shadow-md'>
        <h3 className='flex items-center font-serif tracking-wider ' >My WASHLIST</h3>
        <div className=' px-10 items-center' >
        <img src={washlist} alt={washlist} className='w-[100px]' />
        </div>
          
      </div>
      <div className='mt-4 w-full max-w-[1000px] mx-auto '>
        <div className='Products' >
            <CardProduct ProductImag={Imag} price={300}  />
            <CardProduct ProductImag={Imag} price={300} />
            <CardProduct ProductImag={Imag} price={300} />
            <CardProduct ProductImag={Imag} price={300} />
            <CardProduct ProductImag={Imag} price={300}  />
            <CardProduct ProductImag={Imag} price={300}  />
            <CardProduct ProductImag={Imag} price={300}  />
            <CardProduct ProductImag={Imag} price={300}  />
            <CardProduct ProductImag={Imag} price={300}  />
            <CardProduct ProductImag={Imag} price={300}  />
            <CardProduct ProductImag={Imag} price={300}  />
            <CardProduct ProductImag={Imag} price={300}  />

        </div>
      </div>

        
    </div>
  )
}
