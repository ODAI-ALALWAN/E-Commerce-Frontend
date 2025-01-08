import React from "react";
import Slider from "../../components/home/Slider";
import Categroy from "../../components/home/Categroy";
import ContinerProduct from "../../components/home/products/ContinerProduct";
import SearchBar from "../../components/home/SearchBar";



export default function Home() {
  return (
    <>
      <SearchBar/>
      <Slider/>
      <Categroy/>
      <ContinerProduct title={'Last Products '} btn={'View All'} />
      <ContinerProduct   title={'Top Product '} btn={'View All'}  />
    </>
  );
}
