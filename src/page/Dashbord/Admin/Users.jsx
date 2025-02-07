import { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux'

import  '../../../index.css'
import { MdDelete } from "react-icons/md";
import AddUser from '../../../components/dashboard/Admin/AddUser';
import toast from "react-hot-toast";
import { GET_USERS } from '../../../rtk/slices/User-slice';
import Lodaing from '../../../ui/Lodaing';


export default function Users() {

  const {data, loader}    = useSelector((state) => state.user)

  const dispatch  = useDispatch()

  useEffect(() => {
    const fatchData = async () => {
      try {
        dispatch(GET_USERS());
    } catch (error) {
      <div className='containers mt-4 '><Lodaing/></div> 
      toast.error("somthing is error try again!")
    }

    }

    fatchData()

  },[dispatch])


 if(loader) return <div className='containers mt-4 '><Lodaing/></div>  














  
  return (
    <div className='container mt-4  '>
      <div > 
          <AddUser/>  


        <div className='responsive-table rounded-md bg-white' >
        <table className='w-full text-base'>
            <thead>
            <tr>
              
              <td>Name</td>
              <td>email</td>
              <td>role</td>
              <td>status</td>
              <td>opertion</td>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => {
              return (
                <tr key={el.id}>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.role}</td>
                <td>{el.active ? "active" : "deactive" }</td>
                <td className='' >
                  {el.role === "admin" ? null :  <MdDelete className='text-red-400 '/>}
                </td>
              </tr>

              )
            })} 
          </tbody>
        </table>




        </div>

      </div>
    </div>
  )
}
