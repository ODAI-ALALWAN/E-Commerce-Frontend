
// import { IoFilter } from "react-icons/io5";

import CardProduct from "../../components/home/products/CardProduct";
import Imag from "../../assets/9.webp";
import ContinerFilter from "../../utils/ContinerFilter";
import SearchBar from "../../components/home/SearchBar";
import Slider from "../../components/home/Slider";
import { FaRegHeart } from "react-icons/fa";


export default function Shop() {
  return (
    <>
      <SearchBar />
      <Slider />
      <div className="container grid grid-cols-[20%_80%] gap-1   md:block">
        <ContinerFilter />
        <div>
          <div className="container  flex h-[50px] items-center justify-end ">
            <select
              name=""
              id=""
              className="rounded-md border p-1  font-semibold  text-slate-600 outline-0  "
            >
              <option>Sort By</option>
              <option value="low-to-high">Low-to-high-price</option>
              <option value="high-to-low">High-to-low-price</option>
            </select>
          </div>
          <div className="Products">
            <CardProduct ProductImag={Imag} price={300}   />
            <CardProduct ProductImag={Imag} price={300} icon={<FaRegHeart/>} />
            <CardProduct ProductImag={Imag} price={300} icon={<FaRegHeart/>} />
            <CardProduct ProductImag={Imag} price={300} icon={<FaRegHeart/>} />
            <CardProduct ProductImag={Imag} price={300} icon={<FaRegHeart/>} />
            <CardProduct ProductImag={Imag} price={300} icon={<FaRegHeart/>} />
            <CardProduct ProductImag={Imag} price={300} icon={<FaRegHeart/>} />
            <CardProduct ProductImag={Imag} price={300} icon={<FaRegHeart/>} />
            <CardProduct ProductImag={Imag} price={300} icon={<FaRegHeart/>} />
            <CardProduct ProductImag={Imag} price={300} icon={<FaRegHeart/>} />
            <CardProduct ProductImag={Imag} price={300} icon={<FaRegHeart/>} />
            <CardProduct ProductImag={Imag} price={300} icon={<FaRegHeart/>} />
          </div>
        </div>
      </div>
    </>
  );
}
