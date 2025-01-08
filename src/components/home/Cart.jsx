
import testimage from "../../assets/9.webp"
import { FiPlusCircle } from "react-icons/fi"
import { GrSubtractCircle } from "react-icons/gr"
import { IoMdCloseCircle } from "react-icons/io";

export default function Cart() {

  const arry = [
    {id : 1 , title : "Mens Casual Slim Fit" , price : 530 , imageCover : testimage },
    {id : 2 , title : "Mens Casual Slim Fit" , price : 2430 , imageCover : testimage },
    {id : 3 , title : "Mens Casual Slim Fit" , price : 430 , imageCover : testimage },
    {id : 4 , title : "Mens Casual Slim Fit" , price : 430 , imageCover : testimage }
  ]
  return (
    <section className=' container w-[90%] grid grid-cols-[70%_30%] lg:grid-cols-[60%_40%]   gap-2 items-center h-screen px-[15px] mx-auto md:flex md:justify-center md:flex-col '>
      <div className='w-full h-[400px] overflow-y-auto'>

      {arry.map((el) => {
          return (
            <>
            <div key={el.id} className="h-[150px] mb-3 flex justify-between  items-center  flex-row border-b-2 border-zinc-950 w-[90%] ">

              <img src={el.imageCover} alt={el.imageCover} className="h-[150px] " />

              <div className="flex flex-col justify-between items-center md:gap-0   gap-10  h-[100px] "> 

              <div className="flex justify-between items-center md:gap-10  gap-10  w-full   ">
                  <span className="md:text-nowrap  md:text-sm " >{el.title}</span>
                  <div className="md:text-sm">
                   <button ><IoMdCloseCircle /></button>
                  </div>
              </div>
              
              <div className="flex justify-between items-center h-[120px] w-full ">
                  <div className="flex justify-center gap-4 items-center md:text-sm ">
                  <button ><FiPlusCircle /></button>
                            <span>1</span>
                   <button ><GrSubtractCircle /></button>
                  </div>
                  <span className="md:text-sm">{el.price} $ </span>
              </div>


              </div>

              </div>
               
              
           </>

          )
        })}






      </div>

      <div className="bg-[#D6BD98] flex flex-col gap-3 w-full h-[400px] p-10 rounded-md shadow-md md:mb-3 md:mt-3 md:w-[80%] ">
        <p className=" font-light mb-4 ">Summary</p>
          <div className="flex justify-between font-light border-b-2 border-zinc-950">
            <span>Total Cart Price</span>
            <span>5000</span>
          </div>
          <div className="flex justify-between font-light border-b-2 border-zinc-950">
            <span>Tax Price</span>
            <span>50</span>
          </div>
          <div className="flex justify-between font-light border-b-4 border-zinc-950">
            <span>Shipping Price</span>
            <span>0</span>
          </div>
          <div className="flex justify-between font-bold ">
            <span>Total Order</span>
            <span>5050</span>
          </div>

          <button className="w-full bg-stone-800  hover:bg-stone-900 hover:text-blue-600 text-white mt-8 rounded-md" >Checkout</button>
          
      </div>

    </section>
  )
}
