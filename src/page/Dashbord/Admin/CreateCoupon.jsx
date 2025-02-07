
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import { useForm } from 'react-hook-form'
import toast from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";

import { FaRegEdit } from "react-icons/fa";

import { CREATE_COUPONS, DELETE_COUPON, GET_COUPONS } from "../../../rtk/slices/Coupon-slice";
import Lodaing from "../../../ui/Lodaing";


export default function CreateCoupon() {
  const {data , loader } = useSelector((state) => state.coupon)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);  

  const [state , setState] = useState({
    name : '',
    expire : '',
    discount : '',
  })

  const initialState = {
    name: '',
    expire: '',
    discount: '',

  };

  const inputHandel = (e) => {
    setState({
      ...state,
      [e.target.name] : e.target.value

    })
  }

  const handleDelete = async (id) => {
    try {
      await dispatch(DELETE_COUPON(id));
      toast.success("Product deleted successfully!"); 
    } catch (error) {
      toast.error("Failed to delete the product. Please try again.");
    }
  };

  useEffect(() => {
    dispatch(GET_COUPONS())

  },[dispatch])


  const CreateCoupon = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Validate inputs
    if (!state.name || !state.expire || !state.discount) {
      toast.error('All fields are required');
      setLoading(false);
      return;
    }

    // Validate date format
    const expireDate = new Date(state.expire);
    if (isNaN(expireDate.getTime())) {
      toast.error("Invalid expiry date. Please select a valid date.");
      setLoading(false);
      return;
    }
  
  
    const payload = {
      name: state.name,
      expire: expireDate.toISOString(),
      discount: state.discount,
    };
  
    dispatch(CREATE_COUPONS(payload))
      .unwrap()
      .then(() => {
        toast.success("Coupon created successfully");
        setState(initialState);
      })
      .catch((error) => {
        toast.error(error || "Error creating coupon");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

   if(loader) return <div className='container mt-4 '><Lodaing/></div>  


  return (
    <div className="container ">
      <h1 className=" mt-3 font-bold ">Coupon Management</h1>

      <div className="flex justify-center gap-4  md:flex-col  mb-5 ">
        <div className="p-3 mt-4 h-[400px]  border-spacing-2 rounded-md border border-[#eee] shadow-xl ">
          <h4 className="m-3 font-extralight">Create New Coupon</h4>
          <form onSubmit={CreateCoupon}>
            <div className="m-10 flex    flex-col justify-center  gap-10">
              <input
                type="text"
                name="name"
                placeholder="coupon name ...."
                id="name"
                className=" rounded-md border  p-2 outline-none"
                onChange={inputHandel}
                value={state.name}
              />
              <input
                type="number"
                name="discount"
                placeholder="100 $"
                id="discount"
                className=" rounded-md border  p-2 outline-none"
                onChange={inputHandel}
                value={state.discount}
              />

              <input
                type="date"
                name="expire"
                id="expire"
                className=" rounded-md border  p-2 outline-none"
                onChange={inputHandel}
                value={state.expire}
              />

              <button  type="submit" className="text-l rounded-md  bg-sky-500 p-2 text-white hover:bg-sky-700">
              {loading ? 'Creating...' : 'Create'}
              </button>

            </div>

          </form>
        </div>


        <div className="p-3 mt-4 overflow-auto  border-spacing-2 rounded-md border border-[#eee] shadow-xl">
          <h2 className="m-3 font-extralight">Existing Coupons</h2>
          <div className='responsive-table rounded-md bg-white ' >
          <table className="w-full text-base' ">
            <thead  >
              <tr >

                <td>Name</td>
                <td>Discount</td>
                <td>Expire</td>
                <td>Actions</td>

              </tr>
            </thead>

            <tbody>
              {data.map((el) => {
                return (
                  <tr key={el._id}>
                    <td>{el.name}</td>
                    <td>{el.discount} $ </td>
                    <td>
                      {el.expire && !isNaN(new Date(el.expire).getTime())
                        ? new Intl.DateTimeFormat('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          }).format(new Date(el.expire))
                        : "Invalid Date"}
                    </td>
                    <td >
                    <span className="flex justify-evenly flex-row ">
                    <RiDeleteBin5Line className="text-red-500" onClick={() => handleDelete(el._id)} />

                    <Link to={el._id} >
                      <FaRegEdit   className="text-blue-600"/>
                    </Link>

                    </span>                      
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
         
        </div>
      </div>
    </div>
  );
}
