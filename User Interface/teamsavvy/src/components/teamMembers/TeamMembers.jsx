import React, { Component, useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Card, 
    CardTitle, 
    Container, 
    CardBody, 
    Modal, 
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    Button,
FormFeedback,
Progress} from 'reactstrap';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
// import {Link} from '@material-ui/core';
import { tableItems } from "./TableItemsteam";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LinearProgress from '@mui/material/LinearProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthService from '../services/authService';

import './teamMembers.css';
import { GetEndPoints } from '../utilities/EndPoints';

const TeamMembers = ({user, http}) => {

    const [role, setRole] = useState(user.role);
    const [modal, setModal] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]);
    const [selectTeamMembers, setSelectTeamMembers] = useState();
    const [data, setData] = useState([]);
    const toggle = () => setModal(!modal);
    console.log(role)
    console.log(role === "Manager")

    const GetTeamMembers = () =>{
        http.get(GetEndPoints().getTeamMembers+'/'+user.employeeId)
        .then((res) =>{
            if(res.data.success){
                console.log(res.data.response)
                setTeamMembers(res.data.response);
                console.log(res.data.response[0].employeeList)
                setData(res.data.response[0].employeeList)
            }
        })
        
    }

    const handleChange = e =>{
        const {name, value} = e.target;
        let {employeeList} = teamMembers.find((m) => m.projectId === parseInt(value));
        setData(employeeList)
        console.log(value);
    }
    useEffect(()=>{
        GetTeamMembers();
    }, user.employeeId)
    const handleDelete = e=>{
        window.alert();
    }

    const columns_Manager = [
        { field: 'id', headerName: 'Employee ID', },
        { field: 'employeeName', headerName: 'Name',
             sortable:true,
             editable:true},
        { field: 'department', headerName: 'Department', sortable:true,
        editable:true},
        { field: 'status', headerName: 'Status', renderCell: (params) => params.row.status ? 'Active' :<Button className="btn bg-primary" onClick={toggle}>Bench</Button>, sortable:true,
        editable:true },
        { field: 'position', headerName: 'Position', sortable:true,
        editable:true},
        { field: 'salary', headerName: 'Salary'},
        { field: 'progress', headerName:'Progress', renderCell: (params) => <Progress className="w-100" color="success" value={params.row.progress}/> ,width:200},
        { field: 'details', headerName: 'Details', renderCell: (params) => <Link to={`/dashboard/teammembers/employeedetails/${params.row.id}`} >View</Link> },
      ];
      
      const columns_HR = [
        { field: 'id', headerName: 'Employee ID', },
        { field: 'employeeName', headerName: 'Name',
             sortable:true,
             editable:true},
        { field: 'department', headerName: 'Department', sortable:true,
        editable:true},
        { field: 'status', headerName: 'Status', renderCell: (params) => params.row.status ? 'Active' :<Button className="btn bg-primary" onClick={toggle}>Bench</Button>, sortable:true,
        editable:true },
        { field: 'position', headerName: 'Position', sortable:true,
        editable:true},
        { field: 'salary', headerName: 'Salary'},
        { field: 'progress', headerName:'Progress', renderCell: (params) => <Progress className="w-100" color="success" value={params.row.progress}/> ,width:200},
        { field: 'details', headerName: 'Details', renderCell: (params) => <Link to={`${params.row.id}`}>View</Link> },
        { field: 'icon', headerName: 'Delete', renderCell: (params) => <DeleteIcon value={params.row.id} onClick={handleDelete} color="error"/> }
      ];

    return ( 
        <Container>
            <Card className="prCard" > 
                <CardTitle tag="h5" className="px-3 pt-3" >{  role && role === "HR" ? 'Employee List' : 'Team Members' }
                { 
                    role && role === "HR" && <Link to="/dashboard/teammembers/addemployee"  className="alert-link text-decoration-none float-end linkStyle">
                    <AddCircleIcon/> ADD NEW EMPLOYEE</Link>
                }
               
            </CardTitle>
            <CardBody>
                <Row>
                    <Col md={6}>
                <Form>
                    <FormGroup>
                <Label className="mt-3 mb-2 "  for="projects">
                           Select Project
                            </Label>
                            <Input
                            id="projects"
                            name="projects"
                            type="select"
                            value={selectTeamMembers}
                            onChange={handleChange}
                            >
                            {
                                teamMembers && teamMembers.map((member, index) => <option key={index} value={member.projectId}>{member.projectName}</option>)
                            }
                            </Input>
                    </FormGroup>
                </Form>
                </Col>
                </Row>
            <div style={{ display: 'flex', height: '100%', justifyContent: 'space-between' }}>
                <div style={{width:'100%'}}>
                    <DataGrid className="table-striped" rows={data} columns={ role === "Manager" ? columns_Manager : columns_HR}  
                        pageSize={8} 
                        rowsPerPageOptions={[8]}
                        SelectionOnClick
                        onRowClick={e => console.log(e)}
                    />
                </div>
            </div>
            
           
            </CardBody>
       </Card>
       <Modal isOpen={modal} toggle={toggle} backdrop="static" centered>
                    <ModalHeader>  <h4>Assign Project</h4> </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row>
                                <Col>
                                 <FormGroup>
                                    <Label className="mt-2 mb-1" for="employee">
                                    Employee name
                                    </Label>
                                    <Input
                                    id="empname"
                                    name="empname"
                                    type="text"
                                    valid
                                    />
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                        <Col>
                        <FormGroup>
                        <Label className=""  for="projectname">
                                Project
                                    </Label>
                                    <Input
                                    id="projectname"
                                    name="projectname"
                                    type="select"
                                    >
                                    <option>
                                        Project 1                                        
                                    </option>
                                    <option>
                                        Project 2
                                    </option>
                                    <option>
                                        Project 3
                                    </option>
                                    <option>
                                        Project 4
                                    </option>
                                    <option>
                                        Project 5
                                    </option>
                                    </Input>
                        </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <h6 className="text-muted">Project Description</h6>
                        <p className="text-muted"> Lorem ipsum dolor sit amet. Nam voluptatibus tempore et distinctio natus eum magni quae est accusamus aspernatur.</p>
                        <p className="text-muted">Project Manager <strong>Ben Darek</strong> <span className="ms-2">Team Member <strong> 12</strong></span></p>
                        </Row>
                    </Form>
                    <div className="d-flex justify-content-center mt-5">
                    <Button className="me-3" color="primary" onClick={toggle}>
                        Assign 
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                    </div>
                    </ModalBody>
                    
                </Modal>

        </Container>    
    );
}
 
export default TeamMembers;