import React from 'react'
import { MdOutlineCopyright } from "react-icons/md";
export default function Footer() {
    const date = new Date()
  return (
    <footer className='bg-[#153448]   h-[60px] md-lg:h-[50px]'>
        <div className='container mx-auto] sm:w-[100%]'>
            <div className='flex justify-center items-center py-3'>
                <MdOutlineCopyright className='mx-1'/> {date.getFullYear()} <a className='mx-2 text-[#4d869c]' href='https://odai-alalwan.vercel.app' target='https://odai-alalwan.vercel.app' >ODAI ALALWAN</a>
            </div>
        </div>

    </footer>
  )
}
