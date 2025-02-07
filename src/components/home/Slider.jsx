import React, { useEffect } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Link } from "react-router-dom"
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { GET_Banner } from '../../rtk/slices/Banner'
import Lodaing from '../../ui/Lodaing'

export default function Slider() {

    const { data : bannerDate , loader : bannerLoader } = useSelector((state) => state.banner);

    const dispatch = useDispatch();


    useEffect(() => {
        const fatchData = async () => {
          try {
            dispatch(GET_Banner())
        } catch (error) {
          toast.error("somthing is error try again!")
        }
    
        }
        fatchData()
      },[dispatch]);


    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        },
    }

    if (bannerLoader) return <div className='container mt-4 '><Lodaing/></div>

  return (
    <div className='container w-full m-1  md-lg:mt-1 mb-4 ' >
        <div className='w-[85%] lg:w-[90%] mx-auto sm:w-[100%] cursor-pointer  ' >
            <Carousel 
             autoPlay={true}
             infinite={true}
             arrows={false}
             showDots={true}
             responsive={responsive}
             >
            {bannerDate.map((ele ) => 
                <Link key={ele._id} to={ele.productId?._id} >
                <img  src={ele.image} alt={ele.image} className='h-[300px] mb-10 w-full  sm:h-[100px] rounded-md ' />
                </Link>
            )
            }

             </Carousel>
        </div>
    </div>
  )
}
