import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOG_OUT } from "../../rtk/slices/AuthUser-slice";
import { BsList } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { GiShoppingCart } from "react-icons/gi";
import { CiShop } from "react-icons/ci";
import toast from "react-hot-toast";


export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isOpen, setIsopen] = useState(false);
  const sidebarRef = useRef(null);
  const isOpenRef = useRef(null);
  const { isLogin, userName, role  } = useSelector((state) => state.auth);
  const toPage = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleOpen = () => {
    setIsopen(!isOpen)
  }

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setShowSidebar(false);
    }
  };
  const handleClickOutsideOpen = (event) => {
    if (isOpenRef.current && !isOpenRef.current.contains(event.target)) {
      setIsopen(false);
    }
  };



  

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutsideOpen);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutsideOpen);
    };
  }, []);

  const HandelLogout = async () => {
    try {
      await dispatch(LOG_OUT()).unwrap();
      toast.success('logged out successfully')
      toPage("/SignIn");
    } catch (error) {
      console.log(error);
      toast.error('not logged out try again! ')
    }
  };





  return (
    <header ref={sidebarRef}  className="bg-[#153448] shadow-md">
      <div className="container mx-auto sm:w-[100%]">
        <div className="flex h-[60px] items-center justify-between text-white sm:w-full lg:h-[50px]">
          <Link to={"/"}>E-commerce</Link>

          {/* for small scren */}
          <div className="relative hidden h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-sm md:flex">
            <span className="text-[30px] text-white" onClick={toggleSidebar}>
              <BsList />
            </span>
            <div
              className={`${showSidebar ? "visible" : "hidden"} relative flex items-center justify-end `}
            >
              <div
                className={`${showSidebar ? "fixed left-0 top-[51px] z-[9999] h-full w-[160px]  bg-[#153448] text-[white] transition-all duration-500 ease-in-out" : "-left-[300px] top-0 transition-all duration-500 ease-in-out"}`}
              >
                <ul className="flex flex-col items-center justify-between p-10">
                  <Link to={"SignIn"}>
                    <li
                      className="mb-4 flex flex-col items-center justify-between text-white"
                      onClick={toggleSidebar}
                    >
                      <span className="mx-3 text-sm font-light">SIGN IN</span>
                      <HiOutlineUserCircle className="text-[1.5rem]" />
                    </li>
                  </Link>

                  <Link to={"Washlist"}>
                    <li
                      className="mb-4 flex flex-col items-center justify-between "
                      onClick={toggleSidebar}
                    >
                      <span className="mx-3 text-nowrap text-sm font-light text-white">
                        WASHLIST
                      </span>
                      <FaHeart className="mt-1 text-[1.5rem] text-[#4D869C] " />
                    </li>
                  </Link>
                  <Link to={"Shop"}>
                    <li
                      className="mb-4 flex flex-col items-center justify-between text-white"
                      onClick={toggleSidebar}
                    >
                      <span className="mx-3 text-sm font-light">SHOP</span>
                      <CiShop className="text-[1.5rem]" />
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
            <ul className="">
              <Link to={"Cart"}>
                <li className="relative ml-2 mr-10 flex items-center text-[1.5rem] text-white">
                  <GiShoppingCart />
                  <span className="absolute -right-[9px] -top-[9px] flex h-[10px] w-[10px] items-center justify-center rounded-full bg-[#4D869C] p-2 text-sm font-light text-white">
                    3
                  </span>
                </li>
              </Link>
            </ul>
          </div>

          {/* large screen */}
          <div className="md:hidden " ref={isOpenRef}>
            <ul className="flex items-center justify-center ">
              {isLogin ? (
                <div className=" relative  ">
                  <button
                    onClick={toggleOpen}
                    className="mx-2 flex items-center justify-center border-emerald-50"
                  >
                    <span className="mx-1 text-sm font-light">{userName}</span>
                    <HiOutlineUserCircle className="text-[1.5rem]" />
                  </button>
                  {isOpen && (
                    <div className="absolute  rounded-md bg-[#eee] p-2 text-black ">
                      <span  onClick={toggleOpen}>
                        <Link
                          to={
                            role === "admin"
                              ? "/Dashbord/Admin/Main"
                              : "/Dashbord/user/Profile"
                          }
                        >
                          {" "}
                          {role === "admin" ? "Dashboard" : "profile"}{" "}
                        </Link>
                      </span>
                      <span className="cursor-pointer" onClick={HandelLogout}  >
                        logout
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <Link to={"SignIn"}>
                  <li className="mx-2 flex items-center justify-center">
                    <span className="mx-1 text-sm font-light">SIGN IN</span>
                    <HiOutlineUserCircle className="text-[1.5rem]" />
                  </li>
                </Link>
              )}

              <Link to={"Cart"}>
                <li className="relative mx-2 text-[1.5rem]">
                  <GiShoppingCart />
                  <span className="absolute -right-[9px] -top-[9px] flex h-[10px] w-[10px] items-center justify-center rounded-full bg-[#eee] p-2 text-sm font-light text-[#4D869C]">
                    3
                  </span>
                </li>
              </Link>
              <Link to={"Washlist"}>
                <li className="relative mx-2 flex items-center text-[#4D869C]">
                  <FaHeart className="mx-1 text-[1.5rem]" />
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
