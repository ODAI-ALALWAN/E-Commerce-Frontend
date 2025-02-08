
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa";
import { FaEye, FaStar } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { FcLike } from "react-icons/fc";
import { Add_ToCart, GETLogged_User_ProductCart } from "../../../rtk/slices/Cart-slice";
import { Add_ToWishList, GETLogged_User_Wishlist, Remove_Item_From_WishList } from "../../../rtk/slices/WishList-slice";

export default function CardProduct({ data }) {
  const { isLogin } = useSelector((state) => state.auth);
  const { _id, imageCover, price, ratingsQuantity, title } = data;
  const dispatch = useDispatch();

 
  const cart = useSelector((state) => state.cart.data);
  const productInCart = cart?.cartItems?.find(
    (item) => item.product._id === _id
  );

  const wishlist = useSelector((state) => state.wishList);

  const productInWishlist = Array.isArray(wishlist?.data) 
  ? wishlist?.data.find(
      (item) => String(item._id) === String(_id)
    )
  : null;

  
 

  const AddedProduct = async (e, id) => {
    if(isLogin){
      e.preventDefault();
      dispatch(Add_ToCart({ productId: id }))
        .unwrap()
        .then(() => {
          toast.success("Successfully added the product to your cart");
          dispatch(GETLogged_User_ProductCart());
        })
        .catch((error) => {
          toast.error("Something is wrong");
        });
    }else if (!isLogin){
      toast("Please log in first", { duration: 6000 });
    }
  };

  const AddedToWishList = async (e, id) => {
    if(isLogin){
    e.preventDefault();
    dispatch(Add_ToWishList({ productId: id }))
      .unwrap()
      .then(() => {
        toast.success("Successfully added the product to your wishlist");
        dispatch(GETLogged_User_Wishlist());
      })
      .catch((error) => {
        toast.error("Something is wrong");
        console.log(error)
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



    




  return (
    <div className="w-full h-[320px]">
      <div className="border group transition-all duration-500 hover:shadow-md hover:-mt-3 border-[#eee] shadow-md rounded-lg h-[320px] w-[190px] cardProduct">
        <div className="relative overflow-hidden">
       
          <img
            src={imageCover}
            alt="Product"
            className="w-full p-5 border-b-2 border-[#eee] rounded-md h-[200px]"
          />
          <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
            <Link to={`/${_id}`}>
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#eee] hover:rotate-[720deg] transition-all">
                <FaEye />
              </li>
            </Link>
            <li className="relative w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#eee] hover:rotate-[720deg] transition-all">
              <RiShoppingCartLine onClick={(e) => AddedProduct(e, _id)} />
              {productInCart && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {productInCart.quantity}
                </span>
              )}
            </li>
            <li className="relative w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#eee] hover:rotate-[720deg] transition-all">
            { productInWishlist ?   <button className=""><FcLike onClick={(e) => deleteItemById(_id)}/></button> :  <button className=""><FaRegHeart onClick={(e) => AddedToWishList(e, _id)}/></button> } 
            </li>
          </ul>
          
        </div>
        <p className="px-2 mt-3 text-md font-light h-[45px] w-full overflow-clip">
          {title}
        </p>
        <div className="flex justify-center flex-row gap-10 mt-3 flex-nowrap">
          <div>{price} $</div>
          <div className="flex items-center font-extralight text-sm gap-1">
            {ratingsQuantity}
            <FaStar className="text-[#b6eb43]" />
          </div>
        </div>
      </div>
    </div>
  );
}
