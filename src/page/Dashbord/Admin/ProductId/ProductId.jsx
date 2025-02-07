import { IoImageOutline } from "react-icons/io5";
import { IoImagesOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { GET_Categroy } from "../../../../rtk/slices/Categroy-slice";
import { Get_Product_By_Id } from "../../../../rtk/slices/Product-slice";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../../services/Api";
import Lodaing from "../../../../ui/Lodaing";

export default function ProductId() {
  const { id } = useParams();
  const { data: categroy , loading: categoryLoading } = useSelector((state) => state.categroy);
  const { data: products ,  loading: productLoading} = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navgiteTo = useNavigate()




  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [imageCover, setImageCover] = useState(null);
  const [state, setState] = useState({
    title: "",
    description: "",
    quantity: "",
    price: "",
  });

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);
  const [imageCoverShow, setImageCoverShow] = useState(null);

  const inputHandel = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageCoverChange = (e) => {
    const file = e.target.files[0];
    if( file ) {
      const imageUrl = URL.createObjectURL(file);
      setImageCover(file);
      setImageCoverShow(imageUrl);
    }
  };

  const imageHandle = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages([...images, ...files]);
      const imageUrls = files.map((file) => ({ url: URL.createObjectURL(file) }));
      setImageShow([...imageShow, ...imageUrls]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(Get_Product_By_Id(id));
        await dispatch(GET_Categroy());

        if (products && products.length > 0) {
          const product = products[0];
          setState(product);
          setCategoryId(product.category?._id);
          setSelected(product.category?.name);
          setImageCover(product.imageCover);
          setImageCoverShow(product.imageCover);
          setImages(product.images);
          setImageShow(product.images.map((img) => ({ url: img })));
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again!");
      }
    };

    fetchData();
  },[]);



  if (productLoading || categoryLoading) {
    return <div className='container mt-4 '><Lodaing/></div>  ;
  }

  const UpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true)

    const convertUrltoFile = async (url) => {
      const response = await fetch(url, { mode: "cors" }); 
      const data = await response.blob(); 
      const ext = url.split(".").pop(); 
      const metadata = { type: `image/${ext}` }; 
      const fileName = `image_${Date.now()}.${ext}`; 
      return new File([data], fileName, metadata);
    };

    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("description", state.description);
    formData.append("price", state.price);
    formData.append("quantity", state.quantity);


    if (!categoryId) {
      toast.error("Please select a category.");
      setLoading(false);
      return;
    }
    formData.append("category", categoryId);

    if (imageCover && typeof imageCover === "string" && imageCover.startsWith("http")) {
      const preparedImageCover = await convertUrltoFile(imageCover);
      formData.append("imageCover", preparedImageCover);
    } else if (imageCover) {
      formData.append("imageCover", imageCover);
    }

    let preparedImages = [];

    for (const img of products[0].images) {
      if (typeof img === "string" && img.startsWith("http")) {
        const preparedImage = await convertUrltoFile(img);
        preparedImages.push(preparedImage);
      }
    }

    preparedImages = [...preparedImages, ...images]; // دمج الصور القديمة مع الجديدة

    for (const image of preparedImages) {
      formData.append("images", image);
    }

  
    try {
      const token = localStorage.getItem("Token");
      await baseUrl.put(
        `api/v1/products/${id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
           
          },
        }
      );
      toast.success("Product updated successfully!");
      navgiteTo('/Dashbord/Admin/StoreHouse')
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update product."
      );
    } finally {
      setLoading(false);
    }
  };
  
  
  

  

  return (
    <section className="container pt-5 mb-5">
      <div className="w-full bg-white rounded-md p-2 shadow-md h-full">
        <form onSubmit={UpdateProduct}>
          <div className="flex w-full flex-row md:flex-col gap-10 md:text-xs">
            <div className="w-full">
              <div className="flex flex-col gap-2 m-2">
                <label htmlFor="title">Product Title</label>
                <input
                  type="text"
                  placeholder="Product Title ..."
                  required
                  name="title"
                  id="title"
                  className="bg-[#eee] rounded-md p-3"
                  value={state.title}
                  onChange={inputHandel}
                />
              </div>

              <div
                onClick={() => setOpen(!open)}
                className={`bg-[#eee] text-black mt-9 mb-2 m-2 p-3 ${
                  selected ? "text-black" : "text-[#eee]"
                } rounded-md flex justify-between items-center cursor-pointer`}
              >
                {selected ? selected : products[0].category?.name}
                <IoIosArrowDown />
              </div>
              <ul
                className={`bg-[#eee] m-2 rounded-md overflow-y-auto transition-all duration-500 ${
                  open ? "h-[100px]" : "h-0"
                }`}
              >
                {categroy.map((el) => (
                  <li
                    key={el._id}
                    onClick={() => {
                      setSelected(el.name);
                      setCategoryId(el._id);
                      setOpen(!open);
                    }}
                    className="text-black text-sm hover:bg-sky-600 hover:text-black p-3 rounded-md cursor-pointer"
                  >
                    {el.name}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2 m-2">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  required
                  name="description"
                  id="description"
                  placeholder="Description Product ..."
                  className="bg-[#eee] rounded-md p-3"
                  value={state.description}
                  onChange={inputHandel}
                />
              </div>

              <div className="flex flex-col gap-2 mt-7 p-2 m-2 cursor-pointer border-2 rounded-md border-[#ddd]">
                <label htmlFor="imageCover" className="flex justify-center items-center flex-col">
                  <span>Select Image Cover</span>
                  <IoImageOutline className="w-[100px] h-[100px] to-blue-500 cursor-pointer opacity-[0.9]" />
                </label>
                <input
                  type="file"
                  onChange={handleImageCoverChange}
                  name="imageCover"
                  id="imageCover"
                  className="hidden"
                  accept="image/*"
                />
              </div>

              <div className="flex flex-col gap-2 mt-7 p-2 m-2 cursor-pointer border-2 rounded-md border-[#ddd]">
                <label htmlFor="images" className="flex justify-center items-center flex-col">
                  <span>Select Images</span>
                  <IoImagesOutline className="w-[100px] h-[100px] to-blue-500 cursor-pointer opacity-[0.9]" />
                </label>
                <input
                  multiple
                  type="file"
                  onChange={imageHandle}
                  name="images"
                  id="images"
                  className="hidden"
                  accept="image/*"
                />
              </div>

              <div className="flex justify-center gap-3 flex-col">
                {imageCoverShow && (
                  <div className="w-[200px] h-[200px]">
                    <img src={imageCoverShow} alt="Cover Preview" className="w-[200px] h-[200px]" />
                  </div>
                )}
                {imageShow.map((img, i) => (
                  <div key={i} className="w-[200px] h-[200px]">
                    <img src={img.url} alt="Preview" className="w-[200px] h-[200px]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full">
              <div className="flex flex-col gap-2 m-2">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  placeholder="Quantity.."
                  required
                  name="quantity"
                  id="quantity"
                  className="bg-[#eee] rounded-md p-3"
                  value={state.quantity}
                  onChange={inputHandel}
                />
              </div>
              <div className="flex flex-col gap-2 m-2">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  placeholder="Price.."
                  required
                  name="price"
                  id="price"
                  className="bg-[#eee] rounded-md p-3"
                  value={state.price}
                  onChange={inputHandel}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-l mt-10 py-2 px-10 bg-sky-400 rounded-md md:mt-4"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}

          </button>
        </form>
      </div>
    </section>
  );
}
