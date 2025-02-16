import { Outlet } from 'react-router-dom'

import SidBar from "./SidBar";

export default function Dashbord() {
  return (
    <main className=" min-h-[100vh] flex flex-row gap-2 mt-2">
        <SidBar/>
        <section className='container bg-[#f1f5f9]' >
            <Outlet/>
        </section>
    </main>
  )
}
