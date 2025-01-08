//import React, { useEffect } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Mobile from '../../assets/9.webp'
import Television from '../../assets/10.webp'
import Home  from '../../assets/11.webp'
import SmartWatch from '../../assets/14.webp'


// import { useSelector , useDispatch } from 'react-redux'

// import { getCategroy } from '../../rtk/slices/Categroy-slice'

export default function Categroy() {

  // const categroy = useSelector((state) => state.categories.data)
  // const dispatch = useDispatch()

  

  // useEffect (() => {
  //   dispatch(getCategroy())
  // },[dispatch])
  
  const image = [
    {name : "Mobile" ,
     img : Mobile
    },
    {name : "Television" ,
      img : Television
    },
    {name : "Home" ,
      img : Home
    },
    {name : "SmartWatch" ,
      img : SmartWatch
    },
    {name : "Mobile" ,
      img : Mobile
     },
     {name : "Television" ,
       img : Television
     },
     {name : "Home" ,
       img : Home
     },
     {name : "SmartWatch" ,
       img : SmartWatch
     },
   

    
  ]




  const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 6
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
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

  return (
    <div className='w-full  m-1  md-lg:mt-1  sm:w-[100%]' >
        <div className='w-[85%] lg:w-[90%] mx-auto mt-5 cursor-pointer' >
          <div className='w-full flex flex-wrap  lg:gap-8'>
            <div className='w-full' >
              <div className='my-3'>
               {
                 image ? ( 
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
               
                  image.map((ele , i) => 
                    <div key={i} className='flex justify-center items-center flex-col gap-[5px] '>
                          <img  src={ele.img} alt={ele.img} className='bg-[#eee] flex justify-center items-center
                           p-1 rounded-[50%] w-[150px] md:w-[100px] ' />
                          <span>{ele.name}</span>
                    </div>
                  
                  )
                }
                </Carousel>
                )
                : <h2>There is no Data</h2> 
                }

              </div>
            </div>
    
          </div>
           
        </div>
    </div>
  )
}
