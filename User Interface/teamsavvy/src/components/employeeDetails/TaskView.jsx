import React, { Component, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import '../../assets/css/bootstrap.min.css'
import './taskView.css'

const TaskView = () => {
    const params = useParams();
    const [tasks, setTasks] = useState();
    const { http, user } = AuthService();

    const GetTasks = () =>{
        if(user.role === 'HR')
        {
            http.get(GetEndPoints().employeeTask + "/employeeId/" + params.id)
            .then((res) => {
                setTasks(res.data.response);
            })
            .catch((err) => console.log(err.message));
        }

        if(user.role === 'Manager')
        {
            http.get(GetEndPoints().employeeTask + "/employeeId/" + params.id + '/'+ params.projId)
            .then((res) => {
                setTasks(res.data.response);
            })
            .catch((err) => console.log(err.message));
        }
       
    }
    useEffect(() => {
        GetTasks();
    }, [params.id])

    if(tasks === undefined){
        return (<div className="d-flex justify-content-center">
                <div className="spinner-grow text-success" style={{width: "3rem", height: "3rem"}} role="status">
                <span className="sr-only">Loading...</span>
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
                                            <p className="showHide text-muted">{task.taskDesc}</p>
                                            < hr />
                                        </div>) : "")
                                    )}
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
                                                <p className="showHide text-muted">{task.taskDesc}</p>
                                                <p className="text-muted"><i className="tim-icons icon-refresh-01" /><QueryBuilderIcon />  Hours {task.taskTotalHours}</p>
                                                <hr />
                                            </div>): "")
                                    ))}
                                    
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
                                        <p className="showHide text-muted">{task.taskDesc}</p>
                                        <p className="text-muted"><i className="tim-icons icon-refresh-01" /><QueryBuilderIcon /> Hours {task.taskTotalHours}</p>
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