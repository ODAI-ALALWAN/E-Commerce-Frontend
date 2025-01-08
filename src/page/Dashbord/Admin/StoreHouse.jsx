
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import Lodaing from "../../../ui/Lodaing";
import { Delete_Product, Get_Product } from "../../../rtk/slices/Product-slice";
import ConfirmDelete from '../../../ui/ConfirmDelete'


export default function StoreHouse() {

  const {data , loader}    = useSelector((state) => state.products)
  const dispatch  = useDispatch()



  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(Get_Product());
      } catch (error) {
        <div className='container mt-4 '><Lodaing/></div> 
        toast.error("Something went wrong, please try again!");
      }
    };

    fetchData();
  }, [dispatch]);


  const handleDelete = async () => {
    try {
      await dispatch(Delete_Product(productToDelete));
      toast.success("Product deleted successfully!");
      setShowDeleteModal(false); // Close the modal after successful delete
    } catch (error) {
      toast.error("Failed to delete the product. Please try again.");
    }
  };

  const handleOpenDeleteModal = (productId) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };




 if(loader) return <div className='container mt-4 '><Lodaing/></div>  


  return (
    <div className='container mt-4 mb-10 '>

    <div className='responsive-table-Product rounded-md bg-white ' >
    <table className='w-full text-base' >
        <thead>
          <tr >
            
           
            <td>Title</td>
            <td>Quntity</td>
            <td>Sold</td>
            <td>Price</td>
            {/* <td>Category</td> */}
            <td>Image</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
         {data && data.length > 0 &&  data.map((el) => {
                return(
                <tr key={el._id}>
                  
                  <td>{el.title} </td>
                  <td>{el.quantity}</td>
                  <td>{el.sold}</td>
                  <td>{el.price}</td>
                  {/* <td>{el.category.name}</td> */}
                  <td>
                  <img src={el.imageCover} alt="Product Cover" className="w-[60px] " />
                  </td> 
                  <td className='text-md'  >
                    <span className="flex justify-evenly flex-row ">
                    <RiDeleteBin5Line className="text-red-500" onClick={() => handleOpenDeleteModal(el._id)} />
                    <FaRegEdit className="text-blue-600"/>
                    </span>
                
                  </td>
              </tr> 
                
                )
            })} 
            
        </tbody>

    </table>



    </div>
          {showDeleteModal && (
              <ConfirmDelete
                resource="product"
                onConfirm={handleDelete}
                onCloseModal={handleCloseDeleteModal}
              />
            )}



    </div>
    
  )
}




