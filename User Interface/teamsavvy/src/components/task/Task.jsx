import React, { Component, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AuthService from "../services/authService";
import { GetEndPoints } from "../utilities/EndPoints";
import { Container, Form, FormGroup, Label, Input, FormFeedback, FormText, Row, Col, Modal, ModalHeader, Button, ModalBody } from 'reactstrap';
// import TaskModal from "./TaskModal";
// import UpdateStatusModal from "./UpdateStatusModal";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import "../../assets/css/bootstrap.min.css";
import "./task.css";

const Task = () => {
    // const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [tasks, setTasks] = useState();
    const [modalData, setModalData] = useState();
    const [updateData, setUpdateData] = useState();
    const { http, user } = AuthService();
    const [taskItem, setTaskItem] = useState();
    const [taskProjectId, setTaskProjectId] = useState();

    //modify task value
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

    //update status modal value
    const [status, setStatus] = useState();

    //update status modal
    const [statusModal, setStatusModal] = useState(false);
    const [assignedBy, setAssignedBy] = useState();
    const [assignedDate, setAssignedDate] = useState();
    const [assignedTo, setAssignedTo] = useState();
    const [employeeId, setEmployeeId] = useState();
    const [projectId, setProjectId] = useState();
    const [taskDesc, setTaskDesc] = useState();
    const [taskEndDate, setTaskEndDate] = useState();
    const [changeTaskId, setChangeTaskId] = useState();
    const [taskName, setTaskName] = useState();
    const [taskStartDate, setTaskStartDate] = useState();
    const [taskTotalHours, setTaskTotalHours] = useState();


    const getTasks = () => {
        http
            .get(GetEndPoints().employeeTask + "/employeeId/" + user.employeeId)
            .then((res) => {
                setTasks(res.data.response);
            })
            .catch((err) => console.log(err.message));
    }

    useEffect(() => {
        getTasks();

    }, []);

    //modify modal
    const [modifyModal, setModifyModal] = useState(false);
    const mtoggle = (task) => {

        setTaskId(task.taskId);
        setTaskProjectId(task.projectId)
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

        // validation
        setModifiedTitleValidate(false)
        setModifiedDescValidate(false)
        setModifiedHourValidate(false)
        setModifiedStartDateValidate(false)
        sestModifiedEndDateValidate(false)

        setModifyModal(!modifyModal);
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
        let st = e.target.value.split(" ").join("");
        setMStatus(st);

    }
    const mStartDateChangeHandler = (e) => {
        const dateStartDate = Date.parse(e.target.value);
        setMStartDate(e.target.value)
        setModifiedStartDateValidate(false)
    }
    const mEndDateChangeHandler = (e) => {
        const dateStartDate = Date.parse(e.target.value);
        setMEndDate(e.target.value)
        sestModifiedEndDateValidate(false)
    }

    const modifyTaskSubmitHandler = (e) => {
        e.preventDefault();

        const dateStartDate = Date.parse(mStartDate);
        const dateEndDate = Date.parse(mEndDate);

        if (mTitle === undefined || mTitle.trim() === "") {
            setModifiedTitleValidate(true)
            return;
        } else if (mDesc === undefined || mDesc.trim() === "") {
            setModifiedDescValidate(true)
            return;
        } else if (mHours === undefined || mHours === "") {
            setModifiedHourValidate(true)
            return;
        } else if (mStartDate === undefined || mStartDate === "") {
            setModifiedStartDateValidate(true)
            return;
        } else if (mEndDate === undefined || mEndDate === "") {
            sestModifiedEndDateValidate(true)
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
                projectId: +taskProjectId,
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
            setTasks([
                ...tasks.filter((givenTask) => givenTask.taskId !== modifyTaskData.taskId),
                modifyTaskData
            ].sort((a, b) => (a.taskId > b.taskId) ? 1 : -1));
            postModifiedTask(modifyTaskData)
            console.log(modifyTaskData)
            setModifyModal(!modifyModal);
        }

    }

    // post modified task
    const postModifiedTask = (modifiedTaskData) => {
        http.put(GetEndPoints().updateTask, { ...modifiedTaskData }).then((res) => {
            getTasks();
        }).catch((err) => console.log(err.message));
    }


    const toggle = (task) => {
        console.log(task)

        setAssignedBy(task.assignedBy);
        setAssignedDate(task.assignedDate);
        setAssignedTo(task.assignedTo);
        setEmployeeId(task.employeeId);
        setProjectId(task.projectId);
        setTaskDesc(task.taskDesc);
        setTaskEndDate(task.taskEndDate);
        setTaskStartDate(task.taskStartDate);
        setTaskName(task.taskName);
        setChangeTaskId(task.taskId);
        //get status from on change handler
        setTaskTotalHours(task.taskTotalHours);

        setStatusModal(!statusModal);
    }

    const statusChangeHandler = (e) => {
        let st = e.target.value.split(" ").join("");
        setStatus(st);
        console.log(st)
    }


    const statusSubmitHandler = (e) => {

        e.preventDefault();
        const taskData = {
            assignedBy: assignedBy,
            assignedDate: assignedDate,
            assignedTo: assignedTo,
            employeeId: employeeId,
            projectId: projectId,
            taskDesc: taskDesc,
            taskEndDate: taskEndDate,
            taskId: changeTaskId,
            taskName: taskName,
            taskStartDate: taskStartDate,
            taskStatus: status,
            taskTotalHours: taskTotalHours,
        }
        console.log(taskData)
        http
            .put(GetEndPoints().updateTask, { ...taskData })
            .then((res) => {
                getTasks();
            })
            .catch((err) => console.log(err.message));

        setStatusModal(!statusModal);

    }


    if (tasks === undefined) {
        return (
            <div class="d-flex justify-content-center">
                <div
                    class="spinner-grow text-success"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                >
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className="container p-3">
                    <div className="">
                        <div className="row">
                            <div className="p-2 col-sm-12 col-md-4">
                                <div className="card task-list-card">
                                    <h5 className="task-card-title">
                                        Assigned Task
                                        <hr />
                                    </h5>

                                    <div className="card-body">
                                        {tasks && tasks.map((task) =>
                                        (task.taskStatus === 'Assigned' ?
                                            (< div className="assigned-task" key={Math.random()} id={task.taskName}>
                                                <h6>{task.taskName}</h6>
                                                <p className="showHide text-muted">{task.taskDesc} </p>
                                                <p className="text-muted">Start date: {task.taskStartDate}</p>
                                                <p className="text-muted">End date: {task.taskEndDate}</p>
                                                <Link to="" onClick={() => {mtoggle(task); setTaskProjectId(task.projectId)}} className="alert-link text-uppercase text-decoration-none linkStyle">Modify Task</Link>

                                                < hr />
                                            </div>) : "")
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-md-0 mt-sm-2 p-2 col-sm-12 col-md-4">
                                <div className="card task-list-card">
                                    <h5 className="task-card-title">
                                        In progress
                                        <hr />
                                    </h5>
                                    <div className="card-body">
                                        {tasks &&
                                            tasks.map((task) =>
                                                task.taskStatus === "InProgress" ? (
                                                    <div className="in-progress-task" key={task.taskId}>
                                                        <h6>
                                                            {task.taskName}
                                                        </h6>
                                                        <p className="showHide text-muted">{task.taskDesc}</p>
                                                        <p className="text-muted">Start date: {task.taskStartDate}</p>
                                                        <p className="text-muted">End date: {task.taskEndDate}</p>
                                                        <p>
                                                            <i className="tim-icons icon-refresh-01" />
                                                            <QueryBuilderIcon /> Hours {task.taskTotalHours}
                                                        </p>
                                                        <Link to="" onClick={() => toggle(task)} className="alert-link text-uppercase text-decoration-none linkStyle">UPDATE STATUS</Link>

                                                        <hr />
                                                    </div>
                                                ) : (
                                                    ""
                                                )
                                            )}


                                    </div>
                                </div>
                            </div>
                            <div className="mt-md-0 mt-sm-2 p-2 col-sm-12 col-md-4">
                                <div className="card task-list-card">
                                    <h5 className="task-card-title">
                                        Completed
                                        <hr />
                                    </h5>
                                    <div className="card-body">
                                        {tasks &&
                                            tasks.map((task) =>
                                                task.taskStatus === "Completed" ? (
                                                    <div className="completed-task" key={Math.random()}>
                                                        <h6>
                                                            {task.taskName}
                                                        </h6>
                                                        <p className="showHide text-muted">{task.taskDesc}</p>
                                                        <p className="text-muted">
                                                            <i className="tim-icons icon-refresh-01" />
                                                            <QueryBuilderIcon /> Hours {task.taskTotalHours}
                                                        </p>
                                                        <Link to="" onClick={() => toggle(task)} className="alert-link text-uppercase text-decoration-none linkStyle">UPDATE STATUS</Link>

                                                        <hr />
                                                    </div>
                                                ) : (
                                                    ""
                                                )
                                            )}
                                    </div>
                                </div>
                            </div>
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
                                                <Row className="p-0">
                                                    <Label className="p-0" for='task-title'>Title</Label>
                                                    <Input type='text' name='task-title' id='task-title' onChange={mTitleChangeHandler} valid={mTitle ? true : false} invalid={modifiedTitleValidate} defaultValue={mTitle} />
                                                    <FormFeedback invalid>Title cannot be blank</FormFeedback>
                                                </Row>
                                                <Row className="p-0 mt-3">
                                                    <Label className="p-0" for='task-desc'>Description</Label>
                                                    <Input type='text' name='task-desc' id='task-desc' onChange={mDescriptionChangeHandler} valid={mDesc ? true : false} invalid={modifiedDescValidate} defaultValue={mDesc} />
                                                    <FormFeedback invalid>Description cannot be blank</FormFeedback>
                                                </Row>
                                                <Row className="p-0 mt-3">
                                                    <Col className="p-0">
                                                        <Label for='task-hour'>Hours</Label>
                                                        <Input type='number' name='task-hour' id='task-hour' onChange={mHoursChangeHandler} valid={mHours ? true : false} invalid={modifiedHourValidate} min={1} defaultValue={mHours} />
                                                        <FormFeedback invalid>Task hours cannot be blank or 0</FormFeedback>
                                                    </Col>
                                                    <Col className="p-0 ps-2 ">
                                                        <Label for='task-status'>Status</Label>
                                                        <Input type='select' name='task-status' id='task-status' onChange={mStatusChangeHandler} valid defaultValue={mStatus}>
                                                            <option>Assigned</option>
                                                            <option>In Progress</option>
                                                            <option>Completed</option>
                                                        </Input>
                                                    </Col>
                                                </Row>
                                                <Row className="p-0 mt-3">
                                                    <Col className="p-0">
                                                        <Label for="task-start-date">Start Date</Label>
                                                        <Input type='date' name='task-start-date' id='task-start-date'
                                                            onChange={mStartDateChangeHandler} valid={mStartDate ? true : false} invalid={modifiedStartDateValidate} defaultValue={mStartDate} />
                                                        <FormFeedback invalid>Start date cannot later than end date</FormFeedback>
                                                    </Col>
                                                    <Col className="p-0 ps-2">
                                                        <Label for="task-end-date">End Date</Label>
                                                        <Input type='date' name='task-end-date' id='task-end-date'
                                                            onChange={mEndDateChangeHandler} valid={mEndDate ? true : false} invalid={modifiedEndDateValidate} defaultValue={mEndDate} />
                                                        <FormFeedback invalid>End date cannot before start date</FormFeedback>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </FormGroup>
                                        <div className="d-flex justify-content-center mt-5">
                                            <Button onClick={mtoggle} className="border-0 bg-danger">Cancel</Button>
                                            <Button type='submit' onClick={modifyTaskSubmitHandler} className="border-0 bg-primary ms-2" >Apply Changes</Button>{''}
                                        </div>
                                    </Form>
                                </ModalBody>

                            </Modal>
                            <Modal
                                isOpen={statusModal} toggle={toggle}
                            >
                                <ModalHeader>
                                    <h4 id='contained-modal-title-vcenter'>Update Status</h4>
                                </ModalHeader>
                                <ModalBody>
                                    <Form
                                        onSubmit={statusSubmitHandler}
                                    >
                                        <FormGroup>
                                            <Container className='status-modal-container'>
                                                <Label for='task-status'>Status</Label>
                                                <Input type='select' name='task-status' id='task-status' onChange={statusChangeHandler}>
                                                    <option disabled selected>-- select --</option>
                                                    <option>Assigned</option>
                                                    <option>In Progress</option>
                                                    <option>Completed</option>
                                                </Input>
                                            </Container>
                                        </FormGroup>
                                        <div className="d-flex justify-content-center mt-5">
                                            <Button onClick={toggle} className="border-0 bg-danger">Cancel</Button>
                                            <Button type='submit' onClick={statusSubmitHandler} className="border-0 bg-primary ms-2" >Apply Changes</Button>{''}
                                        </div>
                                    </Form>
                                </ModalBody>

                            </Modal>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default Task;
