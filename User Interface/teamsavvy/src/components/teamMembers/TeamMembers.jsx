import React, { Component, useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

import './teamMembers.css';
import { GetEndPoints } from '../utilities/EndPoints';
import SweetAlert from "react-bootstrap-sweetalert";
import { employeeProject } from '../models/employeeProject.model';
import AuthService from '../services/authService';

const TeamMembers = () => {

    const { user, http } = AuthService();
    const [modal, setModal] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]);
    const [selectTeamMembers, setSelectTeamMembers] = useState();
    const [data, setData] = useState();
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
    const [currProj, setCurrProj] = useState();
    const [pageSize, setPageSize] = useState(10);
    const GetProjects = () => {
        http.get(GetEndPoints().projects)
        .then((res) =>{
           if(res.data.success){
            setProjects(res.data.response);
            
            setSelectProject(res.data.response[0].id)
            setProjectDesc(res.data.response[0].description);
            setProjectManager(res.data.response[0].projectManagerName);
            setProjectMember(res.data.response[0].team);
            let assignEmpProj = {...res.data.response[0]}
            projectFormValue.projectId = assignEmpProj.id
            setProjectFormValue(projectFormValue)
           }
        })
    }

    const GetTeamMembers = () =>{
        http.get(GetEndPoints().getTeamMembers+'/'+user.employeeId)
        .then((res) =>{
            if(res.data.success){
                setTeamMembers(res.data.response);
                setCurrProj(res.data.response[0].projectId)
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
                empList = findUnique(res.data.response, d => d.id);
                setData(empList)
            }
        })
        
    }

    const handleChange = e =>{
        const {name, value} = e.target;
        setCurrProj(value)
        let {employeeList} = teamMembers.find((m) => m.projectId === parseInt(value));
        setData(employeeList)
    }

    useEffect(()=>{
        if(user.role == 'Manager')
        {
            GetTeamMembers();
        }

        if(user.role == 'HR')
        {
            GetTeamMembersForHr();
            GetProjects();
        }
      
    }, [user.role, user.employeeId])

    const hideAlert = () => {
        setAlert(null);
      };

    const DeleteEmployee =(employeeId)=>{
        http.delete(GetEndPoints().deleteEmployee+'/'+employeeId)
        .then((res) =>{
            if(res.data.success){
                GetTeamMembersForHr();
                hideAlert();
            }
        })
    }
    const handleDelete = (employeeId)=>{
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
        let proj = projects.find((p) => p.id === parseInt(e.target.value));
        setProjectDesc(proj.description);
        setProjectManager(proj.projectManagerName);
        setProjectMember(proj.team);
        setProjectFormValue((projectFormValue) =>{
            let assignEmpProj = {...projectFormValue}
            assignEmpProj.projectId = parseInt(e.target.value);
            assignEmpProj.status = true;
            return assignEmpProj
        })

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
                        confirmBtnText="OK"
                        confirmBtnBsStyle="success"
                    >
                     Nice to see you.</SweetAlert>)
                     GetTeamMembersForHr();
            }
        })
    }

    const handleBench = (employeeId) =>{
        GetProjects();
        setEmployeeId(employeeId)
        toggle();
        let selectedEmployee = data.find((e) => e.id === employeeId);
        setEmployeeName(selectedEmployee.employeeName)
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })


    const columns_Manager = [
        { field: 'id', headerName: 'Employee ID',flex:1},
        { field: 'employeeName', headerName: 'Name',
             sortable:true,
             editable:true,flex:1},
        { field: 'department', headerName: 'Department', sortable:true,
        editable:true, flex:1},
        { field: 'status', headerName: 'Status', sortable:true,
        editable:true,flex:1 },
        { field: 'position', headerName: 'Position', sortable:true,
        editable:true, flex:1},
        { field: 'salary', headerName: 'Salary', editable: false, renderCell: (params) => formatter.format(params.row.salary) ,flex:1},
        { field: 'progress', headerName:'Progress',flex:1, renderCell: (params) => <><Progress className="w-100 " color="success" value={params.row.progress}/><span className='mx-2' >{params.row.progress}%</span></> },
        { field: 'details', headerName: 'Details', flex:1, renderCell: (params) => <Link to={`/dashboard/teammembers/employeedetails/${params.row.id}/${currProj}`} >View</Link>},
        
      ];
      
      const columns_HR = [
        { field: 'id', headerName: 'Employee ID',flex:1 },
        { field: 'employeeName', headerName: 'Name',
             sortable:true,
             editable:true,
             flex:1},
        { field: 'department', headerName: 'Department', sortable:true,
        editable:true,flex:1},
        { field: 'status', headerName: 'Status', renderCell: (params) => params.row.status === 'Active' ? 'Active' :<Button className="btn bg-primary" onClick={() => handleBench(params.row.id)}>Bench</Button>, sortable:true,
        editable:true,flex:1,Width:300},
        { field: 'position', headerName: 'Position', sortable:true,
        editable:true, flex:1},
          { field: 'salary', headerName: 'Salary', editable: false, renderCell: (params) => formatter.format(params.row.salary), flex:1 },
        { field: 'progress', headerName:'Progress',flex:2, renderCell: (params) => <><Progress className="w-50" color="success" value={params.row.progress} /><span className='mx-2' >{params.row.progress}%</span></> },
        { field: 'details', headerName: 'Details',flex:1, renderCell: (params) => <Link to={`/dashboard/teammembers/employeedetails/${params.row.id}`} >View</Link> },
        { field: 'icon', headerName: 'Delete',flex:1, renderCell: (params) => <DeleteIcon value={params.row.id} onClick={() => handleDelete(params.row.id)} color="error"/> }
      ];

    if(data === undefined)
    {
        return (<div className="d-flex justify-content-center">
        <div className="spinner-grow text-success" style={{width: "3rem", height: "3rem"}} role="status">
        <span className="sr-only">Loading.....</span>
        </div>
    </div>);
    }
    else{
        return ( 
            <div className="px-3">
                {alert}
                <Card className="prCard" > 
                    <CardTitle tag="h5" className="px-3 pt-3" >{  user.role && user.role === "HR" ? 'Employee List' : 'Team Members' }
                    { 
                        user.role && user.role === "HR" && <Link to="/dashboard/teammembers/addemployee"  className="alert-link text-decoration-none float-md-end pt-md-0 pt-sm-2 linkStyle">
                        <AddCircleIcon/> ADD NEW EMPLOYEE</Link>
                    }
                   
                </CardTitle>
                <CardBody>
                    {user.role && user.role === "Manager" && <Row>
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
                                value={currProj}
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
                    <div className="d-flex justify-content-around">
                        <DataGrid className="responsive d-flex table-striped"
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 20,50,100]}
                            pagination
                            rows={data} 
                            columns={ user.role === "Manager" ? columns_Manager : columns_HR}  
                            components={{
                                Toolbar: GridToolbar,
                              }}
                             
                        />
                    </div>
                
               
                </CardBody>
           </Card>
           <Modal isOpen={modal} toggle={toggle} backdrop="static" centered size="lg">
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
                                           projects && projects.map((project, index) => <option key={index} value={project.id}>{project.projectName}</option>)
                                        }
                                        </Input>
                            </FormGroup>
                            </Col>
                            </Row>
                            <Row>
                            <h6 className="text-muted">Project Description</h6>
                            <p className="text-muted truncate">{projectDesc}</p>
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
    
            </div>    
        );
    }
   
}
 
export default TeamMembers;