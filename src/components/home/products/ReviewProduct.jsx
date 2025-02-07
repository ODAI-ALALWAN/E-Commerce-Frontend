import React, { useEffect, useState } from "react";
import { Reting } from "./Reting";
import { FaStar } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Get_Review_By_Id } from "../../../rtk/slices/ReviewSlice";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function ReviewProduct() {
  const { id } = useParams()
  const { data : reviews  } = useSelector((state) => state.review);
  const dispatch = useDispatch();



  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(Get_Review_By_Id(id));
      } catch (error) {
        toast.error("Something went wrong, please try again!");
      }
    };

    fetchData();
  }, [dispatch, id]);
  
  const [isOpen ] = useState(false)
  const [isCollapsed , setIsCollapsed] = useState(true)

  const displayItems = isCollapsed ? reviews?.slice(0,3) : reviews ;




  return (
    <section className="mt-5 rounded-md bg-[rgb(240,245,245)] p-4">
      <h2 className="mx-9 border-b p-3">Product Ratings & Reviews</h2>
      <div className="grid grid-cols-[450px_450px] justify-center gap-1 md:grid-cols-1 ">
        <div>
          <h5 className="m-4">Overall Rating</h5>
          <div className="m-3 flex items-center text-2xl font-extralight ">
            <FaStar className="text-[#153448]" />
            <FaStar className="text-[#153448]" />
            <FaStar className="text-[#153448]" />
            <FaStar className="text-[#153448]" />
            <FaStar className="text-[#153448]" />
            <span className="mx-4">
              {" "}
              5 <span className=" text-sm font-extralight">out of 5</span>{" "}
            </span>
          </div>
          <div className="mx-2 flex items-center justify-start gap-2">
            <Reting reting={5} />
            <div className="h-[10px] w-[200px] bg-[#ddd]">
              <div className="h-[10px] w-[100%] bg-[#153448]"></div>
            </div>
          </div>
          <div className="mx-2 flex items-center justify-start gap-2">
            <Reting reting={4} />
            <div className="h-[10px] w-[200px] bg-[#ddd]">
              <div className="h-[10px] w-[80%] bg-[#153448]"></div>
            </div>
          </div>
          <div className="mx-2 flex items-center justify-start gap-2">
            <Reting reting={3} />
            <div className="h-[10px] w-[200px] bg-[#ddd]">
              <div className="h-[10px] w-[60%] bg-[#153448]"></div>
            </div>
          </div>
          <div className="mx-2 flex items-center justify-start gap-2">
            <Reting reting={2} />
            <div className="h-[10px] w-[200px] bg-[#ddd]">
              <div className="h-[10px] w-[40%] bg-[#153448]"></div>
            </div>
          </div>
          <div className="mx-2 flex items-center justify-start gap-2">
            <Reting reting={1} />
            <div className="h-[10px] w-[200px] bg-[#ddd]">
              <div className="h-[10px] w-[10%] bg-[#153448]"></div>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="w-full  ">
          <h5 className="m-3 font-extralight flex justify-center ">{reviews?.length} Reviews</h5>
          {
            displayItems.length >= 0 ?
            
            !isOpen  &&  displayItems.map((ele) => {
                return (
                    <div key={ele._id} className=" border-b border-[#000] px-2 py-1 ">
                    <Reting reting={ele.ratings} />
                    <div className="flex items-center justify-between">
                      <span className="font-semibold" >{ele.user.name}</span>
                      <span className=" font-extralight ">{new Intl.DateTimeFormat('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          }).format(new Date(ele.createdAt))} </span>
                    </div>
                    <p className=" font-extralight ">
                      {ele.title}
                    </p>
                  </div>

                )
            }) 
            
           : <span className=" font-extralight flex justify-center "> There is no Review </span>

          }

          <div className="flex flex-col gap-2 mt-5  relative " >
            <IoMdSend className=" absolute right-2 top-5 cursor-pointer "/>
            <input type="text" placeholder="comment ..." required name="title" id="title" className="bg-[#eee] rounded-md  p-3 "/>
          </div>

          {reviews.length >= 4 && 
          <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)} className="text-l m-3 mt-10  flex items-center justify-center gap-2 rounded-md bg-sky-500 p-2 text-white hover:bg-sky-700 md:mt-4">
            { isCollapsed ? `Show all ${reviews?.length}` : "Show less "}
          </button>
          }
        </div>
      </div>
    </section>
  );
}
