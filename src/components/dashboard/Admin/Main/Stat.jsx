import React from 'react'



export default function Stat({color , TextValue , NumberValue , Icon  }) {
  return (
    <div className='flex flex-col justify-center items-center gap-1'>
        <div className={`flex justify-center items-center ${color} rounded-[50%] w-[50px] h-[50px]`}><span className='text-[30px]'>{Icon}</span></div>
        <div className='flex flex-col justify-center items-center'>
          <span className='md:text-xs text-base font-mono'>{TextValue}</span>
          <span className='md:text-xs text-base font-mono' >{NumberValue}</span>
        </div>
    </div>
  )
}
