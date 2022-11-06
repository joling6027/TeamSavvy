import React, { Component, useState } from 'react';
import {Link} from 'react-router-dom';
import {Container, Form, FormGroup, Label, Input, FormFeedback, FormText, Row, Col, Modal,  ModalHeader, Button, ModalBody } from 'reactstrap';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './projectDetails.css';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';


const ProjectDetails = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return ( 
        <>
        <Container className="px-3">
        <p className="h4 px-2">Project Name</p>
        <div className=" d-flex justify-content-between">
            <Col className="py-2 px-3 yellow-bg rounded d-flex align-items-center m-2">
                <h5 className="text-white flex-grow-1">Tasks</h5>
                <h2 className="text-white fw-bold">150</h2>
            </Col>
            <Col className="py-2 px-3 orange-bg rounded d-flex align-items-center m-2">
                <h5 className="text-white flex-grow-1">In-Progress</h5>
                <h2 className="text-white fw-bold">105</h2>
            </Col>
            <Col className="py-2 px-3 green-bg rounded d-flex align-items-center m-2">
                <h5 className="text-white flex-grow-1">Completed</h5>
                <h2 className="text-white fw-bold">40</h2>
            </Col>
        </div>
        <div className="d-flex mt-1">
            <Col className="rounded m-2 prCard">
                <h5 className="d-inline-block p-3">Tasks</h5> 
                <Link to=""  onClick={toggle} className="alert-link float-end text-uppercase text-decoration-none linkStyle px-3 pt-3">
                <AddCircleIcon/> Create Task</Link>
                <ul class="list-group p-3">
                    <li class="list-group-item border-end-0 border-bottom-0 border-start-0 rounded-0 px-0 py-3 border-top">
                        <h6>Create model for Database</h6>
                        <p className="text-muted">Tables required for database are Employee, Leaves, Payroll. Think about topples and columns.</p>
                        <p className="text-muted">Assigned to <strong>John Doe</strong></p>
                        <Link to=""  className="alert-link text-uppercase text-decoration-none linkStyle">Modify Task</Link>
                    </li>
                    <li class="list-group-item border-end-0 border-bottom-0 border-start-0 rounded-0 px-0 py-3 border-top">
                        <h6>Create model for Database</h6>
                        <p className="text-muted">Tables required for database are Employee, Leaves, Payroll. Think about topples and columns.</p>
                        <p className="text-muted">Assigned to <strong>John Doe</strong></p>
                        <Link to=""  className="alert-link text-uppercase text-decoration-none linkStyle">Modify Task</Link>
                    </li>
                    <li class="list-group-item border-end-0 border-bottom-0 border-start-0 rounded-0 px-0 py-3 border-top">
                        <h6>Create model for Database</h6>
                        <p className="text-muted">Tables required for database are Employee, Leaves, Payroll. Think about topples and columns.</p>
                        <p className="text-muted">Assigned to <strong>John Doe</strong></p>
                        <Link to=""  className="alert-link text-uppercase text-decoration-none linkStyle">Modify Task</Link>
                    </li>
                </ul>
            </Col>
            <Col className="rounded m-2 prCard">
                <h5 className="d-inline-block p-3">In-Progress</h5> 
                <ul class="list-group p-3">
                    <li class="list-group-item border-end-0 border-bottom-0 border-start-0 rounded-0 px-0 py-3 border-top">
                        <h6>Create model for Database</h6>
                        <p className="text-muted">Tables required for database are Employee, Leaves, Payroll. Think about topples and columns.</p>
                        <p className="text-muted">Assigned to <strong>John Doe</strong></p>
                        <p className="text-muted"><UpdateOutlinedIcon/> Hours <strong>12</strong></p>
                    </li>
                    <li class="list-group-item border-end-0 border-bottom-0 border-start-0 rounded-0 px-0 py-3 border-top">
                        <h6>Create model for Database</h6>
                        <p className="text-muted">Tables required for database are Employee, Leaves, Payroll. Think about topples and columns.</p>
                        <p className="text-muted">Assigned to <strong>John Doe</strong></p>
                        <p className="text-muted"><UpdateOutlinedIcon/> Hours <strong>12</strong></p>
                    </li>
                    
                </ul>
            </Col>
            <Col className="rounded m-2 prCard">
                <h5 className="d-inline-block p-3">Completed</h5> 
                <ul class="list-group p-3">
                    <li class="list-group-item border-end-0 border-bottom-0 border-start-0 rounded-0 px-0 py-3 border-top">
                        <h6>Create model for Database</h6>
                        <p className="text-muted">Tables required for database are Employee, Leaves, Payroll. Think about topples and columns.</p>
                        <p className="text-muted">COmpleted by <strong>John Doe</strong></p>
                        <p className="text-muted"><UpdateOutlinedIcon/> Hours <strong>12</strong></p>
                    </li>
                    <li class="list-group-item border-end-0 border-bottom-0 border-start-0 rounded-0 px-0 py-3 border-top">
                        <h6>Create model for Database</h6>
                        <p className="text-muted">Tables required for database are Employee, Leaves, Payroll. Think about topples and columns.</p>
                        <p className="text-muted">Completed by<strong>John Doe</strong></p>
                        <p className="text-muted"><UpdateOutlinedIcon/> Hours <strong>12</strong></p>
                    </li>
                    
                </ul>
            </Col>
         
        </div>
        <Modal isOpen={modal} toggle={toggle} backdrop="static" centered>
                    <ModalHeader>  <h4>Create Task</h4> </ModalHeader>
                    <ModalBody>
                        <Form>
                        <FormGroup>
                            <Label className="mt-2 mb-1" for="title">
                            Title
                            </Label>
                            <Input
                            id="title"
                            name="title"
                            type="text"
                            valid
                            
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="mt-2 mb-1" for="description">
                            Description
                            </Label>
                            <Input
                            id="title"
                            name="title"
                            type="textarea"
                            invalid
                            
                            />
                        </FormGroup>
                        <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label className="mt-2 mb-1" for="estimatedHours">
                                Estimated Hours
                                </Label>
                                <Input
                                id="estimatedHours"
                                name="estimatedHours"
                                type="text"
                                
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                        <FormGroup>
                <Label className=""  for="assignTo">
                           Assign to
                            </Label>
                            <Input
                            id="assignTo"
                            name="assignTo"
                            type="select"
                            >
                            <option>
                                Employee 1
                            </option>
                            <option>
                                Employee 2
                            </option>
                            <option>
                                Employee 3
                            </option>
                            <option>
                                Employee 4
                            </option>
                            <option>
                                Employee 5
                            </option>
                            </Input>
                    </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label className="mt-3  mb-1" for="startdate">
                                Start Date
                                </Label>
                                <Input
                                id="startdate"
                                name="startdate"
                                type="date"
                                />
                            </FormGroup>       
                        </Col>
                        </Row>
                    </Form>
                    <div className="d-flex justify-content-center mt-5">
                    <Button className="me-3" color="primary" onClick={toggle}>
                        Create Task
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                    </div>
                    </ModalBody>
                    
                </Modal>
        
        </Container>
        </>
     );
}
 
export default ProjectDetails;

