import React, { Component, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import Box from '@mui/material/Box';
// import {Link} from '@material-ui/core';
import { tableItems } from "./EmployeeItemsteam";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LinearProgress from '@mui/material/LinearProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';


import './jobAppliedEmployee.css';

const JobAppliedEmployees = () => {
    const [pageSize, setPageSize] = useState(10);
    const data = useLocation();

    const { http, user } = AuthService();
    // const [modal, setModal] = useState(false);
    const [applicants, setApplicants] = useState([]);
    const [jobId, setJobId] = useState()
    const [jobName, setJobName] = useState();
    // const toggle = () => setModal(!modal);

    const getJobApplied = () => {
        http.get(GetEndPoints().internalJob + "/jobApplied/" + jobId)
            .then((res) => {
                if (res.data.success) {
                    // console.log(res.data.response)
                    // setApplicants(res.data.response)
                    let objs = [];
                    objs = [...res.data.response].map((applicant) => {
                        return {
                            id: applicant.employeeId,
                            empname: applicant.employeeFirstname + " " + applicant.employeeLastname,
                            dept: applicant.department.departmentName,
                            position: applicant.role.roleType,
                            details: "<button>View</button>"
                        }
                    })
                    setApplicants(objs);
                }
            })
            .catch((err) => console.log(err.message))
    }

    useEffect(() => {
        if (data.state !== null) {
            localStorage.setItem("jId", data.state.jobId);
            localStorage.setItem("jName", data.state.jobName);
        }
        setJobId(localStorage.getItem('jId'));
        setJobName(localStorage.getItem('jName'));
        getJobApplied();

    }, [jobId, jobName])

    const columns = [
        { field: 'id', headerName: 'Employee Id' },
        { field: 'empname', headerName: 'Employee name',
        width:200,
             sortable:true,
             editable:true},
        { field: 'dept', headerName: 'Department'},
        { field: 'position', headerName: 'Position'},
        {
            field: 'details', headerName: 'Details', renderCell: (params) => <Link to={`/jobs/applied/employeedetails/${params.row.id}`}>View</Link> }
      ];

    // const populateApplicants = (...applicants) => {
    //     console.log(...applicants)

    //     let applicantsObj = [];
    //       applicantsObj = [...applicants].map((applicant) => {
    //         return{
    //             id: applicant.employeeId,
    //             empname: applicant.employeeFirstname + " " + applicant.employeeLastname,
    //             dept: applicant.department.departmentName,
    //             position: applicant.role.roleType,
    //             details: <button>View</button>
    //         }
    //       })
    //       console.log(applicantsObj)
    //       return setApplicantRows(...applicantsObj);
    // }

    if (applicants === undefined || jobId === undefined) {
            return (<div className="d-flex justify-content-center">
            <div className="spinner-grow text-success" style={{width: "3rem", height: "3rem"}} role="status">
            <span className="sr-only">No Applicant applied for this position yet.</span>
            </div>
        </div>);
    } else {
    
    return ( 
        <Container>
            <Card className="prCard" > 
                <CardTitle tag="h5" className="px-3 pt-3" > Employees Applied For: {jobName}
            </CardTitle>
            <CardBody>
            <div style={{ display: 'flex', height: '100%', justifyContent: 'space-between' }}>
                <div style={{width:'100%'}}>
                        <DataGrid className="table-striped border-0" rows={applicants} columns={columns}  
                       pageSize={pageSize}
                       onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                       rowsPerPageOptions={[5, 10, 20,50,100]}
                       pagination
                       SelectionOnClick
                    // onRowClick={e => console.log(e)}
                        components={{
                            Toolbar: GridToolbar,
                          }}
                    />
                </div>
            </div>
            
           
            </CardBody>
       </Card>
       {/* <Modal isOpen={modal} toggle={toggle} backdrop="static" centered>
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
                    
                </Modal> */}

        </Container>    
    );
}
}
 
export default JobAppliedEmployees;