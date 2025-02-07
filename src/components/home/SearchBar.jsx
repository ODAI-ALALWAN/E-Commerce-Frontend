
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Get_AllProduct_WithSearch } from "../../rtk/slices/Product-slice";
import toast from "react-hot-toast";
import { GET_Categroy } from "../../rtk/slices/Categroy-slice";

export default function SearchBar() {
  const [query, setQuery] = useState(''); 

  const dispatch = useDispatch();



  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(GET_Categroy());
      } catch (error) {
        toast.error("Something went wrong, please try again!");
      }
    };

    fetchData();
  }, [dispatch]);


 useEffect(() => {
  const controller = new AbortController()
  async function fetchData() {
      try {
          dispatch(Get_AllProduct_WithSearch({ keyword: query }));
      } catch (error) {
        toast.error("Something went wrong, please try again!");
      } 
  }
  fetchData();
  return function (){
      controller.abort()
  }
  }, [dispatch, query]);














  
  return (
    <div className=" container  w-[85%]  lg:w-[90%] mx-auto ">
        <div className="w-8/12  sm:w-full  m-2 ">
          <div className="flex justify-center items-center ">
            <input placeholder="what are you looking ? :) " type="search" className="border w-8/12  sm:w-full  sm:mb-2  py-1 px-2 rounded-md text-black outline-none "  value={query} onChange={(e) => setQuery(e.target.value)} />  
        </div>
      </div>
    </div>
  
  )
}
