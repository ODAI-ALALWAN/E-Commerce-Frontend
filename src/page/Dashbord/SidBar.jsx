import React, {  useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getNav } from "../../components/dashboard/navigation";
import {  useSelector } from "react-redux";



export default function SidBar() {
  const { role } = useSelector(state=>state.auth)
    const [allNav , setAllNav] = useState([])
    useEffect(() => {
      const navs = getNav(`${role}`)
      setAllNav(navs)
    },[role])
    



  return (
    <div className="min-h-[100vh] bg-[white] p-1 relative  sh-lg ">
      <div className="mt-5">

        {allNav.map((el) => {
          return (
            <NavLink
            key={el.path}
            to={el.path}
            style={({ isActive }) =>
            isActive
              ? {
                  color :'#121cdc' ,
                }
              : { color: '#131212'}
            }
          >
           <div className={`flex flex-row cursor-pointer items-center gap-3 text-base m-2 `}>
            <span>{el.Icon}</span>
            <span className="hide-mobile text-base text-nowrap " >{el.title}</span>
          </div>
          </NavLink>
          )
        })}
        

        
      </div>
    </div>
  );
}
