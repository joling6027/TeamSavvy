import React, { Component, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import '../../assets/css/bootstrap.min.css'
import './taskView.css'

const TaskView = () => {
    const params = useParams();
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [tasks, setTasks] = useState();
    const [modalData, setModalData] = useState();
    const [updateData, setUpdateData] = useState();
    const { http, user } = AuthService();
    const [taskItem, setTaskItem] = useState();

    const GetTasks = () =>{
        http.get(GetEndPoints().employeeTask + "/" + params.id)
        .then((res) => {
            console.log(res.data.response)
            setTasks(res.data.response);
        })
        .catch((err) => console.log(err.message));
    }
    useEffect(() => {
       
        GetTasks();
        // http.put(GetEndPoints().updateTask)
    }, [params.id])

    // const saveTaskDataHandler = (enteredTaskData) => {
    //     const taskData = {
    //         ...enteredTaskData,
    //         employeeId: user.employeeId
            
    //     }
    //     // window.alert(taskData)
    //     console.log("inside")
    //     console.log(taskData)
    //     http.put(GetEndPoints().updateTask, {...taskData}).then((res) => {
    //         console.log(res.data.response)
    //         // window.location.reload();
    //     }).catch((err) => console.log(err.message));
    // }

    // const saveUpdateDataHandler = (enteredStatus) => {
    //     console.log(enteredStatus)
    //     console.log(taskItem)
    //     const taskData = {
    //         assignedBy: taskItem.assignedBy,
    //         assignedDate: taskItem.assignedDate,
    //         assignedTo: taskItem.assignedTo,
    //         employeeId: taskItem.employeeId,
    //         projectId: taskItem.projectId,
    //         taskDesc: taskItem.taskDesc,
    //         taskEndDate: taskItem.taskEndDate,
    //         taskId: taskItem.taskId,
    //         taskName: taskItem.taskName,
    //         taskStartDate: taskItem.taskStartDate,
    //         taskStatus: enteredStatus,
    //         taskTotalHours: taskItem.taskTotalHours
    //     }
    //     console.log('Line 62' + taskData)
    //     http.put(GetEndPoints().updateTask, { ...taskData }).then((res) => {
    //         console.log(res.data.response)
    //         // window.location.reload();
    //     }).catch((err) => console.log(err.message));
    // }


    // const populateData = (task) => {
    //     setModalData(task);
    //     console.log(task)
    //     return modalData;
    // }

    // const passDataHandler = (task) => {
    //     setUpdateData(task);
    //     console.log(updateData)
    //     return updateData;
    // }

    if(tasks === undefined){
        return (<div class="d-flex justify-content-center">
                <div class="spinner-grow text-success" style={{width: "3rem", height: "3rem"}} role="status">
                <span class="sr-only">Loading...</span>
                </div>
            </div>);
    }else{

 
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

                                            {/* <button
                                                className='task-btn'
                                                type="button"
                                                onClick={() => setShow(true)}
                                            >
                                                MODIFY TASK
                                            </button> */}
                                            {/* <TaskModal
                                                onSaveTaskData={saveTaskDataHandler}
                                                show={show}
                                                close={() => setShow(false)}
                                                onOpen={() => populateData(task)} 
                                                    
                                                /> */}
                                            < hr />
                                        </div>) : "")
                                    )}
                                    
                                    {/* <div className="assigned-task">
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
                                        {/* <hr /> */}
                                    {/* </div>
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
                                        {/* <hr /> */}
                                    {/* </div>
                                    <div className="assigned-task"> */}
                                        {/* <h6>Create model for database</h6>
                                        <p>Tables reuqired for database are Employee levels. Payroll. Think about topics and colums.</p>
                                        <button
                                            className='task-btn'
                                            type="button"
                                            onClick={() => setShow(true)}
                                        >
                                            MODIFY TASK
                                        </button> */}
                                        {/* <TaskModal onSaveTaskData={saveTaskDataHandler} show={show} close={() => setShow(false)} /> */}
                                        {/* <Link to={"#"}>MODIFY TASK</Link> */}
                                        {/* <hr /> */}
                                    {/* </div>  */}
                                </div>
                            </div>
                        </div>
                        <div className='mt-md-0 mt-sm-2 p-2 col-sm-12 col-md-4'>
                            <div className='card task-list-card'>
                                <h5 className='task-card-title'>In progress<hr /></h5>
                                <div className="card-body">
                                    {tasks && tasks.map((task) => (
                                        (task.taskStatus === 'In Progress'? 
                                            (<div className="in-progress-task" key={task.taskId}>
                                                <h6>{task.taskName}</h6>
                                                <p>{task.taskDesc}</p>
                                                <p><i className="tim-icons icon-refresh-01" /><QueryBuilderIcon />  Hours {task.taskTotalHours}</p>
                                                {/* <button
                                                    className='task-btn'
                                                    type="button"
                                                    onClick={() => {setShowUpdate(true);setTaskItem(task)}}
                                                >
                                                    UPDATE STATUS
                                                </button> */}
                                                {/* <UpdateStatusModal 
                                                onSaveTaskData={saveUpdateDataHandler} 
                                                
                                                show={showUpdate} 
                                                close={() => setShowUpdate(false)}
                                                 
                                                 /> */}
                                                <hr />
                                            </div>): "")
                                    ))}
                                    
                                    {/* <div className="in-progress-task">
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
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className='mt-md-0 mt-sm-2 p-2 col-sm-12 col-md-4'>
                            <div className='card task-list-card'>
                                <h5 className='task-card-title'>Completed<hr /></h5>
                                <div className="card-body">
                                    {tasks && tasks.map((task) =>
                                    (task.taskStatus === 'Completed' ?
                                    (<div className="completed-task">
                                        <h6>{task.taskName}</h6>
                                        <p>{task.taskDesc}</p>
                                        <p><i className="tim-icons icon-refresh-01" /><QueryBuilderIcon /> Hours {task.taskTotalHours}</p>
                                        <hr />
                                    </div>
                                    ):"")
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    }
}

export default TaskView;