import { useDispatch, useSelector } from "react-redux"
//import  user from "../../../assets/default-user.jpg"
import { Link } from "react-router-dom"
import toast from "react-hot-toast";
import { format } from 'date-fns';
import { useEffect } from "react"
import Lodaing from "../../../ui/Lodaing"
import { GET_All_Order } from "../../../rtk/slices/OrderAdmin-slice";

export default function Orders(){

  const {data, loader} = useSelector((state) => state.adminOrder)

  const dispatch  = useDispatch()

  useEffect(() => {
    const fatchData = async () => {
      try {
        await dispatch(GET_All_Order());
    } catch (error) {
      <div className='container mt-4 '><Lodaing/></div> 
      toast.error("somthing is error try again!")
    }
    }
    fatchData()
  
  },[dispatch])


  if(loader) return <div className='containers mt-4 '><Lodaing/></div>  



  return (
    <div className='container mt-6 rounded-md bg-white'>
      <h2 className=" font-bold mb-3 pt-3 " >Recent Orders</h2>
      <div className='responsive-table-orders rounded-md bg-white'>
      <table className='w-full text-base' >
      <thead>
          <tr >
            <td></td>
            <td>Num order</td>
            <td>Customer</td>
            <td>Email</td>
            <td>Payment</td>
            <td>Delivere</td>
            <td>Invoice</td>
            <td>Total order</td>
            <td>Date</td>
            <td></td>

          </tr>
        </thead>
      <tbody>
      {data && data.length > 0 &&  data.map((el , i ) => {
        return(
          <tr key={el._id}>
            <td></td>
            <td>
            # {i + 1}
            </td>
            <td > 
            {el.user.name}
           </td>
           <td className="text-gray-500">
           {el.user.email}
           </td>
           <td className="text-green-500" >
           {el.paymentMethodType} 
           </td>
           <td>
           {el.isDelivered ?  "confirm" : "padding" } 
           </td>
           <td  >
           <Link to={'invo'} className="text-blue-600"  >
            view invoice
           </Link>
           </td>
           <td>
           {el.totalOrderPrice} $
           </td>
           <td className="">  
           {format(new Date(el.createdAt), 'MM/dd/yyyy HH:mm:ss')}
            </td>
            <td></td>
        </tr>
        )

      })}
       
      </tbody>
      </table>

      </div>

    </div>
  )
}

