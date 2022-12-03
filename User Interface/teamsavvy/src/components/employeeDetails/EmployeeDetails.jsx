import React from 'react';
import {Container } from 'reactstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProfileView from './ProfileView';
import TaskView from './TaskView';
import TimeSheetView from './TimeSheetView';
import AuthService from '../services/authService';

const EmployeeDetails = () => {

    const {user} = AuthService();

    return ( 
        <>
        <div className="px-3 position-relative">
            <p className="h4 px-2 pb-3">Employee Name</p>
            
            <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3 "
            >
            <Tab eventKey="home" title="Timesheet">
                <TimeSheetView/>
            </Tab>
            {user.role === 'Manager' && <Tab eventKey="profile" title="Task">
                <TaskView/>
            </Tab>}
            <Tab eventKey="contact" title="Profile" >
                <ProfileView/>
            </Tab>
            </Tabs>

        </div>
        </>
    );
}

export default EmployeeDetails;
