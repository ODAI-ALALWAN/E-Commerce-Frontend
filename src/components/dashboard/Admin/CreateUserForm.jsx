import React from 'react'

export default function CreateUserForm() {
  return (
    <div>
        <div className=' md:text-sm flex flex-col justify-center items-center gap-2 md:gap-[2px] ' >
            <div className='flex flex-col gap-1 w-[250px]  ' >
            <label>Name</label>
            <input  id='name' type='name' placeholder='Full Name' className=' border-black rounded-md  outline-none p-2'  />
            </div>
            
            <div className='flex flex-col gap-1 w-[250px]' >
            <label>Email</label>
            <input  id='email' type='email' placeholder='email@example.com' className=' border-black rounded-md  outline-none p-2'  />
            </div>

            <div className='flex flex-col gap-1 w-[250px]'>
            <label>Password</label>
            <input  id='password' type='password' placeholder='Password . . .' className=' border-black rounded-md  outline-none p-2'  />
            </div>

            <div className='flex flex-col gap-1 w-[250px]'>
            <label>Confirm Password</label>
            <input  id='password' type='password' placeholder='Confirm Password . . .' className=' border-black rounded-md  outline-none p-2'  />
            </div>

            <div className='flex flex-col gap-1 w-[250px]'>
              <select className=' border-black rounded-md  outline-none p-2 relative '>
                <option className=' absolute bg-[#eee] top-0 left-3 '  >role</option>
                <option value={'user'} className='bg-[#eee]' >user</option>
                <option value={'manager'} >manager</option>
              </select>
            </div>
            
            <button className='bg-sky-500 hover:bg-sky-700 w-[100px] rounded-md p-2 text-white text-l mt-10 md:mt-5 mb-5' >Create </button>
        </div>
    </div>
  )
}
