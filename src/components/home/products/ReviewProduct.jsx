import React, { useState } from "react";
import { Reting } from "./Reting";
import { FaStar } from "react-icons/fa";

export default function ReviewProduct() {
    const [isOpen ] = useState(false)
    const [isCollapsed , setIsCollapsed] = useState(true)

   


  const ReviewArry = [
    { id: 1, name: "user 1", comment: "very nice" , reting : 5 },
    { id: 2, name: "user 2", comment: "nice" , reting : 4 },
    { id: 3, name: "user 3", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat!",reting : 4 },
    { id: 4, name: "user 4", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat" , reting : 3 },
    { id: 1, name: "user 1", comment: "very nice" , reting : 5 },
    { id: 2, name: "user 2", comment: "nice" , reting : 4 },
    { id: 3, name: "user 3", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat!",reting : 4 },
    { id: 4, name: "user 4", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat" , reting : 3 },
  ];



  const displayItems = isCollapsed ? ReviewArry.slice(0,3) : ReviewArry ;




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
          <h5 className="m-3">{ReviewArry.length} Reviews</h5>
          {
            displayItems.length > 0 ?
            
            !isOpen  &&  displayItems.map((ele) => {
                return (
                    <div key={ele.id} className=" border-b border-[#000] px-2 py-1 ">
                    <Reting reting={ele.reting} />
                    <div className="flex items-center justify-between">
                      <span>{ele.name}</span>
                      <span className=" font-extralight ">12-12-2020</span>
                    </div>
                    <p className="font-light">
                      {ele.comment}
                    </p>
                  </div>

                )
            }) 
            
           : <span> there is no comment </span>

          }
         
          <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)} className="text-l m-3 mt-10  flex items-center justify-center gap-2 rounded-md bg-sky-500 p-2 text-white hover:bg-sky-700 md:mt-4">
            {isCollapsed ? `Show all ${ReviewArry.length}` : "Show less "}
          </button>
        </div>
      </div>
    </section>
  );
}
