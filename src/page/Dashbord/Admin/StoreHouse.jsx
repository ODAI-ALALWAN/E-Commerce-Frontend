import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import Lodaing from "../../../ui/Lodaing";
import { Delete_Product, Get_Product } from "../../../rtk/slices/Product-slice";
import DeleteBtn from "../../../ui/DeleteBtn";
import Modal from "../../../ui/Model";

export default function StoreHouse() {
  const { data, loader } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(Get_Product());
      } catch (error) {
        toast.error("Something went wrong, please try again!");
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(Delete_Product(id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product.");
    }
  };

  if (loader) return <div className="container mt-4"><Lodaing /></div>;

  return (
    <Modal>
      <div className="container mt-4 mb-10">
        <div className="responsive-table-Product rounded-md bg-white">
          <table className="w-full text-base">
            <thead>
              <tr>
                <td>Title</td>
                <td>Quantity</td>
                <td>Sold</td>
                <td>Price</td>
                <td>Category</td>
                <td>Image</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 && data.map((el) => (
                <tr key={el._id}>
                  <td>{el.title}</td>
                  <td>{el.quantity}</td>
                  <td>{el.sold}</td>
                  <td>{el.price}</td>
                  <td>{el.category?.name}</td>
                  <td className=" h-[100px] " >
                    <img src={el.imageCover} alt="Product Cover" className="p-1 w-[100%] h-[100%] object-cover " />
                  </td>
                  <td className="text-md">
                    <span className="flex justify-evenly flex-row gap-5">
                      <DeleteBtn
                        resource={el.title}
                        onConfirm={() => handleDelete(el._id)}
                      />
                      <Link to={el._id}>
                        <FaRegEdit className="text-blue-600" />
                      </Link>
                      <Link to={el._id}>
                        <TfiLayoutSliderAlt className="text-blue-600" />
                      </Link>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}

