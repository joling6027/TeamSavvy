import React, { useEffect, useState } from 'react';
import {Container, Row, Col, Card,CardTitle, Form, FormGroup,Label, Input, Collapse, Button, CardBody,Modal,ModalHeader, ModalBody, CardSubtitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';
import projectpic from '../../assets/img/projects.png';
import teamMembers from '../../assets/img/team-members.png';
import taskpic from '../../assets/img/tasks.png';
import Chart from "chart.js/auto";
import { Line , Bar, Pie} from "react-chartjs-2";
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import PieChartIcon from '@mui/icons-material/PieChart';
import './dashboard.css';
import pic from "../../assets/img/Profilepic.png";
import moment from "moment";
import { ProjectQueries } from './projectDropdow';
import { EmployeeQueries } from './employeeDropdown';
import SweetAlert from "react-bootstrap-sweetalert";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  
  } from 'chart.js';


  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle 
  );
const Dashboard = () => {

    const initialWidget = {
        selection:"",
        queries:""
    }

    const options = {
        responsive: true,
          plugins: {
          legend: {
            position: 'top',// lable position left/right/top/bottom
            labels: {
              boxWidth: 30, // lable box size
            }
          },
        },
        elements: {
          point: {
            radius: 1
          }
        },
        scales: {
          x: {
            display: true,  // show/ hide x-axis
            grid: {
              display: false  // show/hide grid line in x-axis
            },
          },
          y: {
            display: true, // same as x-axis
            grid: {
              display: true
            }
          }
        }
    };

    const {http, user} = AuthService();
    const [totalProjects, setTotalProjects] = useState();
    const [totalProjectsForHr, setTotalProjectsForHr] = useState();
    const [totalTasks, setTotalTasks] = useState();
    const [totalTeamMembers, setTotalTeamMember] = useState();
    const [totalEmployees, setTotalEmployees] =  useState();
    const [totalJobs, setTotalJos] =  useState();
    const [empLeaves, setEmpLeaves] = useState([]);
    const [rowData, setRowData] = useState({});
    const [approveModal, setapproveModal] = useState(false);
    // const [dropdownOpen, setDropdownOpen] = useState(false);
    const [data, setTopProj] = useState()
    const [isOpen, setIsOpen] = useState(false);
    const[visible, setVisible ]=useState(false);
    const [selected, setSelected] = useState(false);
    const [dd_data, setDdData] = useState(ProjectQueries);
    const [selected_dd_data, setSelectedDdData] = useState();
    const [widgetValue, setWidgetValue] = useState(initialWidget);
    const [dashboardId, setDashboardId] = useState();
    const [alert, setAlert] = useState(null);
    const [widgetsData, setWidgetsData] =useState([]);
    const [rd_value, setRdValue] = React.useState('');

    const toggle = () => {
        setIsOpen(!isOpen); 
        setVisible(false);
        setSelected(false);
        setRdValue('');
        setSelectedDdData('');
    };

    const selectiontoggle = e => {
        const {name, value} = e.target;
        if(value === "0")
        {
            setDdData(ProjectQueries)
        }
        if(value === "1")
        {
            setDdData(EmployeeQueries)
        }
        setSelectedDdData('');
        setWidgetValue({...widgetValue, [name]: value});
        setRdValue(value);
        setVisible(true);
      
    };

    const handleChange = event => {
        setSelected(true)
        const {name, value} = event.target;
        setSelectedDdData(value);
        setWidgetValue({...widgetValue, [name]: value});
    };

    const GetDashboardId = () =>{
        http.get(GetEndPoints().dashboardId+'/'+user.employeeId)
        .then((res) =>{
           if(res.data.success){
            setDashboardId(res.data.response);
           }
        })
        .catch((err) => console.log(err.message));
    }

    const GetProjects = () => {
        http.get(GetEndPoints().projectsByEmployeeId+'/'+user.employeeId)
        .then((res) =>{
           if(res.data.success){
            setTotalProjects(res.data.response.length);
           }
        })
        .catch((err) => console.log(err.message));
    }

    const GetTaskListByManagerId = () => {
            http.get(GetEndPoints().taskListByManagerId+'/'+user.employeeId)
            .then((res) =>{
               if(res.data.success){
                setTotalTasks(res.data.response.length); 
               }
            })
            .catch((err) => console.log(err.message));
    }

    const GetTeamMembersByManagerId = () => {
        http.get(GetEndPoints().teamMembers+'/'+user.employeeId)
        .then((res) =>{
           if(res.data.success){
            setTotalTeamMember(res.data.response);
           }
        })
        .catch((err) => console.log(err.message));
    }
    
    const GetProjectForHR = () => {
        http.get(GetEndPoints().projectsForHR)
        .then((res) =>{
           if(res.data.success){
            setTotalProjectsForHr(res.data.response.length);
           }
        })
        .catch((err) => console.log(err.message));
    }

    const GetEmployeesForHR = () => {
        http.get(GetEndPoints().employee)
        .then((res) =>{
           if(res.data.success){
            setTotalEmployees(res.data.response.length);
           }
        })
        .catch((err) => console.log(err.message));
    }

    const GetJobsForHR = () => {
        http.get(GetEndPoints().job)
        .then((res) =>{
           if(res.data.success){
            setTotalJos(res.data.response.length);
           }
        })
        .catch((err) => console.log(err.message));
    }
    
    const GetEmployeeLeaves = () =>{
        http.get(GetEndPoints().employeeLeaves)
        .then((res) =>{
           if(res.data.success){
            setEmpLeaves(res.data.response)
           }
        })
        .catch((err) => console.log(err.message));
    }

    const GetEmployeeLeavesById = () =>{
        http.get(GetEndPoints().employeeLeaves+'/'+user.employeeId)
        .then((res) =>{
           if(res.data.success){
            setEmpLeaves(res.data.response)
           }
        })
        .catch((err) => console.log(err.message));
    }

    const GetTopProjects = () =>{
        http.get(GetEndPoints().topProjects)
        .then((res) =>{
           if(res.data.success){
            var data = {
                labels: res.data.response.labels,
                datasets: [
                  {
                    label: "Top 5 budget projects",
                    backgroundColor: ["rgb(255, 99, 132)",
                    'rgb(196, 200, 102)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)'],
                    borderColor: "rgb(255, 99, 132)",
                    data: res.data.response.data,
                  },
                ],
              };
           }
            setTopProj(data)
        })
        .catch((err) => console.log(err.message));
    }

    const GetWidgets = () =>{
        http.get(GetEndPoints().widgets+'/'+ user.employeeId)
        .then((res) =>{
           if(res.data.success){
            setWidgetsData(res.data.response.reverse());
           }
        })
        .catch((err) => console.log(err.message));
    }

    useEffect(() =>{
        GetTopProjects();
        GetDashboardId();
        GetWidgets();
        //for Manager
        if(user.role && user.role == "Manager")
        {
            GetProjects();
            GetTaskListByManagerId();
            GetTeamMembersByManagerId();
            GetEmployeeLeavesById();
        }

        //for HR
        if(user.role && user.role == "HR")
        {
            GetProjectForHR();
            GetEmployeesForHR();
            GetJobsForHR();
            GetEmployeeLeaves();
        }
   
    },[user.role, user.employeeId, rowData])

    const columns = [
        { field: 'id', headerName: 'Id', width:20},
        { field: 'employeeId', headerName: 'Employee Id', sortable:true, editable:true},
        { field: 'projectName', headerName: 'Project'},
        { field: 'leaveType', headerName: 'Leave Type'},
        { field: 'leaveStartDate', headerName: 'Start Date'},
        { field: 'leaveEndDate', headerName: 'End Date'},
      ];

const approvetoggle = (event) => {
    setRowData(event.row)
    setapproveModal(!approveModal)
};

const cancelModel = e => {
    setapproveModal(!approveModal)
}

const approveLeave = (data) => {
    http.put(GetEndPoints().updateLeave, {
        employeeLeaveId:data.id,
        employeeId: data.employeeId,
        leaveTypeId: data.leaveType === 'Sick'? 1 : 2,
        leaveStart: data.leaveStartDate,
        leaveEnds: data.leaveEndDate,
        leaveDays: data.totalLeaveDays,
        isApproved: true,
        leaveApprovalDate:moment(new Date()).utc().format('YYYY-MM-DD'),
        leaveApprovalBy: user.role,
        leaveStatus: "Approved"
    } )
    .then((res) =>{
       if(res.data.success){
        setapproveModal(!approveModal)
        if(user.role && user.role == "Manager")
        {
            GetEmployeeLeavesById();
        }

        //for HR
        if(user.role && user.role == "HR")
        {
            GetEmployeeLeaves();
        }
       }
    })
    .catch((err) => console.log(err.message))
}

const rejectLeave = (data) => {
    http.put(GetEndPoints().updateLeave, {
        employeeLeaveId:data.id,
        employeeId: data.employeeId,
        leaveTypeId: data.leaveType === 'Sick'? 1 : 2,
        leaveStart: data.leaveStartDate,
        leaveEnds: data.leaveEndDate,
        leaveDays: data.totalLeaveDays,
        isApproved: false,
        leaveApprovalDate:moment(new Date()).utc().format('YYYY-MM-DD'),
        leaveApprovalBy: user.role,
        leaveStatus: "Rejected"
    } )
    .then((res) =>{
       if(res.data.success){
        setapproveModal(!approveModal)
        if(user.role && user.role == "Manager")
        {
            GetEmployeeLeavesById();
        }

        //for HR
        if(user.role && user.role == "HR")
        {
            GetEmployeeLeaves();
        }
       }
    })
    .catch((err) => console.log(err.message))
}

const handleWidget = e =>{
    e.preventDefault();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    today = yyyy +'-'+mm+'-'+dd;
    http.post(GetEndPoints().addWidget, {
        dashboardId: dashboardId,
        createdBy: user.firstName + " " + user.lastName,
        createdOn: today,
        selection: widgetValue.selection,
        queries: widgetValue.queries
    })
    .then((res) =>{
        if(res.data.success)
        {
            setAlert(
                <SweetAlert
                  success
                  style={{ display: "block", marginTop: "-100px" }}
                  title="Widget Added!"
                  onConfirm={() => { hideAlert();}}
                  onCancel={() => hideAlert()}
                  confirmBtnBsStyle="success"
                  btnSize=""
                >
                  New Widget Added</SweetAlert>
              );

              GetWidgets();
        }
    })
    .catch((err) => console.log(err))
}

const hideAlert = () => {
    setAlert(null);
  };

const deleteWidget = (widget) =>{
    setAlert(
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title="Are you sure!"
          onConfirm={() => { deleteWid(widget); hideAlert();}}
          onCancel={() => hideAlert()}
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle='primary'
          showCancel
          btnSize=""
        >
          You want to deleted widget!!</SweetAlert>
      );
   
}
const deleteWid = (widget) =>{
    http.delete(GetEndPoints().deleteWidget + '/'+ widget.widgetId)
    .then((res) => {
        setAlert(
            <SweetAlert
              danger
              style={{ display: "block", marginTop: "-100px" }}
              title="Widget Deleted!"
              onConfirm={() => { hideAlert()}}
              onCancel={() => hideAlert()}
              confirmBtnBsStyle="danger"
              btnSize=""
            >
              You have deleted One widget!!</SweetAlert>
          );
       
          GetWidgets();
    })
    .catch(err => console.log(err))
}

if(data === undefined)
{
    return (<div class="d-flex justify-content-center">
                <div class="spinner-grow text-success" style={{width: "3rem", height: "3rem"}} role="status">
                <span class="sr-only">Loading...</span>
                </div>
            </div>);
}
else{
    return ( 
        <>
         <Container className="px-3">
            {alert}
        {
            user.role && user.role === "HR" && 
            <div className=" d-flex justify-content-between">
            <Col className="py-2 px-3 yellow-bg rounded m-2">
                    <Link to={"/dashboard/projects"} className='d-flex  align-items-center  text-decoration-none justify-content-between'>
                        <div>
                            <img src={projectpic} alt="project"/>
                        </div>
                        <div>
                            <h5 className="text-white">Projects</h5>
                            <h2 className="text-white fw-bold m-0 float-end">{totalProjectsForHr}</h2>
                    </div>
                </Link>
            </Col>
            <Col className="py-2 px-3 orange-bg rounded m-2">
                <Link to={'/dashboard/teammembers'} className='d-flex  align-items-center  text-decoration-none justify-content-between'>
                        <div>
                            <img src={teamMembers} alt="team members"/>
                        </div>
                        <div>
                            <h5 className="text-white">Employee List</h5>
                            <h2 className="text-white fw-bold m-0 float-end">{totalEmployees}</h2>
                        </div>    
                </Link>
            </Col>
            <Col className="py-2 px-3 green-bg rounded m-2">
                <div className="d-flex  align-items-center  text-decoration-none justify-content-between ">
                        <div>
                            <img src={taskpic} alt="task"/>
                        </div>
                        <div>
                            <h5 className="text-white ">Jobs Created</h5>
                            <h2 className="text-white fw-bold m-0 float-end">{totalJobs}</h2>
                        </div>
               
                </div>
            </Col>
        </div>
        }
        {
            user.role && user.role === "Manager" && 
            <div className=" d-flex justify-content-between">
            <Col className="py-2 px-3 yellow-bg rounded m-2">
                <Link to={"/dashboard/projects"} className='d-flex  align-items-center  text-decoration-none justify-content-between'>
                        <div>
                            <img src={projectpic} alt="manager project"/>
                        </div>
                        <div>
                            <h5 className="text-white">Projects</h5>
                            <h2 className="text-white fw-bold m-0 float-end">{totalProjects}</h2>
                    </div>
                </Link>
            </Col>
            <Col className="py-2 px-3 orange-bg rounded m-2">
                <Link to={'/dashboard/teammembers'} className='d-flex  align-items-center  text-decoration-none justify-content-between'>
                        <div>
                            <img src={teamMembers} alt="team members"/>
                        </div>
                        <div>
                    <h5 className="text-white">Team Memebers</h5>
                    <h2 className="text-white fw-bold m-0 float-end">{totalTeamMembers}</h2>
                    </div>
                </Link>
            </Col>
            <Col className="py-2 px-3 green-bg rounded  m-2">
            <div className="d-flex  align-items-center  text-decoration-none justify-content-between ">
                        <div>
                            <img src={taskpic} alt="task"/>
                        </div>
                        <div>
                <h5 className="text-white">Task Created</h5>
                <h2 className="text-white fw-bold m-0 float-end">{totalTasks}</h2>
                </div>
            </div>    
            </Col>
        </div>
        }
        
        <Row className="px-2 py-3">
            <Col md={6} className="">
                <Card className="prCard py-5 px-3 border-0">
                    {data && <Bar data={data} options={options}/>}
                </Card>
            </Col>
            <Col md={6} className="">
                <Card className="prCard pt-3 px-3 border-0" >
                    <CardTitle className="small text-muted">Leaves</CardTitle>
                    <div style={{ display: 'flex', height: '315px', justifyContent: 'space-between' }}>
                <div style={{width:'100%'}}>
                    <DataGrid className="table-striped border-0" rows={empLeaves} columns={columns}
                        pageSize={8} 
                        rowsPerPageOptions={[8]}
                        SelectionOnClick
                        onRowClick={approvetoggle}
                    />
                </div>
                <Modal isOpen={approveModal} toggle={approvetoggle} backdrop="static" centered>
                          <ModalHeader>  <h4>Update Leave Status</h4> </ModalHeader>
                          <ModalBody>
                          <Card style={{}} className="text-center prCard">
                            <CardBody className="profile-card" >
                                <img alt="..."className="avatar mt-5 rounded-circle" style={{width:100}} src={`${rowData?.employeeImage ? rowData?.employeeImage : pic}`} />
                                <CardTitle tag="h5"> {rowData.employeeName} </CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6"><small> <strong>ID: </strong>  E-{rowData.employeeId}</small>
                            <p className="mb-0"><small>{rowData?.role}, {rowData?.department}</small></p>
                            <small className="lh-1 me-2"><strong>Ext: </strong> {rowData.extension}</small>
                            <p className="mb-0"><small>{rowData?.email}</small></p>
                            </CardSubtitle>
                            </CardBody>
                        </Card>
                          <div className="d-flex justify-content-center mt-5">
                          <Button className="me-3" color="primary" onClick={()=> approveLeave(rowData)}>
                              Approve
                          </Button>{' '}
                          <Button className="me-3" color="primary" onClick={()=> rejectLeave(rowData) }>
                              Reject
                          </Button>{' '}
                          <Button color="secondary" onClick={e => cancelModel()}>
                              Cancel
                          </Button>
                          </div>
                          </ModalBody>
                          
                      </Modal>
            </div>
                </Card>
            </Col>
        </Row>
        <Row className="px-2 pb-3">
        <Col>
            <Button onClick={toggle}  className="border-0  bg-primary rounded ">
                <div className="text-white">< AddIcon fontSize="small"/> <strong>Add Widget</strong></div>
            </Button>
            <Collapse isOpen={isOpen} className="mb-3 ">
                <Card className="rounded-0 border-0">
                <CardBody>
                <Form>
                    <FormGroup className="d-flex text-muted align-items-center">
                             <h6 className="me-3">Choose for</h6>
                        <FormGroup check >
                            <Label check>
                            <Input type="radio"
                            name="selection"
                            value="0"
                            checked={rd_value === '0'}
                            onClick={selectiontoggle} 
                                />
                            <span className="me-3">Projects </span>
                            </Label> 
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" 
                            name="selection" 
                            value="1"
                            checked={rd_value === '1'}
                            onClick={selectiontoggle}/>
                            <span className="me-3">Employees </span>
                            </Label>
                        </FormGroup>
                        </FormGroup>
                        <div className="d-flex align-items-center justify-content-between">
                        { visible &&
                        <div className="p-0 col-md-4 col-sm-12">
                                <FormGroup>
                                    <Input
                                    id="queries"
                                    name="queries"
                                    type="select"
                                    value={selected_dd_data}
                                    onChange={handleChange}
                                    >
                                   {
                                        dd_data && dd_data.map((obj, index) => <option key={index} value={obj.key}>{obj.value}</option>)
                                   }
                                    </Input>
                                </FormGroup>
                          
                        </div>
                            }
                        {selected && selected_dd_data !== '' && 
                        <div className="p-0 ms-1 d-flex col">
                                <Button className="bg-primary ms-3 mb-3 col-md-3 col-sm-12 buttonPro" type="submit" 
                                onClick={handleWidget}>Create Widget</Button>
                        </div>
                        }
                        </div>     
                    </Form> 
                </CardBody>
                </Card>
            </Collapse>
        </Col>    
        </Row>
       {widgetsData &&
          widgetsData.map((widget, index) => {
            let lbl = "";
           
            if(widget.selection === '0')
            {
                lbl = ProjectQueries.find(x => x.key === widget.queries);
            }
            if(widget.selection === '1')
            {
                lbl = EmployeeQueries.find(x => x.key === widget.queries);
            }
            if(widget.queries === 'p-7')
            {
                var data = {
                    labels: widget.chart.labels,
                    datasets: [
                      {
                        label: lbl.value,
                        backgroundColor: ["rgb(255, 99, 132)",
                        'rgb(196, 200, 102)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)'],
                        borderColor: "rgb(255, 99, 132)",
                        barThickness: 50,
                        barPercentage: 0.5,
                        maxBarThickness: 100,
                        data: widget.chart.data.map((date, i) => moment(date).utc().format('MM')),
                      },
                    ],
                   
                  };
            }
            else{
                var data = {
                    labels: widget.chart.labels,
                    datasets: [
                      {
                        label: lbl.value,
                        backgroundColor: ["rgb(255, 99, 132)",
                        'rgb(196, 200, 102)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)'],
                        borderColor: "rgb(255, 99, 132)",
                        barThickness: 50,
                        barPercentage: 0.5,
                        maxBarThickness: 100,
                        data: widget.chart.data,
                      },
                    ]
                  };
            }
           
            return ( 
                <>
                
                    <Row key={index} className="px-2 py-2">
                    <button onClick={() => deleteWidget(widget)}> Delete</button>
                        <Tabs key={index}
                            defaultActiveKey="bar"
                            transition={true}
                            id="noanim-tab-example"
                            className="mb-3 flex-row"
                            variant="pills"
                            >
                            <Tab eventKey="bar" title={<BarChartIcon color="primary" />}>
                                <Card className="py-5 px-3 border-0 mt-4">
                                    <Bar data={data}  options={options}/>
                                </Card>
                            </Tab>
                            <Tab eventKey="line" title={<TimelineIcon color="primary"/>}>
                                <Card className=" py-5 px-3 border-0 mt-4">
                                    <Line data={data} />
                                </Card>
                            </Tab>
                            <Tab eventKey="pie" title={<PieChartIcon color="primary"/>} >
                                <Card className="py-5 px-3 border-0 mt-4">
                                    <Pie data={data} />
                                </Card>
                            </Tab>
                        </Tabs>
                                
                              {/* <div className="d-flex align-items-center justify-content-start chartIcons ">
                                    <span className="prCard p-2 me-3 rounded"> <BarChartIcon color="primary"/></span>
                                    <span className="prCard p-2 me-3 rounded"> <TimelineIcon color="primary"/></span>
                                    <span className="prCard p-2 rounded"> <PieChartIcon color="primary"/></span>
                                </div>  */}
                                 {/* <Card className="py-5 px-3 border-0 mt-4">
                                    <Bar data={data}  options={options}/>
                                </Card> */}
                                {/* <Card className=" py-5 px-3 border-0 mt-4">
                                    <Line data={data} />
                                </Card>
                                <Card className="py-5 px-3 border-0 mt-4">
                                    <Pie data={data} />
                                </Card> */}
                    </Row>
                    </>
                )
         })
         }
        </Container>
        </>
    );
}

}
 
export default Dashboard;