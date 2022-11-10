import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import { Link, Outlet } from 'react-router-dom';
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';
import { useEffect } from 'react';
import { useState } from 'react';
import 'https://cdn.jsdelivr.net/npm/chart.js';
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  } from 'chart.js';
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  );
const Dashboard = () => {

    const {http, user} = AuthService();
    const [totalProjects, setTotalProjects] = useState();
    const [totalProjectsForHr, setTotalProjectsForHr] = useState();
    const [totalTasks, setTotalTasks] = useState();
    const [totalTeamMembers, setTotalTeamMember] = useState();
    const [totalEmployees, setTotalEmployees] =  useState();
    const [totalJobs, setTotalJos] =  useState();

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

    const GetProjectForHR = () => {
        http.get(GetEndPoints().projectsForHR)
        .then((res) =>{
           if(res.data.success){
            setTotalProjectsForHr(res.data.response.length);
           }
        })
    }

    const GetEmployeesForHR = () => {
        http.get(GetEndPoints().employee)
        .then((res) =>{
           if(res.data.success){
            setTotalEmployees(res.data.response.length);
           }
        })
    }

    const GetJobsForHR = () => {
        http.get(GetEndPoints().job)
        .then((res) =>{
           if(res.data.success){
            setTotalJos(res.data.response.length);
            console.log(res.data.response.length);
            console.log(res.data.response);
           }
        })
    }

    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
      ];
    
      const data = {
        labels: labels,
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45],
        }]
      };
    
      const config = {
        type: 'bar',
        data: data,
        options: {}
      };

      const myChart = new Chart(
        document.getElementById('myChart'),
        config
      );

    const downloadpdf = () => {
    
        fetch('SamplePDF.pdf').then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'SamplePDF.pdf';
                alink.click();
            })
        })
          
    }


    
      
    // useEffect(() =>{
    //     //for Manager
    //     if(user.role && user.role == "Manager")
    //     {
    //         GetProjects();
    //         GetTaskListByManagerId();
    //         GetTeamMembersByManagerId();
    //     }

    //     //for HR
    //     if(user.role && user.role == "HR")
    //     {
    //         GetProjectForHR();
    //         GetEmployeesForHR();
    //         GetJobsForHR();
    //     }
   
    // },user.employeeId)

    return ( 
        <>
         <Container className="px-3">
        {
            // user.role && user.role == "HR" && 
            <div className=" d-flex justify-content-between">
            <Col className="py-2 px-3 yellow-bg rounded d-flex align-items-center m-2">
                <h5 className="text-white flex-grow-1">Project in compoany</h5>
                <h2 className="text-white fw-bold">{totalProjectsForHr}</h2>
            </Col>
            <Col className="py-2 px-3 orange-bg rounded d-flex align-items-center m-2">
                <Link to={'/dashboard/teammembers'} className='text-mute text-decoration-none inline-block'>
                    <h5 className="text-white flex-grow-1">Employee List</h5>
                    <h2 className="text-white fw-bold">{totalEmployees}</h2>
                </Link>
            </Col>
            <Col className="py-2 px-3 green-bg rounded d-flex align-items-center m-2">
                <h5 className="text-white flex-grow-1">Jobs Created</h5>
                <h2 className="text-white fw-bold">{totalJobs}</h2>
            </Col>
        </div>
        }
        {
            // user.role && user.role == "Manager" && 
            <div className=" d-flex justify-content-between">
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
        <div>
             <canvas id="myChart"></canvas>
        </div>
        <Link to="#"  onClick={downloadpdf} >Download Report Page as PDF</Link>
 
        </Container>
        </>
     );
}
 
export default Dashboard;