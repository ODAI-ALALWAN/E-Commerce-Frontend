
import { IoImageOutline } from "react-icons/io5";
import { IoImagesOutline } from "react-icons/io5";


import toast from "react-hot-toast";
import {  useEffect, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { GET_Categroy } from "../../../rtk/slices/Categroy-slice";
import { Add_Product } from "../../../rtk/slices/Product-slice";


export default function AddProducts() {

  const { data }    = useSelector((state) => state.categroy)


  const dispatch  = useDispatch()
  const [open , setOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [selected , setSelected] = useState("")
  const [categoryId, setCategoryId] = useState(null);
  const [imageCover, setimageCover] = useState(null);


 

  const [state , setState] = useState({
    title : '',
    description : '',
    quantity : '',
    price : '',
  })

  

  const inputHandel = (e) => {
    setState({
      ...state,
      [e.target.name] : e.target.value

    })
  }


  const [images , setImages] = useState([])
  const [imageShow , setImageShow] = useState([])
  const [imageCoverShow , setimageCoverShow] = useState(null)



  const handleImageCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setimageCover(file);
      setimageCoverShow(imageUrl);
    }
  };
  

  

  const imageHandle = (e) => {
    const files = e.target.files
    const length = files.length
    if(length > 0){
      setImages([...images , ...files])
      let imageUrl = []
      for(let i = 0 ; i < length; i++){
        imageUrl.push({url : URL.createObjectURL(files[i])})
      }
      setImageShow([...imageShow, ...imageUrl])
    }
  }



  useEffect(() => {
    const fatchData = async () => {
      try {
        dispatch(GET_Categroy());
    } catch (error) {
      
      toast.error("somthing is error try again!")
    }

    }

    fatchData()

  },[dispatch])

  const initialState = {
    title: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    imageCover: null,
    images: [],
  };


  const AddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading
  
    const formData = new FormData();
    formData.append('title', state.title);
    formData.append('description', state.description);
    formData.append('price', state.price);
    formData.append('quantity', state.quantity);
    formData.append('category', categoryId);
    formData.append('imageCover', imageCover);
  
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    
    dispatch(Add_Product(formData))
    .unwrap() 
    .then(() => {
      toast.success('Product added successfully');
      setState(initialState)
      setSelected(null)
      setImageShow([])
      setimageCoverShow(null)
    })
    .catch((error) => {
      toast.error(error || 'Error adding product');
    })
    .finally(() => {
      setLoading(false); 
    });
  };



  return (
      <section className='container pt-5 mb-5 ' >
        <div className="w-full bg-white rounded-md p-2  shadow-md h-full">
          
            <form onSubmit={AddProduct}>
              <div className="flex w-full flex-row md:flex-col gap-10  md:text-xs" >


              <div className="w-full " >
                    <div className="flex flex-col gap-2 m-2 " >
                      <label htmlFor="title" >Product Title</label>
                      <input type="text" placeholder="Product Title ..." required name="title" id="title" className="bg-[#eee] rounded-md  p-3 "  value={state.title} onChange={inputHandel}     />
                    </div>
                    


                    <div onClick={() => setOpen(!open)}  className={`bg-[#eee] text-black  mt-9 mb-2 m-2 p-3 ${selected ? "text-black" : "text-[#eee]]"} rounded-md flex justify-between items-center cursor-pointer  `} >
                      {selected ? selected :  "Select Categroy"}
                      <IoIosArrowDown />
                    </div>
                    <ul className={` bg-[#eee]  m-2  rounded-md overflow-y-auto transition-all  duration-500 ${open ? ' h-[100px]' : ' h-0 ' }  `}>
                    {data.map((el) => {
                      return (
                        <li
                        key={el._id} 
                        onClick={() => {
                          setSelected(el.name);
                          setCategoryId(el._id)
                          setOpen(!open);
                        }}
                  
                          className="text-black text-sm hover:bg-sky-600 hover:text-black p-3 rounded-md cursor-pointer" >{el.name}</li>
                        )
                      })}
                 
                    </ul>

                    <div className="flex flex-col gap-2 m-2 " >
                      <label htmlFor="description" >Description</label>
                      <textarea type="text" required name="description" id="description" placeholder="Description Product ..."  className="bg-[#eee]  rounded-md p-3 "  value={state.description} onChange={inputHandel}  />
                    </div>

                    <div className="flex flex-col gap-2 mt-7 p-2 m-2  cursor-pointer border-2 rounded-md border-[#ddd] " >
                      <label htmlFor="imageCover" className="flex justify-center items-center flex-col" >
                      <span  > Slecet Image Cover </span>
                      <IoImageOutline className="w-[100px]  h-[100px] to-blue-500  cursor-pointer  opacity-[0.9] "/> 
                      </label>
                      <input type="file"  onChange={handleImageCoverChange} required name="imageCover" id="imageCover" className="bg-[#eee]  rounded-md p-1 hidden "  accept='image/*'    />
                    </div>

                    <div className="flex flex-col gap-2 mt-7 p-2 m-2  cursor-pointer border-2 rounded-md border-[#ddd] " >
                      <label htmlFor="images" className="flex justify-center items-center flex-col" >
                      <span  > Slecet Images</span>
                      <IoImagesOutline className="w-[100px]  h-[100px] to-blue-500  cursor-pointer  opacity-[0.9] "/> 
                      </label>
                      <input multiple type="file" onChange={imageHandle}  required name="images" id="images" className="bg-[#eee]  rounded-md p-1 hidden "  accept='image/*'    />
                    </div>

                    <div className="flex justify-center gap-3 flex-col  ">
                    {imageCoverShow &&  <div  className="w-[200px] h-[200px]  " >
                          <label htmlFor={imageCoverShow}>
                            <img src={imageCoverShow} alt=""  className="w-[200px] h-[200px]" />
                          </label>
                      </div> }
                   {imageShow.map((img,i) => {
                    return(
                      <div key={i} className="w-[200px] h-[200px]  " >
                          <label htmlFor={i}>
                            <img src={img.url} alt=""  className="w-[200px] h-[200px]" />
                          </label>
                      </div>
                    )
                   })}
                    
                      
                
                    </div>

                </div>






            
                <div className="w-full">
                  <div className="flex flex-col gap-2 m-2 " >
                    <label htmlFor="quantity" >Quantity</label>
                    <input type="number" placeholder="Quantity.." required name="quantity" id="quantity" className=" bg-[#eee] rounded-md  p-3 " value={state.quantity}   onChange={inputHandel}   />
                  </div>
                  <div className="flex flex-col gap-2 m-2 " >
                    <label htmlFor="price" >Price</label>
                    <input type="number" placeholder="Price.." required name="price" id="price" className="bg-[#eee]  rounded-md  p-3 "  value={state.price} onChange={inputHandel} />
                  </div>

                </div>
          
              </div>
              <button type='submit' className="text-l mt-10 py-2 px-10 bg-sky-400 rounded-md md:mt-4 " disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
              </button>
            </form>
        </div>
        

      </section>
       
  )
}
