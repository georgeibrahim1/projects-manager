import React from 'react'
import NavBar from '../ui/navbar'
import {Outlet} from "react-router-dom"

export default function MainLayout() {
  return (
    <>
    <NavBar>
        {/*add here links*/}
    </NavBar>
    <div>
        <Outlet/>
    </div>
    </>
  )
}
