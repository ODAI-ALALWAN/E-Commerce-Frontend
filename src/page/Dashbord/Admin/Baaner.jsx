import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowDown, IoMdCloseCircleOutline } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Add_Banner, Delete_Banner, GET_Banner } from "../../../rtk/slices/Banner";
import Lodaing from "../../../ui/Lodaing";
import { Get_Product } from "../../../rtk/slices/Product-slice";



export default function Baaner() {
    const { data, loader } = useSelector((state) => state.products);
    const { data : bannerDate , loader : bannerLoader } = useSelector((state) => state.banner);
    const [imageCoverShow, setImageCoverShow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [selected , setSelected] = useState("")
    const [productId, setProductId] = useState(null);
    const [open , setOpen] = useState(false)
  
    const dispatch = useDispatch();
  

      useEffect(() => {
        const fatchData = async () => {
          try {
            dispatch(Get_Product())
            dispatch(GET_Banner())
        } catch (error) {
          
          toast.error("somthing is error try again!")
        }
    
        }
        fatchData()
      },[dispatch]);
    
    
    const handleImageCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImage(file);
          setImageCoverShow(URL.createObjectURL(file));
        }
      };



      const handleDelete = async (bannerId) => {
        try {
          await dispatch(Delete_Banner(bannerId));
          toast.success("Product deleted successfully!");
        } catch (error) {
          toast.error("Failed to delete the product. Please try again.");
        }
      };  






    
    const AddBanner = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('image', image);

    dispatch(Add_Banner(formData))
        .unwrap()
        .then(() => {
        toast.success('Category added successfully');
        setProductId(null);
        setImageCoverShow(null);
        setSelected("")
        })
        .catch(() => toast.error('Error adding banner'))
        .finally(() => setLoading(false));
    };





  if (loader || bannerLoader ) return <div className='containers mt-4'><Lodaing /></div>;

  return (
    <section className='container pt-5 mb-5'>
        <div className="w-[50%] md:w-[100%] bg-white rounded-md p-2 shadow-md h-full">
           
            <form onSubmit={AddBanner} >
            {/* Image Input */}
                        <div className="flex flex-col gap-2 mt-7 p-2 cursor-pointer border-2 rounded-md border-black">
                          <label htmlFor="image" className="flex justify-center items-center flex-col">
                            Select Image
                            <IoImageOutline className="w-[100px] h-[100px] opacity-90" />
                          </label>
                          <input type="file" name="image" id="image" className="hidden" onChange={handleImageCoverChange} required />
                        </div>



              <div onClick={() => setOpen(!open)}  className={`bg-[#eee] text-black  mt-9 mb-2 m-2 p-3 ${selected ? "text-black" : "text-[#eee]]"} rounded-md flex justify-between items-center cursor-pointer  `} >
                {selected ? selected :  "Select Product"}
                <IoIosArrowDown />
              </div>
              <ul className={` bg-[#eee]  m-2  rounded-md overflow-y-auto transition-all  duration-500 ${open ? ' h-[100px]' : ' h-0 ' }  `}>
              {data.map((el) => {
                return (
                  <li
                  key={el._id} 
                  onClick={() => {
                    setSelected(el.title);
                    setProductId(el._id)
                    setOpen(!open);
                  }}
                    className="text-black text-sm hover:bg-sky-600 hover:text-black p-3 rounded-md cursor-pointer border-b-4 border" >{el.title}</li>
                  )
                })}
            
              </ul>
   
            {/* Submit Button */}
            <button type="submit" className="text-l mt-10 py-2 px-10 bg-sky-400 rounded-md" disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </button>

            </form>

            {imageCoverShow && (
                            <div className="relative w-full md:w-full md:mx-auto h-[200px] mt-10">
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
        </div>

        {bannerDate && bannerDate.length > 0 &&  bannerDate.map((el) => {
          return(

            <div className="relative w-full md:w-full md:mx-auto h-[310px] mt-10" key={el._id}>
              <img src={el.image} alt="Cover Preview" className="w-full h-full object-cover" />
              <IoMdCloseCircleOutline className=" bg-[red] rounded-md  absolute top-4 left-4 text-2xl text-white cursor-pointer " onClick={() => handleDelete(el._id)} />  
            </div>


          )

        })}
    </section>
  )
}
