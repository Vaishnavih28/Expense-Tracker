import React from 'react'
import SideNav from '../../componentsofwebsite/sidenav/SideNav'
import Dashboard from '../../componentsofwebsite/dashboard/Dashboard'
import Header from '../../componentsofwebsite/header/Header'
import { Outlet } from 'react-router-dom'

function DashboardLayout() {
  return (
    <div >
        <div className='fixed md:w-64 hidden md:block'>
            <SideNav />
        </div>
        <div className='md:ml-64'>
            <Header />
            <Outlet />
        </div>
        
    </div>
  )
}

export default DashboardLayout