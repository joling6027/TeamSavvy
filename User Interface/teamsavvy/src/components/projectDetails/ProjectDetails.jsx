import React, { Component, useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Container, Form, FormGroup, Label, Input, FormFeedback, FormText, Row, Col, Modal, ModalHeader, Button, ModalBody } from 'reactstrap';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SweetAlert from "react-bootstrap-sweetalert";
import './projectDetails.css';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';


const ProjectDetails = () => {
    const params = useParams();
    const data = useLocation();
    // console.log(params.id)
    console.log(data.state);
    const managerId = data.state;

    const [project, setProject] = useState();
    const [tasks, setTasks] = useState();
    const [completedTasks, setCompletedTasks] = useState();
    const [teamMembers, setTeamMembers] = useState();

    //alert
    const [alert, setAlert] = useState(null);

    const { user, http } = AuthService();
    //create modal
    const [modal, setModal] = useState(false);
    const toggle = () => {
        //empty the input data
        setTitle("");
        setDescription("")
        setHours()
        setAssignedEmp("")
        setAssignedEmpId()
        setStartDate()
        setEndDate()

        //validation
        setTitleValidate(false)
        setDescValidate(false)
        setHoursValidate(false)
        // setAssignEmpValidate(false)
        setStartDateValidate(false)
        setEndDateValidate(false)

        setModal(!modal);
    }
    //modify modal
    const [modifyModal, setModifyModal] = useState(false);
    const mtoggle = (task) => {

        setTaskId(task.taskId);
        setMTitle(task.taskName)
        setMDesc(task.taskDesc)
        setMHours(task.taskTotalHours)
        setMStatus(task.taskStatus)
        setMAssignedBy(task.asignedBy)
        setMAssignedEmp(task.assignedTo)
        setMAssignedEmpId(task.employeeId)
        setMStartDate(task.taskStartDate)
        setMEndDate(task.taskEndDate)
        setMAssignedDate(task.assignedDate)

        //validation
        setModifiedTitleValidate(false)
        setModifiedDescValidate(false)
        setModifiedHourValidate(false)
        setModifiedStartDateValidate(false)
        setEndDateValidate(false)

        setModifyModal(!modifyModal);
    }
  

    // new task
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [hours, setHours] = useState();
    const [assignedEmp, setAssignedEmp] = useState();
    const [assignedEmpId, setAssignedEmpId] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    //new task validation
    const [titleValidate, setTitleValidate] = useState(false);
    const [descValidate, setDescValidate] = useState(false);
    const [hoursValidate, setHoursValidate] = useState(false);
    // const [assignEmpValidate, setAssignEmpValidate] = useState(false);
    const [startDateValidate, setStartDateValidate] = useState(false);
    const [endDateValidate, setEndDateValidate] = useState(false);


    // old task (modify)
    const [mTaskId, setTaskId] = useState();
    const [mTitle, setMTitle] = useState();
    const [mDesc, setMDesc] = useState();
    const [mHours, setMHours] = useState();
    const [mAssignedBy, setMAssignedBy] = useState()
    const [mAssignedEmp, setMAssignedEmp] = useState();
    const [mAssignedEmpId, setMAssignedEmpId] = useState();
    const [mStatus, setMStatus] = useState()
    const [mStartDate, setMStartDate] = useState();
    const [mEndDate, setMEndDate] = useState();
    const [mAssignedDate, setMAssignedDate] = useState();

    //old task validation
    const [modifiedTitleValidate, setModifiedTitleValidate] = useState(false);
    const [modifiedDescValidate, setModifiedDescValidate] = useState(false);
    const [modifiedHourValidate, setModifiedHourValidate] = useState(false);
    // const [modifiedStatusValidate, setModifiedStatusValidate] = useState(false);
    const [modifiedStartDateValidate, setModifiedStartDateValidate] = useState(false);
    const [modifiedEndDateValidate, sestModifiedEndDateValidate] = useState(false);


    // createOn date data
    const newDate = new Date();
    const d = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const today = `${year}-${month.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;

    //get project
    const getProject = () => {
        http.get(GetEndPoints().projectDetail + "/" + params.id)
        .then((res) => {
            if(res.data.success){
                console.log(res.data.response);
                setProject(res.data.response)
            }
        }).catch((err) => console.log(err.message))
    }

    //get emp (only for project manager)
    const getProjectEmp = () => {
        http.get(GetEndPoints().getTeamMembers + "/" + user.employeeId)
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data.response);
                    let obj = [...res.data.response].filter((proj) => proj.projectId == params.id)
                    console.log(obj)
                    console.log(obj[0].employeeList)
                    setTeamMembers(obj[0].employeeList)
                }
            }).catch((err) => console.log(err.message));
    }

    //get tasks
    const getTasks = (managerId) => {
        console.log(managerId)
        http.get(GetEndPoints().employeeTask + "/tasklist/" + managerId)
            .then((res) => {
                console.log(res);
                if(res.data.success){
                    console.log(res.data.response)
                    let tasksById = [...res.data.response].filter((task) => task.projectId == params.id);
                    // console.log(tasksById)
                    setTasks(tasksById)
                    let completedTasks = [...tasksById].filter((task) => task.taskStatus === "Completed");
                    setCompletedTasks(completedTasks)
                // console.log(completedTasks)
                }
            }).catch((err) => {
                // console.log(err);
                if(err.response.status === 404){
                    setTasks([]);
                    setCompletedTasks([]);
                }
            })
    }

    //create(post) task
    const newTitleChangeHandler = (e) => {
        if(e.target.value.trim() !== ""){
            setTitle(e.target.value)
            setTitleValidate(false);
        }else{
            setTitleValidate(true)
        }
        // console.log(titleValidate)
    }
    const newDescriptionChangeHandler = (e) => {
        if(e.target.value.trim() !== ""){
            setDescValidate(false)
            setDescription(e.target.value)
        }else{
            setDescValidate(true)
        } 
    }
    const newHoursChangeHandler = (e) => {
        if (e.target.value !== ""){
            setHoursValidate(false);
            setHours(e.target.value)
        }else{
            setHoursValidate(true);
        }
    }
    const newAssignEmpChangeHandler = (e) => {
        console.log(e.target) 
        // console.log(e.getAttribute('id'));
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index];
        const option = el.getAttribute('id');
        console.log(option);
        setAssignedEmpId(option)
        setAssignedEmp(e.target.value)
    }
    const newStartDateChangeHandler = (e) => {

        const dateStartDate = Date.parse(e.target.value);
        if (dateStartDate >= Date.parse(today)){
            setStartDateValidate(false);
            setStartDate(e.target.value)
        }else{
            setStartDateValidate(true); 
        }
    }
    const newEndDateChangeHandler = (e) => { 

        const dateEndDate = Date.parse(e.target.value);
        if (dateEndDate >= Date.parse(today)) {
            setEndDateValidate(false);
            setEndDate(e.target.value)
        } else {
            setEndDateValidate(true);
        }
    }

    const postCreatedTask = (taskData) => {
        http.post(GetEndPoints().employeeTask + "/addTask", { ...taskData })
        .then((res) => {
            if(res.data.success){
                console.log("post succeed")
            }
        }).catch((err) => console.log(err.message))
    }

    const updateProject = (updatedProject) => {
        http.put(GetEndPoints().projects + "/updateProject", { ...updatedProject })
        .then((res) => {
            if(res.data.success){
                console.log("Project update successfully.");
            }

        }).catch((err) => console.log(err.message))
    }

    const createTaskSubmitHandler = (e) => {
        e.preventDefault();
        // console.log(startDate)

        const dateStartDate = Date.parse(startDate);
        const dateEndDate = Date.parse(endDate);

        if (title === undefined || title.trim() === ""){
            setTitleValidate(true)
            return;
        }else if(description === undefined || description.trim() === ""){
            setDescValidate(true)
            return;
        } else if (hours === undefined || hours === ""){
            setHoursValidate(true)
            return;
        }else if( startDate === undefined || startDate === ""){
            setStartDateValidate(true)
            return;
        } else if (endDate === undefined || endDate === ""){
            setEndDateValidate(true)
            return;
        } else if (dateStartDate > dateEndDate){
            setStartDateValidate(true)
            setEndDateValidate(true)
            return;
        }
        else{

            const taskData = {
                "employeeId": +assignedEmpId,
                "projectId": +params.id,
                "taskName": title,
                "taskDesc": description,
                "taskStartDate": startDate,
                "taskEndDate": endDate,
                "taskTotalHours": hours,
                "assignedBy": user.firstName,
                "assignedTo": assignedEmp,
                "assignedDate": today,
                "taskStatus": "Assigned"
            }

            setTasks([
                ...tasks,
                taskData
            ]);

            //count total tasks
            console.log(tasks.length);
            const completedTask = [...tasks].filter((task) => task.taskStatus === 'Completed');


            console.log(completedTask);
            postCreatedTask(taskData);

            //update project
            // updateProject(project);

            toggle();

        }

    }

    //modify task change handler
    const mTitleChangeHandler = (e) => { 
        if (e.target.value.trim() !== "") {
            setMTitle(e.target.value)
            setModifiedTitleValidate(false);
        } else {
            setModifiedTitleValidate(true)
        } 
    }
    const mDescriptionChangeHandler = (e) => {
        if (e.target.value.trim() !== "") {
            setModifiedDescValidate(false)
            setMDesc(e.target.value)
            console.log(mDesc)
        } else {
            setModifiedDescValidate(true)
        }  
         
    }
    const mHoursChangeHandler = (e) => { 
        if (e.target.value !== "") {
            setModifiedHourValidate(false);
            setMHours(e.target.value)
        } else {
            setModifiedHourValidate(true);
        } 
    }
    const mStatusChangeHandler = (e) => {
        setMStatus(e.target.value);
        
     }
    const mStartDateChangeHandler = (e) => { 
        const dateStartDate = Date.parse(e.target.value);
        setMStartDate(e.target.value)
        setModifiedStartDateValidate(false)
        // if (dateStartDate > Date.parse(today)) {
        //     setModifiedStartDateValidate(false);
        //     setMStartDate(e.target.value)
        // } else {
        //     setModifiedStartDateValidate(true);
        // } 
    }
    const mEndDateChangeHandler = (e) => {
        const dateStartDate = Date.parse(e.target.value);
        setMEndDate(e.target.value)
        sestModifiedEndDateValidate(false)
        // if (dateStartDate > Date.parse(today)) {
        //     sestModifiedEndDateValidate(false);
        //     setMEndDate(e.target.value)
        // } else {
        //     sestModifiedEndDateValidate(true);
        // }   
    }

    // post modified task
    const postModifiedTask = (modifiedTaskData) => {
        http.put(GetEndPoints().updateTask, { ...modifiedTaskData }).then((res) => {
            console.log(res.data.response)
        }).catch((err) => console.log(err.message));
    }

    // modify task submit
    const modifyTaskSubmitHandler = (e) => {
        e.preventDefault();

        // console.log(mAssignedBy)
        const dateStartDate = Date.parse(mStartDate);
        const dateEndDate = Date.parse(mEndDate);

        if (mTitle === undefined || mTitle.trim() === "") {
            setTitleValidate(true)
            return;
        } else if (mDesc === undefined || mDesc.trim() === "") {
            setDescValidate(true)
            return;
        } else if (mHours === undefined || mHours === "") {
            setHoursValidate(true)
            return;
        } else if (mStartDate === undefined || mStartDate === "") {
            setStartDateValidate(true)
            return;
        } else if (mEndDate === undefined || mEndDate === "") {
            setEndDateValidate(true)
            return;
        } else if (dateStartDate > dateEndDate) {
            setModifiedStartDateValidate(true)
            sestModifiedEndDateValidate(true)
            return;
        }
        else {

            const modifyTaskData = {
                taskId: +mTaskId,
                employeeId: +mAssignedEmpId,
                projectId: +params.id,
                taskName: mTitle,
                taskDesc: mDesc,
                taskStartDate: mStartDate,
                taskEndDate: mEndDate,
                taskTotalHours: mHours,
                assignedBy: user.firstName,
                assignedTo: mAssignedEmp,
                assignedDate: mAssignedDate,
                taskStatus: mStatus,
            }
            console.log(modifyTaskData)
            setTasks([
                ...tasks.filter((givenTask) => givenTask.taskId !== modifyTaskData.taskId),
                modifyTaskData
            ].sort((a, b) => (a.taskId > b.taskId) ? 1 : -1));
            postModifiedTask(modifyTaskData)
            
            setModifyModal(!modifyModal);
        }

    }

    //get employees
    // const getTeamMembers = () => {
    //     http.get(GetEndPoints().teams + "/" + params.id)
    //         .then((res) => {
    //             // console.log(project)
    //             console.log(res.data.response);
    //             const team = [...res.data.response].filter((t) => t.position !== 'Manager')
    //             console.log(team);
    //             setTeamMembers(team)

    //         }).catch((err) => console.log(err.message))
    // }
    const ShowAlert = () => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                // title="Widget Added!"
                onConfirm={() => { hideAlert(); }}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="success"
                btnSize=""
            >
                Please contact HR to add employee to project first.</SweetAlert>
        );
    }

    const hideAlert = () => {
        setAlert(null);
    };


    useEffect(() => {
        getProject();
        if(user.role === 'Manager'){
            getProjectEmp();
            if(teamMembers !== undefined){
                if(teamMembers === 0){
                    ShowAlert();
                }else{
                    setAlert(null);
                }
                
            }
        }
        getTasks(managerId);

    }, [])


    if (!(project && tasks)) {
        return (<div class="d-flex justify-content-center">
            <div class="spinner-grow text-success" style={{ width: "3rem", height: "3rem" }} role="status">
                <span class="sr-only">No project detail</span>
            </div>
        </div>);
    }
    else if(tasks === undefined){
        return(<div>no project details</div>)
    }
    else if(user.role === "Manager" && project.projectManagerId === user.employeeId && teamMembers === undefined){
        // console.log(user.role);
        // console.log(project.projectManagerId)
        // ShowAlert();
        return (<div class="d-flex justify-content-center">
            <div class="spinner-grow text-success" style={{ width: "3rem", height: "3rem" }} role="status">
                <span class="sr-only">No project detail</span>
            </div>
        </div>);
    }else {

        return (
            <>
                {(alert)? (alert): ""}
                <Container className="px-3">
                    <p className="h4 px-2">{project.projectName}</p>
                    <div className=" d-flex justify-content-between">
                        <Col className="py-2 px-3 yellow-bg rounded d-flex align-items-center m-2">
                            <h5 className="text-white flex-grow-1">Tasks</h5>
                            <h2 className="text-white fw-bold">{tasks.length}</h2>
                        </Col>
                        <Col className="py-2 px-3 orange-bg rounded d-flex align-items-center m-2">
                            <h5 className="text-white flex-grow-1">In-Progress</h5>
                            <h2 className="text-white fw-bold">{(tasks.length) - (completedTasks.length)}</h2>
                        </Col>
                        <Col className="py-2 px-3 green-bg rounded d-flex align-items-center m-2">
                            <h5 className="text-white flex-grow-1">Completed</h5>
                            <h2 className="text-white fw-bold">{completedTasks.length}</h2>
                        </Col>
                    </div>
                    <div className="d-flex mt-1">
                        <Col className="rounded m-2 prCard">
                            <h5 className="d-inline-block p-3">Tasks</h5>
                            {(user.role === 'Manager') ? 
                                (teamMembers.length === 0) ? "" : (<Link to="" onClick={toggle} className="alert-link float-end text-uppercase text-decoration-none linkStyle px-3 pt-3">
                                    <AddCircleIcon /> Create Task</Link>): ""}
                            
                            <ul class="list-group p-3">
                                {tasks && tasks.filter((task => task.taskStatus === "Assigned")).map((task) => (
                                    <li class="list-group-item border-end-0 border-bottom-0 border-start-0 rounded-0 px-0 py-3 border-top" key={Math.random()}>
                                        <h6>{task.taskName}</h6>
                                        <p className="text-muted">{task.taskDesc}</p>
                                        <p className="text-muted">Start Date: {task.taskStartDate}</p>
                                        <p className="text-muted">End Date: {task.taskEndDate}</p>
                                        <p className="text-muted">Assigned to <strong>{task.assignedTo}</strong></p>
                                        {(user.firstName === project.projectManagerName) ? (<Link to="" onClick={() => mtoggle(task)} className="alert-link text-uppercase text-decoration-none linkStyle">Modify Task</Link>): ""}
                                    </li>
                                ))}
                                {/* <li class="list-group-item border-end-0 border-bottom-0 border-start-0 rounded-0 px-0 py-3 border-top">
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
                    </li> */}
                            </ul>
                        </Col>
                        <Col className="rounded m-2 prCard">
                            <h5 className="d-inline-block p-3">In-Progress</h5>
                            <ul class="list-group p-3">
                                {tasks && tasks.filter((task => task.taskStatus === "In-Progress")).map((task) => (<li class="list-group-item border-end-0 border-bottom-0 border-start-0 rounded-0 px-0 py-3 border-top">
                                    <h6>{task.taskName}</h6>
                                    {/* <p><strong>Task Description</strong></p> */}
                                    <p className="text-muted">{task.taskDesc}</p>
                                    <p className="text-muted">Start Date: {task.taskStartDate}</p>
                                    <p className="text-muted">End Date: {task.taskEndDate}</p>
                                    <p className="text-muted">Assigned to <strong>{task.assignedTo}</strong></p>
                                    <p className="text-muted"><UpdateOutlinedIcon /> Hours <strong>{task.taskTotalHours}</strong></p>
                                </li>))}

                                {/* <li class="list-group-item border-end-0 border-bottom-0 border-start-0 rounded-0 px-0 py-3 border-top">
                        <h6>Create model for Database</h6>
                        <p className="text-muted">Tables required for database are Employee, Leaves, Payroll. Think about topples and columns.</p>
                        <p className="text-muted">Assigned to <strong>John Doe</strong></p>
                        <p className="text-muted"><UpdateOutlinedIcon/> Hours <strong>12</strong></p>
                    </li> */}

                            </ul>
                        </Col>
                        <Col className="rounded m-2 prCard">
                            <h5 className="d-inline-block p-3">Completed</h5>
                            <ul class="list-group p-3">
                                {tasks && tasks.filter((task => task.taskStatus === 'Completed')).map((task) => (
                                    <li class="list-group-item border-end-0 border-bottom-0 border-start-0 rounded-0 px-0 py-3 border-top">
                                        <h6>{task.taskName}</h6>
                                        <p className="text-muted">{task.taskDesc}</p>
                                        <p className="text-muted">Completed by <strong>{task.assignedTo}</strong></p>
                                        <p className="text-muted"><UpdateOutlinedIcon /> Hours <strong>{task.taskTotalHours}</strong></p>
                                    </li>
                                ))}
                                {/* <li class="list-group-item border-end-0 border-bottom-0 border-start-0 rounded-0 px-0 py-3 border-top">
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
                    </li> */}

                            </ul>
                        </Col>

                    </div>
                    <Modal isOpen={modal} toggle={toggle} backdrop="static" centered>
                        <ModalHeader>  <h4>Create Task</h4> </ModalHeader>
                        <ModalBody>
                            <Form onSubmit={createTaskSubmitHandler}>
                                <FormGroup>
                                    <Label className="mt-2 mb-1" for="title">
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        type="text"
                                        onChange={newTitleChangeHandler}
                                        valid={title? true: false}
                                        invalid={titleValidate}
                                        

                                    />
                                    <FormFeedback invalid>Title cannot be blank</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="mt-2 mb-1" for="description">
                                        Description
                                    </Label>
                                    <Input
                                        id="description"
                                        name="description"
                                        type="textarea"
                                        onChange={newDescriptionChangeHandler}
                                        valid={description? true: false}
                                        invalid={descValidate}

                                    />
                                    <FormFeedback invalid>Description cannot be blank</FormFeedback>
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
                                                type="number"
                                                min={1}
                                                onChange={newHoursChangeHandler}
                                                valid={hours? true: false}
                                                invalid={hoursValidate}
                                            />
                                            <FormFeedback invalid>Estimated hours cannot be blank</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label className="" for="assignTo">
                                                Assign to
                                            </Label>
                                            <Input
                                                id="assignTo"
                                                name="assignTo"
                                                type="select"
                                                onChange={newAssignEmpChangeHandler}
                                                valid
                                            >
                                                {teamMembers && teamMembers.map((member) => (
                                                    <option id={member.id} value={member.employeeName}>
                                                        {member.employeeName}
                                                    </option>
                                                ))}
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
                                                id="startDate"
                                                name="startDate"
                                                type="date"
                                                onChange={newStartDateChangeHandler}
                                                valid={startDate? true: false}
                                                invalid={startDateValidate}
                                            />
                                            <FormFeedback invalid>Start date cannot be blank or before today</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label className="mt-3  mb-1" for="endDate">
                                                End Date
                                            </Label>
                                            <Input
                                                id="endDate"
                                                name="endDate"
                                                type="date"
                                                onChange={newEndDateChangeHandler}
                                                valid={endDate? true: false}
                                                invalid={endDateValidate}
                                            />
                                            <FormFeedback invalid>End date cannot be blank, before today or before start date</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                            <div className="d-flex justify-content-center mt-5">
                                <Button className="me-3" color="secondary" onClick={toggle}>
                                    Cancel
                                </Button>
                                <Button type='submit' color="primary" onClick={createTaskSubmitHandler}>
                                    Create Task
                                </Button>{' '}
                            </div>
                        </ModalBody>

                    </Modal>
                    <Modal
                        isOpen={modifyModal} toggle={mtoggle}
                    >
                        <ModalHeader>
                            <h4>Modify Task</h4>
                        </ModalHeader>
                        <ModalBody>
                            <Form
                                onSubmit={modifyTaskSubmitHandler}
                            >
                                <FormGroup>
                                    <Container>
                                        <Row>
                                            <Label for='task-title'>Title</Label>
                                            <Input type='text' name='task-title' id='task-title' onChange={mTitleChangeHandler} valid={mTitle ? true : false} invalid={modifiedTitleValidate} defaultValue={mTitle} />
                                            <FormFeedback invalid>Title cannot be blank</FormFeedback>
                                        </Row>
                                        <Row>
                                            <Label for='task-desc'>Description</Label>
                                            <Input type='text' name='task-desc' id='task-desc' onChange={mDescriptionChangeHandler} valid={mDesc ? true : false} invalid={modifiedDescValidate} defaultValue={mDesc}/>
                                            <FormFeedback invalid>Description cannot be blank</FormFeedback>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Label for='task-hour'>Hours</Label>
                                                <Input type='number' name='task-hour' id='task-hour' onChange={mHoursChangeHandler} valid={mHours ? true : false} invalid={modifiedHourValidate} min={1} defaultValue={mHours}/>
                                                <FormFeedback invalid>Task hours cannot be blank or 0</FormFeedback>
                                                {/* <FormText>Please remember to set reasonable hours to the task</FormText> */}
                                            </Col>
                                            <Col>
                                                <Label for='task-status'>Status</Label>
                                                <Input type='select' name='task-status' id='task-status' onChange={mStatusChangeHandler} valid defaultValue={mStatus}>
                                                    <option>Assigned</option>
                                                    <option>In Progress</option>
                                                    <option>Completed</option>
                                                </Input>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Label for="task-start-date">Start Date</Label>
                                                <Input type='date' name='task-start-date' id='task-start-date'
                                                    onChange={mStartDateChangeHandler} valid={mStartDate ? true : false} invalid={modifiedStartDateValidate} defaultValue={mStartDate}/>
                                                <FormFeedback invalid>Start date cannot later than end date</FormFeedback>
                                            </Col>
                                            <Col>
                                                <Label for="task-end-date">End Date</Label>
                                                <Input type='date' name='task-end-date' id='task-end-date'
                                                    onChange={mEndDateChangeHandler} valid={mEndDate ? true : false} invalid={modifiedEndDateValidate} defaultValue={mEndDate}/>
                                                <FormFeedback invalid>End date cannot before start date</FormFeedback>
                                            </Col>
                                        </Row>
                                    </Container>
                                </FormGroup>
                                <div className="d-flex justify-content-center mt-5">
                                    <Button onClick={mtoggle} style={{ color: '#FD8787', backgroundColor: 'white', border: 'none', textTransform: 'uppercase' }}>Cancel</Button>
                                    <Button type='submit' onClick={modifyTaskSubmitHandler} style={{ color: '#367FFF', backgroundColor: 'white', border: 'none', textTransform: 'uppercase' }}>Apply Changes</Button>{''}
                                </div>
                            </Form>
                        </ModalBody>

                    </Modal>

                </Container>
            </>
        );
    }
}

export default ProjectDetails;

