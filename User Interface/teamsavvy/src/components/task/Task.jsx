import React, { Component, useState, useEffect } from 'react';
import TaskModal from './TaskModal';
import UpdateStatusModal from './UpdateStatusModal';
// import { Form, FormGroup, Label, Input, FormFeedback, FormText, Container, Row, Col } from 'reactstrap';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import '../../assets/css/bootstrap.min.css'
import './task.css'

const Task = () => {
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const saveTaskDataHandler = (enteredTaskData) => {
        const taskData = {
            ...enteredTaskData,
            id:Math.random().toString()
        }
    }

    return (
        <>
            <div className="content">
                <div className="card-task ">
                    <div className="row">
                        <div className='col-4'>
                            <div className='card task-list-card'>
                                <h5 className='task-card-title'>Assigned Task<hr /></h5>

                                <div className="card-body">

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
                                        <TaskModal onSaveTaskData={saveTaskDataHandler} show={show} close={()=> setShow(false)} />
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
                                        <TaskModal onSaveTaskData={saveTaskDataHandler} show={show} close={() => setShow(false)} />
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
                                        <TaskModal onSaveTaskData={saveTaskDataHandler} show={show} close={() => setShow(false)} />
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
                                        <TaskModal onSaveTaskData={saveTaskDataHandler} show={show} close={() => setShow(false)} />
                                        {/* <Link to={"#"}>MODIFY TASK</Link> */}
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
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
                        <div className='col-4'>
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