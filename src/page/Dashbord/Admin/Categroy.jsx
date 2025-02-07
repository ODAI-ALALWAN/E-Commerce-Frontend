import React, {  useEffect, useState } from 'react';

import { Link, useNavigate } from "react-router-dom";
import { IoImageOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Lodaing from '../../../ui/Lodaing';
import { Add_Categroy, Delete_Categroy, GET_Categroy } from "../../../rtk/slices/Categroy-slice";
import { FaRegEdit } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import DeleteBtn from '../../../ui/DeleteBtn';
import Modal from "../../../ui/Model";



export default function Category() {

  const { data, loader } = useSelector((state) => state.categroy);
  const [state, setState] = useState({ name: '' });
  const [imageCoverShow, setImageCoverShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const navgiteTo = useNavigate()


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_Categroy());
  }, [dispatch]);


  const inputHandel = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const handleImageCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageCoverShow(URL.createObjectURL(file));
    }
  };

  const AddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', state.name);
    formData.append('image', image);

    dispatch(Add_Categroy(formData))
      .unwrap()
      .then(() => {
        toast.success('Category added successfully');
        setState({ name: '' });
        setImageCoverShow(null);
        navgiteTo('/Dashbord/Admin/Categroy')
      })
      .catch(() => toast.error('Error adding category'))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(Delete_Categroy(id));
      toast.success("Product deleted successfully!");
    
    } catch (error) {
      toast.error("Failed to delete the product. Please try again.");
    }
  };




 

  if (loader) return <div className='containers mt-4'><Lodaing /></div>;

  return (
      <Modal>
      <section className='container pt-5 mb-5'>
        <div className="w-[50%] md:w-[100%] bg-white rounded-md p-2 shadow-md h-full">
          <form onSubmit={AddCategory}>
            {/* Input Fields */}
            <div className="flex flex-col gap-2 m-2">
              <label htmlFor="name">Category Title</label>
              <input
                type="text"
                name="name"
                placeholder="Category..."
                className="bg-[#eee] rounded-md p-2"
                value={state.name}
                onChange={inputHandel}
                required
              />
            </div>

            {/* Image Input */}
            <div className="flex flex-col gap-2 mt-7 p-2 cursor-pointer border-2 rounded-md border-black">
              <label htmlFor="image" className="flex justify-center items-center flex-col">
                Select Image
                <IoImageOutline className="w-[100px] h-[100px] opacity-90" />
              </label>
              <input type="file" name="image" id="image" className="hidden" onChange={handleImageCoverChange} required />
            </div>

            {/* Submit Button */}
            <button type="submit" className="text-l mt-10 py-2 px-10 bg-sky-400 rounded-md" disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </button>
          </form>
        </div>

        {imageCoverShow && (
                        <div className="relative w-[200px] h-[200px] mt-10">
                          <img src={imageCoverShow} alt="Cover Preview" className="w-full h-full object-cover" />
                          <button
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                            onClick={() => {
                              setImageCoverShow(null)
                              setImage(null)
                            }}
                          >
                            <IoMdCloseCircleOutline/>
                          </button>
                        </div>
                      )}

        {/* Table */}
        <div className='responsive-table-Product rounded-md bg-white mt-10'>
          <table className='w-full text-base'>
            <thead>
              <tr>
                <td>Name</td>
                <td>Image</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {data.map((el) => (
                <tr key={el._id}>
                  <td>{el.name}</td>
                  <td ><img src={el.image} alt="Category" className={`w-[60px]`} /></td>
                  <td >
                  <span className="flex justify-evenly flex-row ">
                    

                    <DeleteBtn
                        resource={el.title}
                        onConfirm={() => handleDelete(el._id)}
                    />

                    <Link to={el._id} >
                        <FaRegEdit   className="text-blue-600"/>
                    </Link>

                  </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>
      </Modal>

  );
}
