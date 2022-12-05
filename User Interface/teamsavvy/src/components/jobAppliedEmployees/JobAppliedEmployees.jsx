import React, { Component, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {Card, 
    CardTitle, 
    Container, 
    CardBody } from 'reactstrap';
import {Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';


import './jobAppliedEmployee.css';

const JobAppliedEmployees = () => {
    const [pageSize, setPageSize] = useState(10);
    const data = useLocation();

    const { http, user } = AuthService();
    const [applicants, setApplicants] = useState([]);
    const [jobId, setJobId] = useState()
    const [jobName, setJobName] = useState();

    const getJobApplied = () => {
        http.get(GetEndPoints().internalJob + "/jobApplied/" + jobId)
            .then((res) => {
                if (res.data.success) {
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
        { field: 'id', headerName: 'Employee Id', flex:1 },
        { field: 'empname', headerName: 'Employee name',
        flex:1,
             sortable:true,
             editable:true},
        { field: 'dept', headerName: 'Department', flex:1},
        { field: 'position', headerName: 'Position', flex:1},
        {
            field: 'details', headerName: 'Details', renderCell: (params) => <Link to={`/jobs/applied/employeedetails/${params.row.id}`}>View</Link> }
      ];


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
                        components={{
                            Toolbar: GridToolbar,
                          }}
                    />
                </div>
            </div>
            
           
            </CardBody>
       </Card>
        </Container>    
    );
}
}
 
export default JobAppliedEmployees;