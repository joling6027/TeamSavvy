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
import SweetAlert from "react-bootstrap-sweetalert";
import { employeeProject } from '../models/employeeProject.model';

const TeamMembers = ({user, http}) => {

    const [role, setRole] = useState(user.role);
    const [modal, setModal] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]);
    const [selectTeamMembers, setSelectTeamMembers] = useState();
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState(null);
    const [projects, setProjects] = useState([]);
    const [selectProject, setSelectProject] = useState();
    const [projectDesc, setProjectDesc] = useState();
    const [projectManager, setProjectManager] = useState();
    const [projectMember, setProjectMember] = useState();
    const [employeeName, setEmployeeName] = useState();
    const [employeeId, setEmployeeId] = useState();
    const [projectFormValue, setProjectFormValue] = useState(employeeProject);
    const [assignProject, setassignModal] = useState(false);
    const toggle = () => setModal(!modal);
    const assigntoggle = () => setassignModal(!assignProject);
    console.log(role)

    const GetProjects = () => {
        http.get(GetEndPoints().projects)
        .then((res) =>{
           if(res.data.success){
            console.log(res.data.response);
            setProjects(res.data.response);
            setProjectDesc(res.data.response[0].projectDesc);
            setProjectManager(res.data.response[0].projectManagerName);
            setProjectMember(res.data.response[0].projectTotalEmployees);
            let assignEmpProj = {...res.data.response[0]}
            projectFormValue.projectId = assignEmpProj.projectId
            setProjectFormValue(projectFormValue)
           }
        })
    }

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

    function findUnique(arr, predicate) {
        var found = {};
        arr.forEach(d => {
          found[predicate(d)] = d;
        });
        return Object.keys(found).map(key => found[key]); 
      }
      
    const GetTeamMembersForHr = () =>{
        http.get(GetEndPoints().getTeamMembers)
        .then((res) =>{
            if(res.data.success){
                let empList = [];
                res.data.response.map((emp, index) => empList.push(...emp.employeeList));
                empList = findUnique(empList, d => d.id);
                setData(empList)
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
        if(role == 'Manager')
        {
            GetTeamMembers();
        }

        if(role == 'HR')
        {
            GetTeamMembersForHr();
            GetProjects();
        }
      
    }, user.employeeId)

    const hideAlert = () => {
        setAlert(null);
      };

    const DeleteEmployee =(employeeId)=>{
        http.delete(GetEndPoints().deleteEmployee+'/'+employeeId)
        .then((res) =>{
            if(res.data.success){
                console.log(res.data.response)
                GetTeamMembersForHr();
                hideAlert();
            }
        })
    }
    const handleDelete = (employeeId)=>{
        console.log(employeeId);
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Are you sure!!"
                onConfirm={() => DeleteEmployee(employeeId)}
                onCancel={() => hideAlert()}
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="light"
                btnSize=""
                focusCancelBtn
            >
             Sad to here this.</SweetAlert>
        )
    }

    const handleProject = e => {
        setSelectProject(e.target.value);
        let proj = projects.find((p) => p.projectId === parseInt(e.target.value));
        setProjectDesc(proj.projectDesc);
        setProjectManager(proj.projectManagerName);
        setProjectMember(proj.projectTotalEmployees);
        setProjectFormValue((projectFormValue) =>{
            let assignEmpProj = {...projectFormValue}
            assignEmpProj.projectId = parseInt(e.target.value);
            assignEmpProj.status = true;
            return assignEmpProj
        })

        console.log(e.target.value)

    }

    const assignProj = e =>{
        e.preventDefault();
        toggle();
        AddProject(employeeId);
    }

    const cancelProj = e =>{
        e.preventDefault();
        setSelectProject();
        toggle();
    }

    const AddProject = (employeeId) =>{

        http.post(GetEndPoints().addEmployeeOnProject, {...projectFormValue, employeeId})
        .then((res) => {
            if(res.data.success){
                setAlert(
                    <SweetAlert
                        success
                        style={{ display: "block", marginTop: "-100px" }}
                        title="Project is assigned"
                        onConfirm={() => hideAlert()}
                        onCancel={() => hideAlert()}
                        showCancel
                        confirmBtnText="OK"
                        confirmBtnBsStyle="danger"
                        btnSize=""
                    >
                     Sad to here this.</SweetAlert>)
                     GetTeamMembersForHr();
            }
        })
    }

    const handleBench = (employeeId) =>{
        console.log(employeeId)
        setEmployeeId(employeeId)
        toggle();
        let selectedEmployee = data.find((e) => e.id === employeeId);
        setEmployeeName(selectedEmployee.employeeName)
        console.log(selectedEmployee.employeeName)
    }

    const columns_Manager = [
        { field: 'id', headerName: 'Employee ID', },
        { field: 'employeeName', headerName: 'Name',
             sortable:true,
             editable:true},
        { field: 'department', headerName: 'Department', sortable:true,
        editable:true},
        { field: 'status', headerName: 'Status', sortable:true,
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
        { field: 'status', headerName: 'Status', renderCell: (params) => params.row.status === 'Active' ? 'Active' :<Button className="btn bg-primary" onClick={() => handleBench(params.row.id)}>Bench</Button>, sortable:true,
        editable:true },
        { field: 'position', headerName: 'Position', sortable:true,
        editable:true},
        { field: 'salary', headerName: 'Salary'},
        { field: 'progress', headerName:'Progress', renderCell: (params) => <Progress className="w-100" color="success" value={params.row.progress}/> ,width:200},
        { field: 'details', headerName: 'Details', renderCell: (params) => <Link to={`/dashboard/teammembers/employeedetails/${params.row.id}`} >View</Link> },
        { field: 'icon', headerName: 'Delete', renderCell: (params) => <DeleteIcon value={params.row.id} onClick={() => handleDelete(params.row.id)} color="error"/> }
      ];

    return ( 
        <Container>
            {alert}
            <Card className="prCard" > 
                <CardTitle tag="h5" className="px-3 pt-3" >{  role && role === "HR" ? 'Employee List' : 'Team Members' }
                { 
                    role && role === "HR" && <Link to="/dashboard/teammembers/addemployee"  className="alert-link text-decoration-none float-end linkStyle">
                    <AddCircleIcon/> ADD NEW EMPLOYEE</Link>
                }
               
            </CardTitle>
            <CardBody>
                {role && role === "Manager" && <Row>
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
                </Row>}
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
                                    disabled
                                    value={employeeName}
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
                                    value={selectProject}
                                    onChange={handleProject}
                                    >
                                    {
                                       projects && projects.map((project, index) => <option key={index} value={project.projectId}>{project.projectName}</option>)
                                    }
                                    </Input>
                        </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <h6 className="text-muted">Project Description</h6>
                        <p className="text-muted">{projectDesc}</p>
                        <p className="text-muted">Project Manager <strong>{projectManager}</strong> <span className="ms-2">Team Member <strong> {projectMember}</strong></span></p>
                        </Row>
                    </Form>
                    <div className="d-flex justify-content-center mt-5">
                    <Button className="me-3" color="primary" onClick={assignProj}>
                        Assign 
                    </Button>{' '}
                    <Button color="secondary" onClick={cancelProj}>
                        Cancel
                    </Button>
                    </div>
                    </ModalBody>
                    
                </Modal>

        </Container>    
    );
}
 
export default TeamMembers;