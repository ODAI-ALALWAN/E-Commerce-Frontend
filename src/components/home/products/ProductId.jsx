// import Carousel from 'react-multi-carousel'
// import {  useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { FaHeart, FaStar } from 'react-icons/fa'
// import { CiStar  } from 'react-icons/ci'
// import { FaCartArrowDown } from "react-icons/fa";
// import ReviewProduct from './ReviewProduct'
// import { useParams } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import Lodaing from '../../../ui/Lodaing'
// import { Get_Product_By_Id } from '../../../rtk/slices/Product-slice'



// export default function ProductId() {
//     const { id } = useParams()

//     const { data  , loader} = useSelector((state) => state.products)


    

//     const [image , setImage] = useState('')
    
//     const dispatch = useDispatch()


//     useEffect (() => { 
//         const fetchData = async () => {
//         try {
//             await dispatch(Get_Product_By_Id(id));
//         }catch {
//             toast.error("Something went wrong. Please try again!");
//         }
//         }   ;
//         fetchData()
//     },[dispatch,id])

//     useEffect(() => {
//         if (data.length > 0) {
//             setImage(data[0].imageCover)
//         }
//     }, [data]) 

//     const responsive = {
//         superLargeDesktop: {
//             breakpoint: { max: 4000, min: 3000 },
//             items: 4
//         },
//         desktop: {
//             breakpoint: { max: 3000, min: 1024 },
//             items: 4
//         },
//         tablet: {
//             breakpoint: { max: 1024, min: 464 },
//             items: 4
//         },
//         mobile: {
//             breakpoint: { max: 564, min: 0 },
//             items: 4
//         },
//         xsmobile: {
//           breakpoint: { max: 376, min: 0 },
//           items: 3
//       },
//       }


    
//     if (loader) return <div className='container mt-4 '><Lodaing/></div>
        


//     return(


//         <section className='container'>

//             {data.map((el) => {
//                 return (



//                     <div className='grid grid-cols-[450px_450px] md:grid-cols-1 gap-9 md:gap-0  justify-center '  key={el._id} >

                

//             <div className='p-5'>

                        

//                 <div className='border w-fit'>
//                     <img src={image || el.imageCover } alt='' className='h-[400px] md:h-[250px]  p-2' />
//                 </div>

//                 <div className='w-[400px] md:h-fullu'>
//                 {el.images && 
//                 <Carousel 
//                 autoPlay={true}
//                 infinite={true}
//                 arrows={true}
//                 draggable={true}
//                 responsive={responsive}
//                 transitionDuration={1000}
//                 removeArrowOnDeviceType={["mobile" ,'xsmobile']}>
//                 {
//                 el.images.map((ele , i) => {
//                         return(
//                             <div key={i} onClick={() => setImage(ele)} className='cursor-pointer' >
//                                 <img src={ele} alt='' className='border m-2' />
//                             </div>
//                         )
//                     })
//                 }
//                 </Carousel>  
//                 }
//                 </div>
//                 </div>

//                 <div className='p-5 '>
//                     <h2 className='font-bold'>{el.title}</h2>
//                     <div className='flex justify-start items-center gap-5'>
//                     <div className='flex items-center font-extralight  text-xl my-3'>
//                         <FaStar className='text-[#b6eb43]' />
//                         <FaStar className='text-[#b6eb43]' />
//                         <FaStar className='text-[#b6eb43]' />
//                         <FaStar className='text-[#b6eb43]' />
//                         <CiStar/>
//                     </div>
//                     <span className=' font-extralight'>( {el.ratingsQuantity} reviews )</span>
//                     </div>
                
//                     <p className='leading-8 font-light' > {el.description}</p>
//                     <div>
//                         <h6 className=' font-medium text-blue-500 my-4'> {el.price} $  </h6>
//                         <div className='flex justify-between w-[200px]'>
//                         <button className='bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 flex justify-center items-center gap-2'><span>Add To Card </span><FaCartArrowDown/></button>
//                         <button className='bg-blue-500 hover:bg-blue-600 text-white text-xl rounded-md px-3'><FaHeart/></button>
//                         </div>
                        
//                     </div>
//                 </div>

//                 </div>

//                 )
//             })}
            

                 

//                 <ReviewProduct/>  


//                 </section>

//             )
// }

import Carousel from "react-multi-carousel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaStar, FaCartArrowDown } from "react-icons/fa";
import ReviewProduct from "./ReviewProduct";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Lodaing from "../../../ui/Lodaing";
import { Get_Product_By_Id } from "../../../rtk/slices/Product-slice";
import { Add_ToCart, GETLogged_User_ProductCart } from "../../../rtk/slices/Cart-slice";
import { Add_ToWishList, GETLogged_User_Wishlist, Remove_Item_From_WishList } from "../../../rtk/slices/WishList-slice";
import { FcLike } from "react-icons/fc";

export default function ProductId() {
  const { id } = useParams();
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data, loader } = useSelector((state) => state.products);
 
  const cart = useSelector((state) => state.cart.data);

  const [image, setImage] = useState("");

  const wishlist = useSelector((state) => state.wishList);
















  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(Get_Product_By_Id(id));
   
      } catch {
        toast.error("Something went wrong. Please try again!");
      }
    };
    fetchData();
  
    dispatch(GETLogged_User_ProductCart());
  }, [dispatch, id]);

  useEffect(() => {
    if (data.length > 0) {
      // تعيين صورة الغلاف الابتدائية
      setImage(data[0].imageCover);
    }
  }, [data]);



  const addProduct = async (e, prodId) => {
    if(isLogin){
    e.preventDefault();
    dispatch(Add_ToCart({ productId: prodId }))
      .unwrap()
      .then(() => {
        toast.success("Product added successfully to your cart");
       
        dispatch(GETLogged_User_ProductCart());
      })
      .catch((error) => {
        toast.error("Something is wrong");
      });
    }else if (!isLogin){
      toast("Please log in first", { duration: 6000 });
    }
  };


  const AddToWishList = async (e, prodId) => {
    if(isLogin){
    e.preventDefault();
    dispatch(Add_ToWishList({ productId: prodId }))
      .unwrap()
      .then(() => {
        toast.success("Product added successfully to your wishList");
        dispatch(GETLogged_User_Wishlist());    
      })
      .catch((error) => {
        toast.error("Something is wrong");
      });
    }else if (!isLogin){
      toast("Please log in first", { duration: 6000 });
    }
  };


  const deleteItemById = async (id) => {
    if(isLogin){
      try {
        await dispatch(Remove_Item_From_WishList(id)).unwrap();
        await dispatch(GETLogged_User_Wishlist()).unwrap();
        toast.success("Product removed successfully!");
      } catch (error) {
        toast.error(error);
      }
    }else if (!isLogin){
      toast("Please log in first", { duration: 6000 });
    }
  };


  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 564, min: 0 },
      items: 4,
    },
    xsmobile: {
      breakpoint: { max: 376, min: 0 },
      items: 3,
    },
  };








  if (loader) return <div className="container mt-4 "><Lodaing /></div>;

  return (
    <section className="container">
      {data.map((el) => {
        const productInCart = cart?.cartItems?.find(
          (item) => item.product._id === el._id
        );

        const productInWishlist = Array.isArray(wishlist?.data) 
        ? wishlist?.data.find(
            (item) => String(item._id) === String(el._id)
          )
        : null;

        return (
          <div
            className="grid grid-cols-[450px_450px] md:grid-cols-1 gap-9 md:gap-0 justify-center"
            key={el._id}
          >
           
            <div className="p-5">
              <div className="border w-fit">
                <img
                  src={image || el.imageCover}
                  alt={el.title}
                  className="h-[400px] md:h-[250px] p-2"
                />
              </div>
              <div className="w-[400px] md:h-full">
                {el.images && (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    arrows={true}
                    draggable={true}
                    responsive={responsive}
                    transitionDuration={1000}
                    removeArrowOnDeviceType={["mobile", "xsmobile"]}
                  >
                    {el.images.map((ele, i) => {
                      return (
                        <div
                          key={i}
                          onClick={() => setImage(ele)}
                          className="cursor-pointer"
                        >
                          <img src={ele} alt={`slide-${i}`} className="border m-2" />
                        </div>
                      );
                    })}
                  </Carousel>
                )}
              </div>
            </div>
          
            <div className="p-5">
              <h2 className="font-bold">{el.title}</h2>
              <div className="flex justify-start items-center gap-5">
                <div className="flex items-center font-extralight text-xl my-3">
                  <FaStar className="text-[#b6eb43]" />

                </div>
                <span className="font-extralight">
                  ( {el.ratingsQuantity} reviews )
                </span>
              </div>
              <p className="leading-8 font-light">{el.description}</p>
              <div>
                <h6 className="font-medium text-blue-500 my-4">{el.price} $</h6>
                <div className="flex items-center gap-3 relative">
                 
                  <div className="relative">
                    <button
                      onClick={(e) => addProduct(e, el._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 flex justify-center items-center gap-2"
                    >
                      <span>Add To Cart</span>
                      <FaCartArrowDown />
                    </button>
                
                    {productInCart && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {productInCart.quantity}
                      </span>
                    )}
                  </div>
                  { productInWishlist ?   
                  
                  <button 
                  onClick={(e) => deleteItemById(el._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xl rounded-md p-2">
                    <FcLike />
                  </button>
                  
                  
                  : 
                  <button 
                  onClick={(e) => AddToWishList(e, el._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xl rounded-md p-2">
                    <FaHeart />
                  </button>
                  }
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <ReviewProduct />
    </section>
  );
}
