import React from "react";
import { AiOutlineMore } from "react-icons/ai";

export default function CreateCoupon() {
  const arry = [
    {
      id: 1,
      name: "New year",
      expire: "2024-7-3",
      discount: 50,
    },
    {
      id: 2,
      name: "New year",
      expire: "2024-7-3",
      discount: 30,
    },
    {
      id: 3,
      name: "New year",
      expire: "2024-7-3",
      discount: 10,
    },
    {
      id: 4,
      name: "New year",
      expire: "2024-7-3",
      discount: 50,
    },
    {
      id: 5,
      name: "New year",
      expire: "2024-7-3",
      discount: 50,
    },

  ];

  return (
    <div className="container ">
      <h1 className=" mt-3 font-bold ">Coupon Management</h1>
      <div className="flex justify-center gap-4  md:flex-col  mb-5 ">
        <div className="p-3 mt-4 h-[400px]  border-spacing-2 rounded-md border border-[#eee] shadow-xl ">
          <h4 className="m-3 font-extralight">Create New Coupon</h4>
          <div className="m-10 flex    flex-col justify-center  gap-10">
            <input
              type="text"
              name="coupon"
              placeholder="coupon name ...."
              id="coupon"
              className=" rounded-md border  p-2 outline-none"
            />
            <input
              type="number"
              name="discount"
              placeholder="10 %"
              id="discount"
              
              className=" rounded-md border  p-2 outline-none"
            />
            <input
              type="date"
              name="expire"
              id="expire"
              className=" rounded-md border  p-2 outline-none"
            />
            <button className="text-l rounded-md  bg-sky-500 p-2 text-white hover:bg-sky-700">
              Save
            </button>
          </div>
        </div>
        <div className="p-3 mt-4 overflow-auto  border-spacing-2 rounded-md border border-[#eee] shadow-xl">
          <h2 className="m-3 font-extralight">Existing Coupons</h2>
          <div className='responsive-table rounded-md bg-white ' >
          <table className="w-full text-base' ">
            <thead  >
              <tr >

                <td>Name</td>
                <td>Discount</td>
                <td>Expire</td>
                <td>Actions</td>

              </tr>
            </thead>

            <tbody>
              {arry.map((ele) => {
                return (
                  <tr key={ele.id}>

                    <td>{ele.name}</td>
                    <td>{ele.discount} %</td>
                    <td>{ele.expire}</td>
                    <td className=" font-bold text-[20px]"><span className="flex justify-center items-center cursor-pointer"><AiOutlineMore/></span></td>

                  </tr>
                );
              })}
            </tbody>
          </table>





          </div>
         
        </div>
      </div>
    </div>
  );
}
