import React from 'react'

export default function TopSellingProducts() {
  return (
    <div className='bg-[#fff] p-3  h-[400px]  border shadow-lg rounded-md  ' >
      <h3 className=' font-thin m-2 '>Top Selling Products</h3>
      <div className='responsive-table' >
      <table className='w-full text-base' >
            <thead  >
            <tr >
              <td>Product</td>
              <td>Sales</td>
              <td>Sold</td>
            </tr>
          </thead>
          <tbody  > 
              
              <tr>
                <td>Iphone 15 </td>
                <td>25,000</td>
                <td>10</td>
              </tr>
              <tr>
                <td>Iphone 15 </td>
                <td>25,000</td>
                <td>10</td>
              </tr>
              <tr>
                <td>Iphone 15 </td>
                <td>25,000</td>
                <td>10</td>
              </tr>
              <tr>
                <td>Iphone 15 </td>
                <td>25,000</td>
                <td>10</td>
              </tr>
              
          </tbody>

        </table>



      </div>
      
    </div>
  )
}
