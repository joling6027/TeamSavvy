import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import { Link, Outlet } from 'react-router-dom';
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';
import { useEffect } from 'react';
import { useState } from 'react';
const Dashboard = () => {

    const {http, user} = AuthService();
    const [totalProjects, setTotalProjects] = useState();
    const [totalTasks, setTotalTasks] = useState();
    const [totalTeamMembers, setTotalTeamMember] = useState();

    const GetProjects = () => {
        http.get(GetEndPoints().projectsByEmployeeId+'/'+user.employeeId)
        .then((res) =>{
           if(res.data.success){
            setTotalProjects(res.data.response.length);
           }
        })
    }

    const GetTaskListByManagerId = () => {
        http.get(GetEndPoints().taskListByManagerId+'/'+user.employeeId)
        .then((res) =>{
           if(res.data.success){
            setTotalTasks(res.data.response.length);
           }
        })
    }

    const GetTeamMembersByManagerId = () => {
        http.get(GetEndPoints().teamMembers+'/'+user.employeeId)
        .then((res) =>{
           if(res.data.success){
            setTotalTeamMember(res.data.response);
           }
        })
    }

    useEffect(() =>{
        GetProjects();
        GetTaskListByManagerId();
        GetTeamMembersByManagerId();
    },user.employeeId)

    return ( 
        <>
         <Container className="px-3">
        {
            user.role && user.role == "HR" && <div className=" d-flex justify-content-between">
            <Col className="py-2 px-3 yellow-bg rounded d-flex align-items-center m-2">
                <h5 className="text-white flex-grow-1">Project in compoany</h5>
                <h2 className="text-white fw-bold">150</h2>
            </Col>
            <Col className="py-2 px-3 orange-bg rounded d-flex align-items-center m-2">
                <h5 className="text-white flex-grow-1">Employee List</h5>
                <h2 className="text-white fw-bold">105</h2>
            </Col>
            <Col className="py-2 px-3 green-bg rounded d-flex align-items-center m-2">
                <h5 className="text-white flex-grow-1">Jobs Created</h5>
                <h2 className="text-white fw-bold">40</h2>
            </Col>
        </div>
        }
        {
            user.role && user.role == "Manager" && <div className=" d-flex justify-content-between">
            <Col className="py-2 px-3 yellow-bg rounded d-flex align-items-center m-2">
                <h5 className="text-white flex-grow-1">Project under manager</h5>
                <h2 className="text-white fw-bold">{totalProjects}</h2>
            </Col>
            <Col className="py-2 px-3 orange-bg rounded d-flex align-items-center m-2">
                <Link to={'/dashboard/teammembers'} className='text-mute text-decoration-none inline-block'>
                    <h5 className="text-white flex-grow-1">Team Memebers</h5>
                    <h2 className="text-white fw-bold">{totalTeamMembers}</h2>
                </Link>
            </Col>
            <Col className="py-2 px-3 green-bg rounded d-flex align-items-center m-2">
                <h5 className="text-white flex-grow-1">Task Created</h5>
                <h2 className="text-white fw-bold">{totalTasks}</h2>
            </Col>
        </div>
        }
        {/* <Outlet/> */}
        </Container>
        </>
     );
}
 
export default Dashboard;