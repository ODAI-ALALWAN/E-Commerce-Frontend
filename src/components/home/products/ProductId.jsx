import Carousel from 'react-multi-carousel'

import IPHONE13 from '../../../assets/IPHONE13.jpg'
import IPHONE131 from '../../../assets/IPHONE131.jpg'
import IPHONE132 from '../../../assets/IPHONE132.jpg'
import IPHONE133 from '../../../assets/IPHONE133.jpg'
import IPHONE134 from '../../../assets/IPHONE134.jpg'
import IPHONE135 from '../../../assets/IPHONE135.jpg'
import {  useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaHeart, FaStar } from 'react-icons/fa'
import { CiStar  } from 'react-icons/ci'
import { GrSubtractCircle } from "react-icons/gr";
import { FiPlusCircle } from "react-icons/fi";
import { FaCartArrowDown } from "react-icons/fa";
import ReviewProduct from './ReviewProduct'
import ContinerProduct from './ContinerProduct'
//import { Get_Product } from '../../../rtk/slices/Product-slice'



export default function ProductId() {
    const [count , setCount] = useState(1)
    const dispatch = useDispatch()
    const images = [
        IPHONE13,
        IPHONE131,
        IPHONE132,
        IPHONE133,
        IPHONE134,
        IPHONE135

    ]
    const [image , setImage] = useState('')

  const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4
    },
    mobile: {
        breakpoint: { max: 564, min: 0 },
        items: 4
    },
    xsmobile: {
      breakpoint: { max: 376, min: 0 },
      items: 3
  },
  }

//   useEffect (() => {
//     dispatch(Get_Product())
// })



  return (

        <section className='container '>
            <div className='grid grid-cols-[450px_450px] md:grid-cols-1 gap-9 md:gap-0  justify-center '>
                <div className='p-5'>
                    <div className='border w-fit'>
                        <img src={image ? image : IPHONE132 } alt='' className='h-[400px] md:h-[250px]  p-2' />
                    </div>
                    <div className='w-[400px] md:h-fullu'>
                    {images && 
                    <Carousel 
                    autoPlay={true}
                    infinite={true}
                    arrows={true}
                    draggable={true}
                    responsive={responsive}
                    transitionDuration={1000}
                    removeArrowOnDeviceType={["mobile" ,'xsmobile']}
                
                >
                    {
                        images.map((ele , i) => {
                            return(
                                <div key={i} onClick={() => setImage(ele)} className='cursor-pointer' >
                                    <img src={ele} alt='' className='border m-2' />
                                </div>
                            )
                        })
                    }
                    </Carousel>}
                    </div>
                </div>
                <div className='p-5 '>
                        <h2 className='font-bold'>Apple iPhone 13 (128GB) – Starlight</h2>
                        <div className='flex justify-start items-center gap-5'>
                        <div className='flex items-center font-extralight  text-xl my-3'>
                            <FaStar className='text-[#b6eb43]' />
                            <FaStar className='text-[#b6eb43]' />
                            <FaStar className='text-[#b6eb43]' />
                            <FaStar className='text-[#b6eb43]' />
                            <CiStar/>
                        </div>
                        <span className=' font-extralight'>( 250 reviews )</span>
                        </div>
                       
                        <p className='leading-8 font-light' > Sapiente nam repellat odio, sit expedita perspiciatis exercitationem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab labore, rerum fugit pariatur laboriosam impedit expedita natus dicta minus, fuga incidunt similique porro voluptatibus minima vel eum cumque quas cupiditate? Dolorem deserunt nisi modi optio dolores eaque sapiente quisquam recusandae autem. Explicabo!</p>
                        <div>
                            <div className='bg-[#eee] rounded-md my-3 w-[100px] flex justify-evenly items-center'>
                            <button onClick={() => setCount(count + 1)}><FiPlusCircle /></button>
                            <span>{count}</span>
                            <button onClick={() => setCount(count - 1)} ><GrSubtractCircle /></button>
                            </div>
                            <h6 className=' font-medium text-blue-500 my-4'>$ 4999  </h6>
                            <div className='flex justify-between w-[200px]'>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 flex justify-center items-center gap-2'><span>Add To Card </span><FaCartArrowDown/></button>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white text-xl rounded-md px-3'><FaHeart/></button>
                            </div>
                            
                        </div>
                </div>


            </div>
            <ReviewProduct/>
            <div className='mt-5'>
                <h5 className='mx-9'>Customers Also Viewed</h5>
                <ContinerProduct/>
            </div>
           

        </section>


  )
}
