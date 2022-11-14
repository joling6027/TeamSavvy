import React, { Component } from 'react';
import {Container, Row, Col, Card,CardTitle, Form, FormGroup,Label, Input, Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem, Collapse, Button, CardBody} from 'reactstrap';
import { Link, Outlet } from 'react-router-dom';
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';
import { useEffect } from 'react';
import { useState } from 'react';
import projectpic from '../../assets/img/projects.png';
import teamMembers from '../../assets/img/team-members.png';
import taskpic from '../../assets/img/tasks.png';
import Chart from "chart.js/auto";
import { Line , Bar, Pie} from "react-chartjs-2";
import { DataGrid } from '@mui/x-data-grid';
import 'https://cdn.jsdelivr.net/npm/chart.js';
import { tableItemsdashboard } from "./TableItemsteamDashboard";
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import PieChartIcon from '@mui/icons-material/PieChart';
import './dashboard.css';


import {
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
        .catch((err) => console.log(err.message));
    }

    const GetTaskListByManagerId = () => {
            http.get(GetEndPoints().taskListByManagerId+'/'+user.employeeId)
            .then((res) =>{
               if(res.data.success){
                setTotalTasks(res.data.response.length); 
               }
               else{
                console.log(res);
               }
            })
            .catch((err) => console.log(err.message));
    }

    const GetTeamMembersByManagerId = () => {
        http.get(GetEndPoints().teamMembers+'/'+user.employeeId)
        .then((res) =>{
           if(res.data.success){
            setTotalTeamMember(res.data.response);
           }
        })
        .catch((err) => console.log(err.message));
    }
    
    const GetProjectForHR = () => {
        http.get(GetEndPoints().projectsForHR)
        .then((res) =>{
           if(res.data.success){
            setTotalProjectsForHr(res.data.response.length);
           }
        })
        .catch((err) => console.log(err.message));
    }

    const GetEmployeesForHR = () => {
        http.get(GetEndPoints().employee)
        .then((res) =>{
           if(res.data.success){
            setTotalEmployees(res.data.response.length);
           }
        })
        .catch((err) => console.log(err.message));
    }

    const GetJobsForHR = () => {
        http.get(GetEndPoints().job)
        .then((res) =>{
           if(res.data.success){
            setTotalJos(res.data.response.length);
           }
        })
        .catch((err) => console.log(err.message));
    }
    
      
    useEffect(() =>{
        //for Manager
        if(user.role && user.role == "Manager")
        {
            GetProjects();
            GetTaskListByManagerId();
            GetTeamMembersByManagerId();
        }

        //for HR
        if(user.role && user.role == "HR")
        {
            GetProjectForHR();
            GetEmployeesForHR();
            GetJobsForHR();
        }
   
    },[user.role, user.employeeId])

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const show = () => setDropdownOpen((prevState) => !prevState);

        const [isOpen, setIsOpen] = useState(false);
        const toggle = () => {setIsOpen(!isOpen); setVisible(false)};
        
        const[visible, setVisible ]=useState(false);
        const selectiontoggle = () => setVisible(true);

        const [selected, setSelected] = useState(false);
        const handleChange = event => {
            setSelected(event.target.value);
          };
    
    const columns = [
        
        { field: 'id', headerName: 'Id'},
        { field: 'empname', headerName: 'Employee name',
             sortable:true,
             editable:true},
        { field: 'position', headerName: 'Position'},
        { field: 'project', headerName: 'Project'},
        { field: 'details', headerName: 'Details',  renderCell: (params) => 
        <Link to="${params.row.id}">Update</Link> },
      ];

const labels = ["Project 1","Project 2","Project 3","Project 4","Project 5"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Top 5 progress projects",
      backgroundColor: ["rgb(255, 99, 132)",
      'rgb(196, 200, 102)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)'],
      borderColor: "rgb(255, 99, 132)",
      data: [35, 10, 25, 40, 20, 30, 45],
    },
  ],
};

    return ( 
        <>
         <Container className="px-3">
        {
            user.role && user.role === "HR" && 
            <div className=" d-flex justify-content-between">
            <Col className="py-2 px-3 yellow-bg rounded m-2">
                    <Link to={"/dashboard/projects"} className='d-flex  align-items-center  text-decoration-none justify-content-between'>
                        <div>
                            <img src={projectpic} alt="project"/>
                        </div>
                        <div>
                            <h5 className="text-white">Company Projects</h5>
                            <h2 className="text-white fw-bold m-0 float-end">{totalProjectsForHr}12</h2>
                    </div>
                </Link>
            </Col>
            <Col className="py-2 px-3 orange-bg rounded m-2">
                <Link to={'/dashboard/teammembers'} className='d-flex  align-items-center  text-decoration-none justify-content-between'>
                        <div>
                            <img src={teamMembers} alt="team members"/>
                        </div>
                        <div>
                            <h5 className="text-white">Employee List</h5>
                            <h2 className="text-white fw-bold m-0 float-end">{totalEmployees}123</h2>
                        </div>    
                </Link>
            </Col>
            <Col className="py-2 px-3 green-bg rounded m-2">
                <div className="d-flex  align-items-center  text-decoration-none justify-content-between ">
                        <div>
                            <img src={taskpic} alt="task"/>
                        </div>
                        <div>
                            <h5 className="text-white ">Jobs Created</h5>
                            <h2 className="text-white fw-bold m-0 float-end">{totalJobs}111</h2>
                        </div>
               
                </div>
            </Col>
        </div>
        }
        {
            user.role && user.role === "Manager" && 
            <div className=" d-flex justify-content-between">
            <Col className="py-2 px-3 yellow-bg rounded m-2">
                <Link to={"/dashboard/projects"} className='d-flex  align-items-center  text-decoration-none justify-content-between'>
                        <div>
                            <img src={projectpic} alt="manager project"/>
                        </div>
                        <div>
                            <h5 className="text-white">Projects</h5>
                            <h2 className="text-white fw-bold m-0 float-end">{totalProjects}12</h2>
                    </div>
                </Link>
            </Col>
            <Col className="py-2 px-3 orange-bg rounded m-2">
                <Link to={'/dashboard/teammembers'} className='d-flex  align-items-center  text-decoration-none justify-content-between'>
                        <div>
                            <img src={teamMembers} alt="team members"/>
                        </div>
                        <div>
                    <h5 className="text-white">Team Memebers</h5>
                    <h2 className="text-white fw-bold m-0 float-end">{totalTeamMembers}11</h2>
                    </div>
                </Link>
            </Col>
            <Col className="py-2 px-3 green-bg rounded  m-2">
            <div className="d-flex  align-items-center  text-decoration-none justify-content-between ">
                        <div>
                            <img src={taskpic} alt="task"/>
                        </div>
                        <div>
                <h5 className="text-white">Task Created</h5>
                <h2 className="text-white fw-bold m-0 float-end">{totalTasks}11</h2>
                </div>
            </div>    
            </Col>
        </div>
        }
        
        <Row className="px-2 py-3">
            <Col md={6} className="">
                <Card className="prCard py-5 px-3 border-0">
                    <Bar data={data} />
                </Card>
            </Col>
            <Col md={6} className="">
                <Card className="prCard pt-3 px-3 border-0" >
                    <CardTitle className="small text-muted">Leaves notification</CardTitle>
                    <div style={{ display: 'flex', height: '315px', justifyContent: 'space-between' }}>
                <div style={{width:'100%'}}>
                    <DataGrid className="table-striped border-0" rows={tableItemsdashboard} columns={columns}
                        pageSize={8} 
                        rowsPerPageOptions={[8]}
                        SelectionOnClick
                        onRowClick={e => console.log(e)}
                    />
                </div>
            </div>
                </Card>
            </Col>
        </Row>
        <Row className="px-2 pb-3">
        <Col>
            <Button onClick={toggle}  className="border-0  bg-primary rounded ">
                <div className="text-white">< AddIcon fontSize="small"/> <strong>Add Widget</strong></div>
            </Button>
            <Collapse isOpen={isOpen} className="mb-3 ">
                <Card className="rounded-0 border-0">
                <CardBody>
                <Form>
                         <FormGroup className="d-flex text-muted align-items-center">
                             <h6 className="me-3">Choose for</h6>
                        <FormGroup check >
                            <Label check>
                            <Input type="radio" name="selection"
                            value="1"
                         onClick={selectiontoggle} 
                                />
                            <span className="me-3">Projects </span>
                            </Label> 
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name="selection" value="0"

                            onClick={selectiontoggle}/>
                            <span className="me-3">Employees </span>
                            </Label>
                        </FormGroup>
                        </FormGroup>
                        <div className="d-flex align-items-center justify-content-between">
                        { visible &&
                        <div className="p-0 col-md-4 col-sm-12">
                            
                                <FormGroup>
                                    <Input
                                    id="project"
                                    name="project"
                                    type="select"
                                    onChange={handleChange}
                                    >
                                   
                                    <option>
                                        Select project
                                    </option>
                                    <option>
                                        All projects
                                    </option>
                                    <option>
                                        Project 1
                                    </option>
                                    <option>
                                        Project 2
                                    </option>
                                    </Input>
                                </FormGroup>
                          
                        </div>
                            }
                        {selected &&
                        <div className="p-0 ms-1 d-flex col">
                            
                                <FormGroup className="ms-3 col-md-8 col-sm-12">
                                    <Input
                                    id="project"
                                    name="project"
                                    type="select"
                                    >
                                   
                                    <option>
                                        Select query
                                    </option>
                                    <option>
                                        Query 1
                                    </option>
                                    <option>
                                        Query 2
                                    </option>
                                    <option>
                                        Query 3
                                    </option>
                                    </Input>
                                </FormGroup>
                                <Button className="bg-primary ms-3 mb-3 col-md-3 col-sm-12 buttonPro" type="submit">Create Widget</Button>
                        
                        </div>
                        }
                        </div>     
                    </Form> 
                </CardBody>
                </Card>
            </Collapse>
        </Col>    
        </Row>
        <Row className="px-2 py-2">
            <div className="d-flex align-items-center justify-content-start chartIcons ">
                <span className="prCard p-2 me-3 rounded"> <BarChartIcon color="primary"/></span>
                <span className="prCard p-2 me-3 rounded"> <TimelineIcon color="primary"/></span>
                <span className="prCard p-2 rounded"> <PieChartIcon color="primary"/></span>
            </div>
            <Card className="prCard py-5 px-3 border-0 m-3 w-100">
                    <Bar data={data} />
                </Card>
                <Card className="prCard py-5 px-3 border-0 m-3 w-100">
                    <Line data={data} />
                </Card>
                <Card className="prCard py-5 px-3 border-0 m-3 w-100">
                    <Pie data={data} />
                </Card>
                <Card className="prCard py-5 px-3 border-0 m-3 w-100">
                    <Bar data={data} />
                </Card>
                <Card className="prCard py-5 px-3 border-0 m-3 w-100">
                    <Line data={data} />
                </Card>
                <Card className="prCard py-5 px-3 border-0 m-3 w-100">
                    <Pie data={data} />
                </Card>
               
        </Row>
        </Container>
        </>
     );
}
 
export default Dashboard;