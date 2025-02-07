import { useLocation, useParams } from "react-router-dom"; 
import { useDispatch, useSelector } from 'react-redux';
import CardProduct from '../products/CardProduct';
import SearchBar from '../SearchBar'
import Slider from '../Slider'
import { useEffect, useState } from 'react';
import { Get_AllProduct_WithSearch, Get_Product } from '../../../rtk/slices/Product-slice';
import { GET_Categroy } from '../../../rtk/slices/Categroy-slice';
import toast from 'react-hot-toast';
import { set } from "date-fns";

export default function CategroyById() {

    const { id } = useParams()
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('');
    const { data : products  } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const location = useLocation(); 

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const categoryFromUrl = queryParams.get('category');
        if (categoryFromUrl) {
          setCategory(categoryFromUrl);
        }
      }, [location]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          await dispatch(Get_Product());
          setCategory(id)
        } catch (error) {
          toast.error("Something went wrong, please try again!");
        }
      };
  
      fetchData();
    }, [dispatch, id]);
  

  
    useEffect(() => {
      if (category || sort ) {
        dispatch(Get_AllProduct_WithSearch({ category , sort : String(sort) }));
      } else {
        
        dispatch(Get_Product());
      }
    }, [category, dispatch, sort]);
      
  
    return (
        <>
          <SearchBar />
          <Slider />
                  <div>
                    <div className="container  flex h-[50px] items-center justify-end ">
                      <select
                        className="rounded-md border p-1  font-semibold  text-slate-600 outline-0  "
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                      >
                        <option>Sort By</option>
                        <option value="price">Low-to-high-price</option>
                        <option value="-price">High-to-low-price</option>
                      </select>
                    </div>
                    <div className="Products">
                      {products.map((ele , i) =>  {
                                  return (
                                      <CardProduct key={ele._id} data={ele} />
                                  )
                        })}
                     
                    </div>
                  </div>
        </>
        
  )
}
