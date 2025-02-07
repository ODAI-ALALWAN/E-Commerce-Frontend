import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Get_Product } from '../../../../rtk/slices/Product-slice';

export default function TopSellingProducts() {



  const { data : products  } = useSelector((state) => state.products);

  const dispatch = useDispatch()

  const topSellingProducts = products
  ? [...products]
      .sort((a, b) => b.sold - a.sold) 
      .slice(0, 5) 
  : [];

  useEffect(() => {
    dispatch(Get_Product())
  },[dispatch])


  return (
    <div className='bg-[#fff] p-3  h-[400px]  border shadow-lg rounded-md overflow-scroll   ' >
      <h3 className=' font-thin m-2 '>Top 5 Selling Products</h3>
      <div className='responsive-table' >
      <table className='w-full text-base' >
            <thead  >
            <tr >
              <td>Product</td>
              <td>Sales</td>
              <td>Sold</td>
            </tr>
          </thead>
          <tbody className='  ' > 
          {topSellingProducts.length > 0 ? (
              topSellingProducts.map((product, index) => (
                <tr key={index}>
                   <td>
                      <img src={product.imageCover} alt={product.imageCover} className='h-[100px]' />
                    </td>
                  <td> {product.price * product.sold} $</td>
                  <td>{product.sold}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No products available
                </td>
              </tr>
            )}
              

              
          </tbody>

        </table>



      </div>
      
    </div>
  )
}
