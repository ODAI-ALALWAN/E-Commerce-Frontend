import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import toast from "react-hot-toast";
import { IoBagHandleSharp } from "react-icons/io5";

import shopImg from "../../assets/shopImage.png";
import { Auth_Login, messageClear } from "../../rtk/slices/AuthUser-slice";
import { OverrideStyle } from "../../utils/helpers";

export default function Login() {
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage, role, isLogin } = useSelector(
    (state) => state.auth,
  );
  const toPage = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandel = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(Auth_Login(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    } else if (isLogin) {
      toast.success(successMessage);
      dispatch(messageClear());
      setTimeout(() => {
        toPage(`${role === "admin" ? "/Dashbord/Admin/Main" : "/"}`);
      }, 2000);
    }
  }, [successMessage, errorMessage, dispatch, role, toPage, isLogin]);

  return (
    <div className=" grid  h-[100vh] grid-cols-[50%_50%]  items-center justify-center gap-10 overflow-hidden md:flex ">
      <div className="landing z-[-1] flex h-[500px] w-[500px]  items-center justify-center bg-[#eee] md:hidden ">
        <img src={shopImg} alt="" className=" z-[-1]  " />
      </div>
      <div className="m-4 flex items-center justify-center p-4">
        <form
          onSubmit={submit}
          className="z-[1] flex h-[400px] w-[400px] flex-col  items-center justify-center gap-2 rounded-lg bg-[rgb(238,238,238)] shadow-xl md:h-[350px] md:w-[350px] md:text-sm"
        >
          <h1 className=" flex items-center justify-center gap-2 font-serif font-extrabold">
            Welcome to E-commerce{" "}
            <IoBagHandleSharp className="text-[#319cd2]" />{" "}
          </h1>
          <div className="flex w-[250px] flex-col gap-1">
            <label>Email</label>
            <input
              onChange={inputHandel}
              value={state.email}
              name="email"
              id="email"
              type="email"
              placeholder="email@example.com"
              className=" rounded-md border-black  p-2 outline-none"
            />
          </div>
          <div className="flex w-[250px] flex-col gap-1">
            <label>Password</label>
            <input
              onChange={inputHandel}
              value={state.password}
              name="password"
              id="password"
              type="password"
              placeholder="Password. . . ."
              className=" rounded-md border-black  p-2 outline-none"
            />
          </div>
          <button
            disabled={loader ? true : false}
            className="text-l mt-10 w-[100px] rounded-md bg-sky-500 p-2 text-white hover:bg-sky-700 md:mt-4"
          >
            {loader ? <BarLoader cssOverride={OverrideStyle} /> : "Sign In"}
          </button>

          <div>
            <span>
              Create Account
              <Link to={"/SignUp"}>
                <button className="text-l mt-10 p-2 text-sky-700 md:mt-4 ">
                  Sign Up
                </button>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
