import React, {  useEffect, useState } from 'react';
//import { FaRegEdit } from 'react-icons/fa';

import { IoImageOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin5Line } from 'react-icons/ri';

import toast from 'react-hot-toast';
import Lodaing from '../../../ui/Lodaing';
import { Add_Categroy, Delete_Categroy, GET_Categroy } from "../../../rtk/slices/Categroy-slice";
import ConfirmDelete from '../../../ui/ConfirmDelete';
import Modal from '../../../ui/Model';


export default function Category() {

  const { data, loader } = useSelector((state) => state.categroy);
  const [state, setState] = useState({ name: '' });
  const [imageCoverShow, setImageCoverShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_Categroy());
  }, [dispatch]);

  const handleColorChange = (e) => setColor(e.target.value);

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
    formData.append('color', color);
    formData.append('image', image);

    dispatch(Add_Categroy(formData))
      .unwrap()
      .then(() => {
        toast.success('Category added successfully');
        setState({ name: '' });
        setImageCoverShow(null);
        setColor("#ffffff");
      })
      .catch(() => toast.error('Error adding category'))
      .finally(() => setLoading(false));
  };

  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    dispatch(Delete_Categroy(deleteId))
      .unwrap()
      .then(() => toast.success('Category deleted successfully'))
      .catch(() => toast.error('Error deleting category'));
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

            {/* Color Picker */}
            <div className="flex flex-col gap-4 m-4">
              <label htmlFor="colorPicker">Background Color:</label>
              <input type="color" value={color} onChange={handleColorChange} className="w-12 h-12 cursor-pointer" />
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

        {/* Image Preview */}
        {imageCoverShow && (
          <div className='w-[200px] h-[200px] mt-4'>
            <img src={imageCoverShow} alt="" className='w-[200px] h-[200px] rounded-md' />
          </div>
        )}

        {/* Table */}
        <div className='responsive-table-Product rounded-md bg-white mt-10'>
          <table className='w-full text-base'>
            <thead>
              <tr>
                <td>Name</td>
                <td>Image</td>
                <td>Color</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {data.map((el) => (
                <tr key={el._id}>
                  <td>{el.name}</td>
                  <td><img src={el.image} alt="Category" className="w-[60px]" /></td>
                  <td>{el.color}</td>
                  <td>
                    <button onClick={() => setDeleteId(el._id)}>
                        <RiDeleteBin5Line className="text-red-500" />

                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        <Modal.Window name="deleteModal">
          <div className="">
          <ConfirmDelete
                resource="categroy"
                onConfirm={handleDelete}
                // onCloseModal={close} 
              />
            
           
          </div>
        </Modal.Window>
      </section>
    </Modal>
  );
}
