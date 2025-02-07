
import React, { useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { GET_Categroy } from '../../rtk/slices/Categroy-slice'
import Lodaing from '../../ui/Lodaing'




export default function Categroy() {

  const { data : categroy , loading  } = useSelector((state) => state.categroy)
  const dispatch = useDispatch()
  

  

  useEffect (() => {
    dispatch(GET_Categroy())
  },[dispatch])
  


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


  if(loading) return  <div className='container mt-4 '><Lodaing/></div>

  return (
    <div className='w-full  m-1  md-lg:mt-1  sm:w-[100%]' >
        <div className='w-[85%] lg:w-[90%] mx-auto mt-5 cursor-pointer' >
          <div className='w-full flex flex-wrap  lg:gap-8'>
            <div className='w-full' >
              <div className='my-3'>
               {
                 categroy ? ( 
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
               
                  categroy.map((ele , i) => 
                    <div key={i} className='flex justify-center items-center flex-col gap-[5px] '>
                          <img  src={ele.image} alt={ele.image} className='bg-[#eee] flex justify-center items-center
                           p-1 rounded-[50%] w-[150px] md:w-[100px] object-cover  ' />
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
