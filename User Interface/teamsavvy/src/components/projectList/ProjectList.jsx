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
FormFeedback} from 'reactstrap';
import {Link} from 'react-router-dom';
import { tableItems } from "./TableItems";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './projectList.css';
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';

const ProjectList = () => {
    
    const columns = [
        { field: 'id', headerName: 'Id', },
        { field: 'projectname', headerName: 'Project name',
             sortable:true,
             editable:true},
        { field: 'tasks', headerName: 'Tasks'},
        { field: 'team', headerName: 'Team members'},
        { field: 'budget', headerName: 'Budget' },
        { field: 'description', headerName: 'Descritpion' , width:300},
        { field: 'details', headerName: 'Details',  renderCell: (params) => 
        <Link to="${params.row.id}">View</Link> },
      ];

      //create project modal
      const [modal, setModal] = useState(false);
      const toggle = () => setModal(!modal);

      //vars
      const [projects, setProjects] = useState();

    const { http, user } = AuthService();
    const userID = user.employeeId;
    const userName = user.firstName;
    console.log(userName)

    const getProject = () => {
        http.get(GetEndPoints().projects)
        .then((res) =>{

            console.log(res.data.response);
            let objs = [];
            objs = [...res.data.response].map((project) => {
                console.log(project.projectManagerName.toLowerCase())
                console.log(userName)
                if (project.projectManagerName === userName){
                    console.log("I'm in")
                    // return {
                    //     id: project.projectId,
                    //     projectname: project.projectName,
                    //     team: project.projectTotalEmployees,
                    //     budget: project.projectBudget,
                    //     description: project.projectDesc,
                    //     details: "<button>View</button>"
                    // }
                }else{
                    return "";
                }
            })
            setProjects(objs);
            console.log(objs)

        }).catch((err) => console.log(err.message))
    }

    useEffect(() => {
        getProject();

    }, [])

    if(projects === undefined){
       
            return (<div class="d-flex justify-content-center">
            <div class="spinner-grow text-success" style={{width: "3rem", height: "3rem"}} role="status">
            <span class="sr-only">Loading.....</span>
            </div>
        </div>);
        
    }else{
      
    return ( 
        <Container>
        {projects}
            <Card className="prCard" > 
                <CardTitle tag="h5" className="px-3 pt-3" > Projects 
            <Link to="" onClick={toggle} className="alert-link text-decoration-none float-end linkStyle">
                <AddCircleIcon/> CREATE PROJECT</Link>
            </CardTitle>
            <CardBody style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
                 <DataGrid rows={tableItems} columns={columns}  
                    pageSize={8} 
                    rowsPerPageOptions={[8]}
                    SelectionOnClick
                    onRowClick={e => console.log(e)}
                    />
            </div>
            <Modal isOpen={modal} toggle={toggle} backdrop="static" centered>
                    <ModalHeader>  <h4>Create Project</h4> </ModalHeader>
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
                                <Label className="mt-2 mb-1" for="budget">
                                Budget ($)
                                </Label>
                                <Input
                                id="budget"
                                name="budget"
                                type="text"
                                
                                />
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
                        <Col md={6}>
                            <FormGroup>
                                <Label className="mt-3  mb-1" for="deadline">
                                Deadline
                                </Label>
                                <Input
                                
                                id="deadline"
                                name="deadline"
                                placeholder="01/09/2022"
                                type="date"
                                />

                            </FormGroup>       
                        </Col>
                        </Row>
                        <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label className="mt-3  mb-1" for="clientName">
                                Client Name
                                </Label>
                                <Input
                                
                                id="clientName"
                                name="clientName"
                                type="text"
                                
                                />
                                <FormFeedback>
                                    Oh noes! that name is already taken
                                </FormFeedback>
                            </FormGroup>       
                        </Col>
                        </Row>
                    </Form>
                    <div className="d-flex justify-content-center mt-5">
                    <Button className="me-3" color="primary" onClick={toggle}>
                        Create Project
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                    </div>
                    </ModalBody>
                    
                </Modal>
            </CardBody>
       </Card>

        </Container>    
    );
}
}
 
export default ProjectList;