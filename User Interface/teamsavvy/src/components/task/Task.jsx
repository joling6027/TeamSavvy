import React, { Component, useState, useEffect } from "react";
import AuthService from "../services/authService";
import { GetEndPoints } from "../utilities/EndPoints";
import TaskModal from "./TaskModal";
import UpdateStatusModal from "./UpdateStatusModal";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import "../../assets/css/bootstrap.min.css";
import "./task.css";

const Task = () => {
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [tasks, setTasks] = useState();
    const [modalData, setModalData] = useState();
    const [updateData, setUpdateData] = useState();
    const { http, user } = AuthService();
    const [taskItem, setTaskItem] = useState();

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

    const saveTaskDataHandler = (enteredTaskData) => {

        let selectedTaskIndex = tasks.findIndex((obj => obj.taskId === enteredTaskData.taskId));
        const taskData = {
            ...enteredTaskData,
            key: Math.random(),
            employeeId: user.employeeId,
        };


        setTasks([
            ...tasks.filter(givenTask => givenTask.taskId !== enteredTaskData.taskId),
            taskData
        ])


        http
            .put(GetEndPoints().updateTask, { ...taskData })
            .then((res) => {
            })
            .catch((err) => console.log(err.message));
    };

    const saveUpdateDataHandler = (enteredStatus) => {

        const taskData = {
            assignedBy: taskItem.assignedBy,
            assignedDate: taskItem.assignedDate,
            assignedTo: taskItem.assignedTo,
            employeeId: taskItem.employeeId,
            projectId: taskItem.projectId,
            taskDesc: taskItem.taskDesc,
            taskEndDate: taskItem.taskEndDate,
            taskId: taskItem.taskId,
            taskName: taskItem.taskName,
            taskStartDate: taskItem.taskStartDate,
            taskStatus: enteredStatus,
            taskTotalHours: taskItem.taskTotalHours,
        };
        http
            .put(GetEndPoints().updateTask, { ...taskData })
            .then((res) => {
            })
            .catch((err) => console.log(err.message));
        getTasks();
        
    };

    const populateData = (taskName) => {
        let selectedTask = tasks.filter(t => t.taskName === taskName);

        setModalData(selectedTask[0]);
        return modalData;
    };


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
                                                <button
                                                    className='task-btn p-0'
                                                    type="button"
                                                    onClick={(e) => {
                                                        setShow(true);
                                                        populateData(e.target.parentNode.getAttribute('id'))
                                                    }}
                                                >
                                                    <strong>MODIFY TASK</strong>
                                                </button>
                                                {modalData && <TaskModal
                                                    onSaveTaskData={saveTaskDataHandler}
                                                    show={show}
                                                    close={() => setShow(false)}
                                                    onOpen={modalData}

                                                />}
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
                                                        <button
                                                            className="task-btn"
                                                            type="button"
                                                            onClick={() => {
                                                                setShowUpdate(true);
                                                                setTaskItem(task);
                                                            }}
                                                        >
                                                            UPDATE STATUS
                                                        </button>
                                                        <UpdateStatusModal
                                                            onSaveTaskData={saveUpdateDataHandler}
                                                            show={showUpdate}
                                                            close={() => setShowUpdate(false)}
                                                        />
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
                                                    <div className="completed-task">
                                                        <h6>
                                                            {task.taskName}
                                                        </h6>
                                                        <p className="showHide text-muted">{task.taskDesc}</p>
                                                        <p className="text-muted">
                                                            <i className="tim-icons icon-refresh-01" />
                                                            <QueryBuilderIcon /> Hours {task.taskTotalHours}
                                                        </p>
                                                        <hr />
                                                    </div>
                                                ) : (
                                                    ""
                                                )
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default Task;
