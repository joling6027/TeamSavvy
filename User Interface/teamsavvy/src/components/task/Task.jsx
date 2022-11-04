import React, { Component, useState, useEffect } from 'react';
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';
import TaskModal from './TaskModal'
import UpdateStatusModal from './UpdateStatusModal';
// import { Form, FormGroup, Label, Input, FormFeedback, FormText, Container, Row, Col } from 'reactstrap';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import '../../assets/css/bootstrap.min.css'
import './task.css'

const Task = () => {
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [tasks, setTasks] = useState();
    const [modalData, setModalData] = useState();
    const { http, user } = AuthService();

    useEffect(() => {
        // const user = sessionStorage.getItem('user');
        // const user_detail = JSON.parse(user);
        // console.log(user);
        http.get(GetEndPoints().employeeTask + "/" + user.employeeId).then((res) => {
            console.log(res.data.response)
            setTasks(res.data.response);
        }).catch((err) => console.log(err.message));
    }, [])

    const saveTaskDataHandler = (enteredTaskData) => {
        const taskData = {
            ...enteredTaskData,
            id: Math.random().toString()
        }
    }

    const populateData = (task) => {
        setModalData(task);
        return modalData;
    }

    return (
        <>
            <div className="container p-3">
                <div className="">
                    <div className="row">
                        <div className='p-2 col-sm-12 col-md-4'>
                            <div className='card task-list-card'>
                                <h5 className='task-card-title'>Assigned Task<hr /></h5>

                                <div className="card-body">
                                    {tasks && tasks.map((task) =>
                                    (task.taskStatus === 'Assigned' ?
                                        (< div className="assigned-task" key={task.taskId}>
                                            <h6>{task.taskName}</h6>
                                            <p>{task.taskDesc}</p>

                                            <button
                                                className='task-btn'
                                                type="button"
                                                onClick={() => setShow(true)}
                                            >
                                                MODIFY TASK
                                            </button>
                                            <TaskModal
                                                onSaveTaskData={saveTaskDataHandler}
                                                show={show}
                                                close={() => setShow(false)}
                                                onOpen={() => populateData(task)} />
                                            < hr />
                                        </div>) : "")
                                    )}

                                    <div className="assigned-task">
                                        <h6>Create model for database</h6>
                                        <p>Tables reuqired for database are Employee levels. Payroll. Think about topics and colums.</p>
                                        <button
                                            className='task-btn'
                                            type="button"
                                            onClick={() => setShow(true)}
                                        >
                                            MODIFY TASK
                                        </button>
                                        {/* <TaskModal onSaveTaskData={saveTaskDataHandler} show={show} close={() => setShow(false)} /> */}
                                        {/* <Link to={"#"}>MODIFY TASK</Link> */}
                                        <hr />
                                    </div>
                                    <div className="assigned-task">
                                        <h6>Create model for database</h6>
                                        <p>Tables reuqired for database are Employee levels. Payroll. Think about topics and colums.</p>
                                        <button
                                            className='task-btn'
                                            type="button"
                                            onClick={() => setShow(true)}
                                        >
                                            MODIFY TASK
                                        </button>
                                        {/* <TaskModal onSaveTaskData={saveTaskDataHandler} show={show} close={() => setShow(false)} /> */}
                                        {/* <Link to={"#"}>MODIFY TASK</Link> */}
                                        <hr />
                                    </div>
                                    <div className="assigned-task">
                                        <h6>Create model for database</h6>
                                        <p>Tables reuqired for database are Employee levels. Payroll. Think about topics and colums.</p>
                                        <button
                                            className='task-btn'
                                            type="button"
                                            onClick={() => setShow(true)}
                                        >
                                            MODIFY TASK
                                        </button>
                                        {/* <TaskModal onSaveTaskData={saveTaskDataHandler} show={show} close={() => setShow(false)} /> */}
                                        {/* <Link to={"#"}>MODIFY TASK</Link> */}
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-md-0 mt-sm-2 p-2 col-sm-12 col-md-4'>
                            <div className='card task-list-card'>
                                <h5 className='task-card-title'>In progress<hr /></h5>
                                <div className="card-body">
                                    <div className="in-progress-task">
                                        <h6>Create model for database</h6>
                                        <p>Tables reuqired for database are Employee levels. Payroll. Think about topics and colums.</p>
                                        <p><i className="tim-icons icon-refresh-01" /><QueryBuilderIcon />  Hours 12</p>
                                        <button
                                            className='task-btn'
                                            type="button"
                                            onClick={() => setShowUpdate(true)}
                                        >
                                            UPDATE STATUS
                                        </button>
                                        <UpdateStatusModal onSaveTaskData={saveTaskDataHandler} show={showUpdate} close={() => setShowUpdate(false)} />
                                        <hr />
                                    </div>
                                    <div className="in-progress-task">
                                        <h6>Create model for database</h6>
                                        <p>Tables reuqired for database are Employee levels. Payroll. Think about topics and colums.</p>
                                        <p><i className="tim-icons icon-refresh-01" /><QueryBuilderIcon />  Hours 12</p>
                                        <button
                                            className='task-btn'
                                            type="button"
                                            onClick={() => setShowUpdate(true)}
                                        >
                                            UPDATE STATUS
                                        </button>
                                        <UpdateStatusModal onSaveTaskData={saveTaskDataHandler} show={showUpdate} close={() => setShowUpdate(false)} />
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-md-0 mt-sm-2 p-2 col-sm-12 col-md-4'>
                            <div className='card task-list-card'>
                                <h5 className='task-card-title'>Completed<hr /></h5>
                                <div className="card-body">
                                    <div className="completed-task">
                                        <h6>Create model for database</h6>
                                        <p>Tables reuqired for database are Employee levels. Payroll. Think about topics and colums.</p>
                                        <p><i className="tim-icons icon-refresh-01" /><QueryBuilderIcon /> Hours 12</p>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Task;