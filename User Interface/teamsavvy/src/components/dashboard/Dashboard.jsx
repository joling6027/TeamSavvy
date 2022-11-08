import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return ( 
        <>
        <div>
            Dashboard
        </div>
        <div>
            <Link to='/dashboard/addemployee'>Add New Employee</Link>
        </div>
        <Outlet/>
        </>
       
     );
}
 
export default Dashboard;