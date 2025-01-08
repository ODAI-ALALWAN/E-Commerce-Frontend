import React from 'react'

export default function ProductsAlmostFinished() {
  return (
    <div className='bg-[#fff] p-3 border h-[400px] shadow-lg rounded-md ' >
      <h3 className='font-thin m-2 '>Products Almost Finished</h3>
      <div className='responsive-table' >
      <table className='w-full text-base' >
            <thead>
            <tr >
              <td>Product</td>
              <td>Sold</td>
              <td>Quntity</td>
            </tr>
          </thead>
          <tbody  > 
              
              <tr>
                <td>Iphone 15 </td>
                <td>10</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Iphone 15 </td>
                <td>10</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Iphone 15 </td>
                <td>10</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Iphone 15 </td>
                <td>10</td>
                <td>3</td>
              </tr>
              
          </tbody>

        </table>



      </div>
      
    </div>
  )
}
