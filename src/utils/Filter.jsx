import React from 'react'

export default function Filter() {
 let arr = [
    "Tilte",
    "Tilte",
    "Tilte",
    "Tilte",
    "Tilte",
    "Tilte",
 ]
  return (
    <>
    <div className='flex  gap-1 flex-col'>
    <h2 className='mb-2 font-bold mt-4' >Categroy</h2>
        {arr.map((ele , i) => {
            return (
                <div key={i} className='flex gap-1 font-light'>
                <input  type="checkbox" id='' value={ele} />
                <label >{ele}</label>
                </div>
            )

        })}
    </div>
   </>
  )
}
