
import SearchBar from "../../components/home/SearchBar";
import Slider from "../../components/home/Slider";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Get_AllProduct_WithSearch, Get_Product } from "../../rtk/slices/Product-slice";
import toast from "react-hot-toast";
import CardProduct from "../../components/home/products/CardProduct";
import { GET_Categroy } from "../../rtk/slices/Categroy-slice";



export default function Shop() {

  const { data } = useSelector((state) => state.categroy);
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('');
  const { data : products  } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(Get_Product());
        await dispatch(GET_Categroy());
      } catch (error) {
        toast.error("Something went wrong, please try again!");
      }
    };

    fetchData();
  }, [dispatch]);

  const queryCategory = (e, categoryId) => {
    setCategory(e.target.checked ? categoryId : '');
  };

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
      <div className="container grid grid-cols-[20%_80%] gap-1   md:block">
      <div className='flex  gap-1 flex-col '>
      <h2 className='mb-2 font-bold mt-4' >Categroy</h2>
        {data.map((ele , i) => {
            return (
                <div key={i} className='flex gap-1 font-light'>
                <input 
                checked={category === ele._id}
                onChange={(e) => queryCategory(e, ele._id)}
                type="checkbox"
                id={ele._id}/>
                <label htmlFor={ele.name} >{ele.name}</label>
                </div>
            )

        })}
    </div>
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
      </div>
    </>
  );
}
