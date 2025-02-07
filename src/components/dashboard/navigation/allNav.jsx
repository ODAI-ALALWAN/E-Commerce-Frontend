import { FaTachometerAlt, FaUsers } from "react-icons/fa";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import { BiSolidCoupon } from "react-icons/bi";
import { BiSolidCategory } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { HiViewGridAdd } from "react-icons/hi";
import { PiSlideshowBold } from "react-icons/pi";


export const allLink = [
    {
    id : 1,
    path : 'Admin/Main',
    role : 'admin',
    Icon : <FaTachometerAlt/>,
    title : "Main"
    },
    {
    id : 2,
    path : 'Admin/Users',
    role : 'admin',
    Icon : <FaUsers />,
    title : "Users",
    },
    {
    id : 3,
    path : 'Admin/Orders',
    role : 'admin',
    Icon : <BsFillBoxSeamFill />,
    title : "Orders",
    },
    {
    id : 4,
    path : 'Admin/StoreHouse',
    role : 'admin',
    Icon : <FaWarehouse />,
    title : "Store House",
    },
    {
      id : 8,
      path : 'Admin/AddProduct',
      role : 'admin',
      Icon : <HiViewGridAdd />,
      title : "Add Product",
    },
    {
    id : 5,
    path : 'Admin/Categroy',
    role : 'admin',
    Icon : <BiSolidCategory />,
    title : "Categroy"
    },
    {
    id : 6,
    path : 'Admin/Offers',
    role : 'admin',
    Icon : <BiSolidCoupon />,
    title : "Offers"
    },
    {
    id : 7,
    path : 'user/Profile',
    role : 'user',
    Icon : <ImProfile />,
    title : "Profile"
    },
    {
    id : 8,
    path : 'Admin/Baaner',
    role : 'admin',
    Icon : <PiSlideshowBold />,
    title : "Banner"
    },


  ]