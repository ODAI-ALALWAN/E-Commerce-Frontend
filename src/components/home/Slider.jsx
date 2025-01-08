import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import img1 from '../../assets/4.jpg'
import img2 from '../../assets/5.jpg'
import img3 from '../../assets/6.jpg'

export default function Slider() {

    const arry = [
        img1,
        img2,
        img3
    ]
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

  return (
    <div className='container w-full m-1  md-lg:mt-1 ' >
        <div className='w-[85%] lg:w-[90%] mx-auto sm:w-[100%] ' >
            <Carousel 
             autoPlay={true}
             infinite={true}
             arrows={false}
             showDots={true}
             responsive={responsive}
             >
            {arry.map((ele , i ) => 
                <img key={i} src={ele} alt={ele} />
            )

            }

             </Carousel>
        </div>
    </div>
  )
}
