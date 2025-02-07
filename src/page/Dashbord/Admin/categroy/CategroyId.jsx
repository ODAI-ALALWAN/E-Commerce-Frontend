import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoImageOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Get_Categroy_By_Id } from "../../../../rtk/slices/Categroy-slice";
import { useNavigate, useParams } from "react-router-dom";
import Lodaing from "../../../../ui/Lodaing";
import { baseUrl } from "../../../../services/Api";
import { IoMdCloseCircleOutline } from "react-icons/io";


export default function CategroyId() {
    const { id } = useParams()
    const { data : categroes , loader } = useSelector((state) => state.categroy);
    const [state, setState] = useState({ name: ''});
    const [imageCoverShow, setImageCoverShow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();
    const navgiteTo = useNavigate()


  
    const inputHandel = (e) => {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
      };
  
    const handleImageCoverChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        setImageCoverShow(URL.createObjectURL(file));
      }
    };




    useEffect(() => {
        const fetchData = async () => {
        try {
        await dispatch(Get_Categroy_By_Id(id));
            if (categroes && categroes.length > 0) {
            const categroy = categroes[0];
            setState(categroy);
            setImageCoverShow(categroy.image)
        
        }
        }catch (error) {
        toast.error("Something went wrong. Please try again!");
        }
        
        }
         fetchData()
    },[]);
  

  
    const UpdateCategory = async (e) => {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      formData.append('name', state.name);


      const convertUrltoFile = async (url) => {
        const response = await fetch(url, { mode: "cors" }); 
        const data = await response.blob(); 
        const ext = url.split(".").pop(); 
        const metadata = { type: `image/${ext}` }; 
        const fileName = `image_${Date.now()}.${ext}`; 
        return new File([data], fileName, metadata);
      };

      if (image && typeof image === "string" && image.startsWith("http")) {
        const preparedImage = await convertUrltoFile(image);
        formData.append("image", preparedImage);
      } else if (image) {
        formData.append("image", image);
      }

      try {
        const token = localStorage.getItem("Token");
        await baseUrl.put(
          `api/v1/categories/${id}`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
             
            },
          }
        );
        toast.success("Product updated successfully!");
        navgiteTo('/Dashbord/Admin/Categroy')
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to update product."
        );
      } finally {
        setLoading(false);
      }
    };
  


  
  
   
  
    if (loader) return <div className='containers mt-4'><Lodaing /></div>;


  return (
    <section className='container pt-5 mb-5'>
    <div className="w-[50%] md:w-[100%] bg-white rounded-md p-2 shadow-md h-full ">
              <form onSubmit={UpdateCategory} >
               
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
                  <input type="file" name="image" id="image" className="hidden" onChange={handleImageCoverChange} />
                </div>
    
                {/* Submit Button */}
                <button type="submit" className="text-l mt-10 py-2 px-10 bg-sky-400 rounded-md" disabled={loading}>
                  {loading ? 'Updating...' : 'Update'}
                </button>
              </form>



        </div>


                {/* Image Preview */}
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
        </section>
  )
}
