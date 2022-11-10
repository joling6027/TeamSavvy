import React, { Component } from 'react';
import {Container, Form, FormGroup, Label, Input, FormFeedback, FormText, Row, Col, Modal,  ModalHeader, Button, ModalBody } from 'reactstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Timesheet from '../timesheet/Timesheet'
import Task from '../task/Task'
import Profile from '../profile/Profile'
import ProfileView from './ProfileView';
import TaskView from './TaskView';

const EmployeeDetails = () => {
    return ( 
        <>
        <Container className="px-3">
            <p className="h4 px-2 pb-3">Employee Name</p>
            
            <Tabs
            defaultActiveKey="home"
            
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
            >
            <Tab eventKey="home" title="Timesheet">
                <Timesheet/>
            </Tab>
            <Tab eventKey="profile" title="Task">
                <TaskView/>
            </Tab>
            <Tab eventKey="contact" title="Profile" >
                <ProfileView/>
            </Tab>
            </Tabs>

        </Container>
        </>
    );
}

export default EmployeeDetails;
