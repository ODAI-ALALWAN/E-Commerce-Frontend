import { CiStar } from "react-icons/ci"
import { FaStar } from "react-icons/fa"
//import { FaStarHalfStroke } from "react-icons/fa6";


export const Reting = ({reting}) => {
  if (reting === 5) {
    return (
        <>
        <div className='flex items-center font-extralight  text-sm my-3'>
                            <FaStar className='text-[#b6eb43]' />
                            <FaStar className='text-[#b6eb43]' />
                            <FaStar className='text-[#b6eb43]' />
                            <FaStar className='text-[#b6eb43]' />
                            <FaStar className='text-[#b6eb43]' />
        </div>
        </>
    )
  }
  else if (reting === 4) {
    return (
        <>
        <div className='flex items-center font-extralight  text-sm my-3'>
                            <FaStar className='text-[#b6eb43]' />
                            <FaStar className='text-[#b6eb43]' />
                            <FaStar className='text-[#b6eb43]' />
                            <FaStar className='text-[#b6eb43]' />
                            <CiStar/>
        </div>
        </>
    )
  }
  else if (reting === 3) {
    return (
        <>
        <div className='flex items-center font-extralight  text-sm my-3'>
                            <FaStar className='text-[#b6eb43]' />
                            <FaStar className='text-[#b6eb43]' />
                            <FaStar className='text-[#b6eb43]' />
                            <CiStar/>
                            <CiStar/>
        </div>
        </>
    )
  }
  else if (reting === 2) {
    return (
        <>
        <div className='flex items-center font-extralight  text-sm my-3'>
                            <FaStar className='text-[#b6eb43]' />
                            <FaStar className='text-[#b6eb43]' />
                            <CiStar/>
                            <CiStar/>
                            <CiStar/>
        </div>
        </>
    )
  }
  else if (reting === 1) {
    return (
        <>
        <div className='flex items-center font-extralight  text-sm my-3'>
                            <FaStar className='text-[#b6eb43]' />
                            <CiStar/>
                            <CiStar/>
                            <CiStar/>
                            <CiStar/>
        </div>
        </>
    )
  }
}
