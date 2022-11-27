import React, { Component, useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
    Card,
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
} from "reactstrap";
import { Link } from "react-router-dom";
import { tableItems } from "./TableItems";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from '@mui/icons-material/Delete';
import SweetAlert from "react-bootstrap-sweetalert";
import "./projectList.css";
import AuthService from "../services/authService";
import { GetEndPoints } from "../utilities/EndPoints";

const ProjectList = () => {
    const { http, user } = AuthService();
    const [pageSize, setPageSize] = useState(10);
    // createOn date data
    const newDate = new Date();
    const d = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const today = `${year}-${month.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;

    const columns = [
        { field: "id", headerName: "Id" },
        {
            field: "projectName",
            headerName: "Project name",
            sortable: true,
            editable: true,
        },
        { field: "tasks", headerName: "Tasks"},
        { field: "team", headerName: "Team members" },
        { field: "projectManagerName", headerName: "Manager Name" },
        { field: "projectManagerId", headerName: "Manager ID"},
        { field: "budget", headerName: "Budget" },
        { field: "description", headerName: "Descritpion", width: 300 },
        {
            field: "details",
            headerName: "Details",
            renderCell: (params) => (
                <Link to={`/dashboard/projects/projectdetail/${params.row.id}`} state={params.row.projectManagerId}>View</Link>
            ),
        },
        { field: 'icon', headerName: 'Delete', renderCell: (params) => <DeleteIcon value={params.row.id} onClick={() => handleDelete(params.row.id)} color="error" />
        },
    ];

    //currency formatter
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

//     const currencyFormatter = (params) => {
//         return '$' + formatNumber(params.value);
//     };

//     const formatNumber = (number) => {
//   // this puts commas into the number eg 1000 goes to 1,000,
//   // i pulled this from stack overflow, i have no idea how it works
//   return Math.floor(number)
//     .toString()
//     .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
// };

    //alert
    const [alert, setAlert] = useState(null);

    //create project modal
    const [modal, setModal] = useState(false);

    //toggle - clear data when opening/ closing
    const toggle = () => {
        setProjectTitle();
        setProjectDescription();
        setProjectEstimateTasks();
        setProjectBudget();
        setProjectStartDate();
        setProjectEndDate();
        setProjectClientName();

        //validation
        setProjectTitleValidate(false);
        setProjectDescriptionValidate(false);
        setProjectBudgetValidate(false);
        setProjectStartDateValidate(false);
        setProjectEndDateValidate(false);
        setProjectClientNameValidate(false);

        setModal(!modal);
    };
    //general vars
    const userID = user.employeeId;
    const userName = user.firstName;
    const [projects, setProjects] = useState();
    // const [ projectManagerIdList, setProjectManagerIdList] = useState();

    //create project vars
    const [projectTitle, setProjectTitle] = useState();
    const [projectDescription, setProjectDescription] = useState();
    const [projectEstimateTasks, setProjectEstimateTasks] = useState();
    const [projectBudget, setProjectBudget] = useState();
    const [projectStartDate, setProjectStartDate] = useState();
    const [projectEndDate, setProjectEndDate] = useState();
    const [projectClientName, setProjectClientName] = useState();

    //validation
    const [projectTitleValidate, setProjectTitleValidate] = useState(false);
    const [projectDescriptionValidate, setProjectDescriptionValidate] =
        useState(false);
    const [projectBudgetValidate, setProjectBudgetValidate] = useState(false);
    const [projectEstimateTasksValidate, setProjectEstimateTasksValidate] =
        useState(false);
    const [projectStartDateValidate, setProjectStartDateValidate] =
        useState(false);
    const [projectEndDateValidate, setProjectEndDateValidate] = useState(false);
    const [projectClientNameValidate, setProjectClientNameValidate] =
        useState(false);

    const getManagerProjects = () => {
        http
            .get(GetEndPoints().projects + "/" + user.employeeId)
            .then((res) => {
                console.log(res.data.response);
                setProjects(res.data.response);
                // let objs = [];

                // if (user.role === "HR" || user.role === "Admin") {
                //     objs = [...res.data.response];
                // } else {
                //     objs = [...res.data.response].filter(
                //         (project) =>
                //             project.projectManagerName.trim().toLowerCase() ===
                //             userName.trim().toLowerCase()
                //     );
                //     console.log(res.data.response[0].projectManagerName);
                //     console.log(userName);
                // }


                // objs = [...res.data.response].filter((project) => project.projectManagerName.trim().toLowerCase() === userName.trim().toLowerCase());

                // console.log(objs);

                // let structuredProjects = [];
                // these are structured projects
                // for (let i = 0; i < objs.length; i++) {
                //     structuredProjects.push({
                //         "id": objs[i].projectId,
                //         "projectname": objs[i].projectName,
                //         "projectManagerName": objs[i].projectManagerName,
                //         "projectManagerId": objs[i].projectManagerId,
                //         "tasks": objs[i].totalTaskCount,
                //         "team": objs[i].projectTotalEmployees,
                //         "budget": formatter.format(objs[i].projectBudget),
                //         "description": objs[i].projectDesc,
                //         "details": `<a href="javaScript.void(0);"> View</a>`,
                //     });
                // }

                // setProjects(structuredProjects);
                // console.log(structuredProjects);
                // let managerIdList = [];
                // for(let i = 0; i < objs.length; i++){
                //     managerIdList.push(objs[i].projectManagerId);
                // }
                // console.log(managerIdList);
                // setProjectManagerIdList(managerIdList);
            })
            .catch((err) => console.log(err.message));
    };

    const getProjects = () => {
        http.get(GetEndPoints().projects)
        .then((res) => {
            if(res.data.success)
                setProjects(res.data.response);
        }).catch((err) => console.log(err.message));
    }

    const DeleteProject = (projectId) => {
        http.delete(GetEndPoints().deleteProject + '/' + projectId)
            .then((res) => {
                if (res.data.success) {
                    getProjects();
                    hideAlert();
                }
            }).catch((err) => console.log(err.message))
    }
    const handleDelete = (projectId) => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Are you sure you want to delete this project?"
                onConfirm={() => DeleteProject(projectId)}
                onCancel={() => hideAlert()}
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="light"
                btnSize=""
                focusCancelBtn
            >
            </SweetAlert>
        )
    }

    const hideAlert = () => {
        setAlert(null);
    };

    useEffect(() => {
        if(user.role === 'Manager'){
            getManagerProjects();
        }else{
            getProjects();
        }
        
    }, []);

    // modal data handling
    const titleChangeHandler = (e) => {
        if (e.target.value.trim() !== "") {
            setProjectTitle(e.target.value);
            setProjectTitleValidate(false);
        } else {
            setProjectTitleValidate(true)
        }
    };
    const descriptionChangeHandler = (e) => {
        if (e.target.value.trim() !== "") {
            setProjectDescriptionValidate(false)
            setProjectDescription(e.target.value);
        } else {
            setProjectDescriptionValidate(true)
        }

    };
    const projectTaskChangeHandler = (e) => {
        if (e.target.value !== "") {
            setProjectEstimateTasksValidate(false);
            setProjectEstimateTasks(e.target.value)
        } else {
            setProjectEstimateTasksValidate(true);
        }
    };
    const budgetChangeHandler = (e) => {
        if (e.target.value !== "") {
            setProjectBudgetValidate(false);
            setProjectBudget(e.target.value)
        } else {
            setProjectBudgetValidate(true);
        }
    };
    const startDateChangeHandler = (e) => {
        const dateStartDate = Date.parse(e.target.value);
        if (dateStartDate >= Date.parse(today)) {
            setProjectStartDateValidate(false);
            setProjectStartDate(e.target.value);
        } else {
            setProjectStartDateValidate(true);
        }
    };
    const deadlineChangeHandler = (e) => {
        const dateEndDate = Date.parse(e.target.value);
        if (dateEndDate >= Date.parse(today)) {
            setProjectEndDateValidate(false);
            setProjectEndDate(e.target.value);
        } else {
            setProjectEndDateValidate(true);
        }

    };
    const clientNameChangeHandler = (e) => {
        if (e.target.value !== "") {
            setProjectClientNameValidate(false);
            setProjectClientName(e.target.value)
        } else {
            setProjectClientNameValidate(true);
        }
    };

    const postCreateProject = (projectData) => {
        // delete projectData.id;
        http
            .post(GetEndPoints().addProject, { ...projectData })
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data.response);
                    console.log("post succeed");
                    getManagerProjects();
                }
            })
            .catch((err) => console.log(err.message));
            
    };

    const createProjectsubmitHandler = (e) => {
        e.preventDefault();

        const dateStartDate = Date.parse(projectStartDate);
        const dateDeadline = Date.parse(projectEndDate);

        if (projectTitle === undefined || projectTitle.trim() === "") {
            setProjectTitleValidate(true);
            return;
        } else if (
            projectDescription === undefined ||
            projectDescription.trim() === ""
        ) {
            setProjectDescriptionValidate(true);
            return;
        } else if (
            projectEstimateTasks === undefined ||
            projectEstimateTasks === ""
        ) {
            setProjectEstimateTasksValidate(true);
            return;
        } else if (projectStartDate === undefined || projectStartDate === "") {
            setProjectStartDateValidate(true);
            return;
        } else if (projectEndDate === undefined || projectEndDate === "") {
            setProjectEndDateValidate(true);
            return;
        } else if (dateStartDate > dateDeadline) {
            //   setProjectStartDateValidate(true);
            setProjectEndDateValidate(true);
            return;
        }
        if (dateDeadline < dateStartDate) {
            console.log("deadline date shouldn't be earlier than start date");
            return;
        } else {
            const projectData = {
                id: Math.random(),
                projectName: projectTitle,
                projectStartDate: projectStartDate,
                projectEndDate: projectEndDate,
                projectBudget: projectBudget,
                projectDesc: projectDescription,
                totalTaskCount: +projectEstimateTasks,
                totalCompletedCount: 0,
                projectManagerId: userID,
                projectManagerName: userName,
                projectClient: projectClientName,
                projectLead: userName,
                projectTotalEmployees: 0,
                employeeProjectStatus: true,
            };

            console.log(...projects);
            console.log(projectData);

            postCreateProject(projectData);
            
            
            toggle();
        }
    };

    if (projects === undefined) {
        return (
            <div class="d-flex justify-content-center">
                <div
                    class="spinner-grow text-success"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                >
                    <span class="sr-only">Loading.....</span>
                </div>
            </div>
        );
    } else {
        return (
            <Container>
                { alert }
                <Card className="prCard">
                    <CardTitle tag="h5" className="px-3 pt-3">
                        {" "}
                        Projects
                        {user.role === "Manager" ? (
                            <Link
                                to=""
                                onClick={toggle}
                                className="alert-link text-decoration-none float-end linkStyle"
                            >
                                <AddCircleIcon /> CREATE PROJECT
                            </Link>
                        ) : (
                            ""
                        )}
                    </CardTitle>
                    <CardBody style={{ display: "flex", height: "100%" }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGrid
                                columnVisibilityModel={{projectManagerId: false}}
                                pageSize={pageSize}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                rowsPerPageOptions={[5, 10, 20,50,100]}
                                pagination
                                rows={projects}
                                columns={columns}
                                SelectionOnClick
                                getRowId={(project) => project.id}
                                components={{
                                    Toolbar: GridToolbar,
                                  }}
                                // onRowClick={(e) => console.log(e)}
                                
                            />
                        </div>
                        <Modal isOpen={modal} toggle={toggle} backdrop="static" centered>
                            <ModalHeader>
                                {" "}
                                <h4>Create Project</h4>{" "}
                            </ModalHeader>
                            <ModalBody>
                                <Form onSubmit={createProjectsubmitHandler}>
                                    <FormGroup>
                                        <Label className="mt-2 mb-1" for="title">
                                            Title
                                        </Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            type="text"
                                            onChange={titleChangeHandler}
                                            valid={projectTitle ? true : false}
                                            invalid={projectTitleValidate}
                                        />
                                        <FormFeedback>Project name cannot be blank</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="mt-2 mb-1" for="description">
                                            Description
                                        </Label>
                                        <Input
                                            id="description"
                                            name="description"
                                            type="textarea"
                                            onChange={descriptionChangeHandler}
                                            valid={projectDescription ? true : false}
                                            invalid={projectDescriptionValidate}
                                        />
                                    </FormGroup>
                                    <FormFeedback>
                                        Project description cannot be blank
                                    </FormFeedback>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label className="mt-2 mb-1" for="estimatedTasks">
                                                    Estimated Tasks
                                                </Label>
                                                <Input
                                                    id="estimatedTasks"
                                                    name="estimatedTasks"
                                                    type="number"
                                                    min={1}
                                                    onChange={projectTaskChangeHandler}
                                                    valid={projectEstimateTasks ? true : false}
                                                    invalid={projectEstimateTasksValidate}
                                                />
                                            </FormGroup>
                                            <FormFeedback>
                                                Project estimated tasks cannot be blank
                                            </FormFeedback>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label className="mt-2 mb-1" for="budget">
                                                    Budget ($)
                                                </Label>
                                                <Input
                                                    id="budget"
                                                    name="budget"
                                                    type="number"
                                                    min={0}
                                                    onChange={budgetChangeHandler}
                                                    valid={projectBudget ? true : false}
                                                    invalid={projectBudgetValidate}
                                                />
                                            </FormGroup>
                                            <FormFeedback>
                                                Project budget cannot be blank or less than 0
                                            </FormFeedback>
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
                                                    onChange={startDateChangeHandler}
                                                    valid={projectStartDate ? true : false}
                                                    invalid={projectStartDateValidate}
                                                />
                                                <FormFeedback>
                                                    Project start date cannot be blank or before today
                                                </FormFeedback>
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
                                                    onChange={deadlineChangeHandler}
                                                    valid={projectEndDate ? true : false}
                                                    invalid={projectEndDateValidate}
                                                />
                                                <FormFeedback>
                                                    Project end date cannot be blank or before today
                                                </FormFeedback>
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
                                                    onChange={clientNameChangeHandler}
                                                    valid={projectClientName ? true : false}
                                                    invalid={projectClientNameValidate}
                                                />
                                                <FormFeedback>Client name cannot be blank</FormFeedback>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                                <div className="d-flex justify-content-center mt-5">
                                    <Button className="me-3" color="secondary" onClick={toggle}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" onClick={(e) => {
                                        createProjectsubmitHandler(e);
                                        getProjects();
                                    }}>
                                        Create Project
                                    </Button>{" "}
                                </div>
                            </ModalBody>
                        </Modal>
                    </CardBody>
                </Card>
            </Container>
        );
    }
};

export default ProjectList;
