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
import { tableItems } from "./EmployeeItemsteam";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LinearProgress from '@mui/material/LinearProgress';
import DeleteIcon from '@mui/icons-material/Delete';


import './jobAppliedEmployee.css';

const ProjectList = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const columns = [
        { field: 'id', headerName: 'Employee Id',width:200 },
        { field: 'empname', headerName: 'Employee name',
        width:200,
             sortable:true,
             editable:true},
        { field: 'dept', headerName: 'Dept',width:200},
        { field: 'position', headerName: 'Position', width:200},
        { field: 'details', headerName: 'Details', width:200, renderCell: (params) => <Link to="${params.row.id}">View</Link> },
      ];
    
    return ( 
        <Container>
            <Card className="prCard" > 
                <CardTitle tag="h5" className="px-3 pt-3" > Employees List
            </CardTitle>
            <CardBody>
            <div style={{ display: 'flex', height: '100%', justifyContent: 'space-between' }}>
                <div style={{width:'100%'}}>
                    <DataGrid className="table-striped" rows={tableItems} columns={columns}  
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
 
export default ProjectList;