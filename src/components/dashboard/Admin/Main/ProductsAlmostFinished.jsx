import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Get_Product } from '../../../../rtk/slices/Product-slice';

export default function ProductsAlmostFinished() {

  const { data : products  } = useSelector((state) => state.products);

  const dispatch = useDispatch()

  const filteredProducts = products.filter((el) => el.quantity <= 3);

  useEffect(() => {
    dispatch(Get_Product())
  },[dispatch])



  return (
    <div className='bg-[#fff] p-3 border h-[400px] shadow-lg rounded-md overflow-scroll ' >
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
          {
            filteredProducts.length > 0 ? (
              filteredProducts.map((el) => (
                <tr key={el._id}>
                  <>
                    <td>
                      <img src={el.imageCover} alt={el.imageCover} className='h-[100px]' />
                    </td>
                    <td>{el.sold}</td>
                    <td>{el.quantity}</td>
                  </>
                </tr>
              ))
            ) : (
              <span className='flex justify-center mt-3' > There are no products less 3.   </span>
            )
          }
             
              


          </tbody>

        </table>



      </div>
      
    </div>
  )
}
