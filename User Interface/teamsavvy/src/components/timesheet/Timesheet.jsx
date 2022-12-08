import React, { useState , useCallback} from 'react';
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import DatePicker from 'react-datepicker';
import { Card, CardBody, Row, Col, CardTitle ,Button,Modal, ModalBody} from "reactstrap";
import './timesheet.css';
import { dateFnsLocalizer } from 'react-big-calendar';
import SweetAlert from "react-bootstrap-sweetalert";
import AuthService from '../services/authService';
import { useEffect } from 'react';
import { GetEndPoints } from '../utilities/EndPoints';
import moment from "moment";

const locales ={
  "en-US" : require ("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({format, parse, startOfWeek, getDay, locales})


const Timesheet = () => {

  const {http, user} = AuthService();
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState();
  const [event, setEvents] = useState([]);
  const [timeSheet, setTimeSheet] = useState([]);
  const [alert, setAlert] = useState(null);
  const [leavesArr, setLeaveArr] = useState([]);
  const [selectedLeaveType, setSelectedLeaveType] = useState();
  const [totalWorkHours, setTotalWorkHours] = useState([]);
  const [arr, setArr] = useState([1]);
  const GetLeaveType = () =>{
    http.get(GetEndPoints().leaveType)
    .then((res) =>{
       if(res.data.success){
        setLeaveArr(res.data.response);
       }
    })
    .catch((err) => console.log(err.message))
  }

  const GetTimeSheet = () =>{
    
    http.get(GetEndPoints().timeSheet+'/'+user.employeeId)
    .then((res) =>{
       if(res.data.success){
       let timeSheetEvent = res.data.response.map((timeSheet, index) => {
          let actualDate = new Date(timeSheet.clockDate);
          actualDate.setDate(actualDate.getDate() + 1);
          let tSheet = {
            title: timeSheet.clockType === "Clock-In"? "In  " + timeSheet.clockTime : "Out  "+ timeSheet.clockTime,
            start: moment(actualDate).utc().format('YYYY-MM-DD'),
            end: moment(actualDate).utc().format('YYYY-MM-DD'),
            employeeId:timeSheet.employeeId,
            allDay: true,
            clockType:timeSheet.clockType,
            leaveTypeId: 0,
            employeeLeaveId: 0,
            isApproved:true,
            color: "gray",
          }

          return tSheet;
       })
       
       setEvents([...event, ...timeSheetEvent]);
       setTimeSheet(timeSheetEvent);
       GetTotalHours(res.data.response);
       }
    })
    .catch((err) => console.log(err.message))
  }
  

  function parseTime(s) {
    var part = s.match(/(\d+):(\d+)(?: )?(am|pm)?/i);
    var hh = parseInt(part[1], 10);
    var mm = parseInt(part[2], 10);
    var ap = part[3] ? part[3].toUpperCase() : null;
    if (ap === "AM") {
        if (hh == 12) {
            hh = 0;
        }
    }
    if (ap === "PM") {
        if (hh != 12) {
            hh += 12;
        }
    }
    return { hh: hh + (mm/60) };
}

  const GetTotalHours = (timeSheetEvent) => {
    let collectDateTime = [];
    for (let index = 0; index < timeSheetEvent.length; index += 2) {
      let first = parseTime(timeSheetEvent[index].clockTime);
      let second = parseTime(timeSheetEvent[index + 1].clockTime);
      collectDateTime.push({
            date:timeSheetEvent[index].clockDate,
            time: second.hh - first.hh
      })
    }

    setTotalWorkHours(collectDateTime);
  }



  const GetLeavesById = () =>{
     http.get(GetEndPoints().employeeLeave+'/'+user.employeeId)
     .then((res) => {
        if(res.data.success)
        {
           let customLeaves = res.data.response.map((leave, index) => {
              let leaves = {
                title:leave.leaveTypeId === 1 ? 'Sick Leave(s)':'Vacation Leave(s)', 
               
                leaveTypeId: leave.leaveTypeId,
                employeeId: leave.employeeId,
                employeeLeaveId: leave.employeeLeaveId,
                start: leave.leaveEnds,
                end: leave.leaveEnds,
                allDay: true,
                isApproved:leave.isApproved,
                leaveStatus:leave.leaveStatus,
                color: leave.isApproved && leave.leaveStatus === 'Approved' ? "green" : leave.isApproved === false && leave.leaveStatus === 'Rejected' ? "red" :  leave.leaveTypeId === 1 ? "orange" : "yellow",
              }
              return leaves;
            })
            setEvents(customLeaves);
        }
     })
     .catch((err) => console.log(err.message))
  }


  useEffect(() =>{
    GetTimeSheet();
    GetLeaveType();
    GetLeavesById();
  }, [event.employeeLeaveId])


  const successDelete = () => {
    let obj = JSON.parse(localStorage.getItem('deleteLeave'));
    DeleteLeave(obj.employeeLeaveId);
  };
  
  const DeleteLeave = (employeeLeaveId) => {
    http.delete(GetEndPoints().deleteLeave+'/'+ employeeLeaveId )
    .then((res) =>{
       if(res.data.success){
        setAlert(
          <SweetAlert
            success
            style={{ display: "block", marginTop: "-100px" }}
            title="Deleted!"
            onConfirm={() => hideAlert()}
            onCancel={() => hideAlert()}
            confirmBtnBsStyle="success"
            btnSize=""
          >
            Leave has been deleted</SweetAlert>
        );
       }
       setModal(!modal);
      //  event.pop()
      GetLeavesById();
       setEvents(event);
    })
    .catch((err) => console.log(err.message))
  }

  const selectedEvent = (event) => {
    if(event.clockType === "Clock-Out" || event.clockType === "Clock-In")
    {
     
    }
    else{
      localStorage.setItem('deleteLeave', JSON.stringify({
        employeeLeaveId:event.employeeLeaveId
       }));
       const selectedTitle = "Do you want to delete '"+ (event.title) + "' leave"; 
       setTitle(selectedTitle);
       setModal(!modal);
    }
  };
  
 
  const addNewEventAlert = (slotInfo) => {
    if(parseInt(new Date(slotInfo.start).getMonth()) > parseInt(new Date().getMonth()))
    {
      setEvents([...event, {
          title:leavesArr[0].leaveType, 
          leaveTypeId: leavesArr[0].leaveTypeId,
          employeeId: user.employeeId,
          start: slotInfo.start,
          end: slotInfo.end,
          allDay: true,
          color: leavesArr[0].leaveTypeId === 1? "orange" : "yellow"
      }]);
      localStorage.setItem('leave', JSON.stringify({
        title:leavesArr[0].leaveType, 
        leaveTypeId: leavesArr[0].leaveTypeId,
        employeeId: user.employeeId,
        start: slotInfo.start,
        end: slotInfo.end,
        allDay: true,
        color: leavesArr[0].leaveTypeId === 1? "orange" : "yellow"
    }));
      setAlert(
        <SweetAlert
          showCancel
          title="Select type of Leave"
          onCancel={handleLeaveCancel}
          confirmBtnBsStyle="primary"
          cancelBtnBsStyle="danger"
          onConfirm={(e) =>addLeave(e, slotInfo)}
          >
          <select id="leaves" name="leaves" className="w-100 form-select" onChange={(e) => handleLeaveChange(e, slotInfo)}>
          {
              leavesArr.map((leaveType, index) => <option key={index} value={leaveType.leaveTypeId}>{leaveType.leaveType}</option>)
          }
          </select>
        </SweetAlert>
      );
    }
    
    if((parseInt(new Date(slotInfo.start).getMonth()) === parseInt(new Date().getMonth()) && new Date(slotInfo.start).getDate() >= new Date().getDate()))
    {
setEvents([...event, {
          title:leavesArr[0].leaveType, 
          leaveTypeId: leavesArr[0].leaveTypeId,
          employeeId: user.employeeId,
          start: slotInfo.start,
          end: slotInfo.end,
          allDay: true,
          color: leavesArr[0].leaveTypeId === 1? "orange" : "yellow"
      }]);
      localStorage.setItem('leave', JSON.stringify({
        title:leavesArr[0].leaveType, 
        leaveTypeId: leavesArr[0].leaveTypeId,
        employeeId: user.employeeId,
        start: slotInfo.start,
        end: slotInfo.end,
        allDay: true,
        color: leavesArr[0].leaveTypeId === 1? "orange" : "yellow"
    }));
      setAlert(
        <SweetAlert
          showCancel
          title="Select type of Leave"
          onCancel={handleLeaveCancel}
          confirmBtnBsStyle="primary"
          cancelBtnBsStyle="danger"
          onConfirm={(e) =>addLeave(e, slotInfo)}
          >
          <select id="leaves" name="leaves" className="w-100 form-select" onChange={(e) => handleLeaveChange(e, slotInfo)}>
          {
              leavesArr.map((leaveType, index) => <option key={index} value={leaveType.leaveTypeId}>{leaveType.leaveType}</option>)
          }
          </select>
        </SweetAlert>
      );
    }
    
  };

  const handleLeaveCancel = () =>{
    setEvents(event);
    setAlert(null);
  }

  const handleLeaveChange = (e,slotInfo) =>{
    const newLeave = (leavesArr.find( leave => leave.leaveTypeId == e.target.value));
    setEvents([...event, {
            title:newLeave.leaveType, 
            leaveTypeId: newLeave.leaveTypeId,
            employeeId: user.employeeId,
            start: slotInfo.start,
            end: slotInfo.end,
            allDay: true,
            color: newLeave.leaveTypeId === 1? "orange" : "yellow",
      }]);
      localStorage.setItem('leave', JSON.stringify({
        title:newLeave.leaveType, 
        leaveTypeId: newLeave.leaveTypeId,
        employeeId: user.employeeId,
        start: slotInfo.start,
        end: slotInfo.end,
        allDay: true,
        color: newLeave.leaveTypeId === 1? "orange" : "yellow"
    }));
  };
  

  const addLeave = (e,slotInfo) => {
    setAlert(null);
    let newLeave = JSON.parse(localStorage.getItem('leave'));
    let addLeave = {
      employeeLeaveId: 0,
      employeeId: newLeave.employeeId,
      leaveTypeId:(leavesArr.find( leave => leave.leaveType === newLeave.title)).leaveTypeId,
      leaveStart: moment(newLeave.start).utc().format('YYYY-MM-DD'),
      leaveEnds: moment(newLeave.end).utc().format('YYYY-MM-DD'),
      leaveDays: Math.floor((new Date(newLeave.end) - new Date(newLeave.start))/(1000 * 60 * 60 * 24)),
      isApproved: false,
      leaveApprovalDate: "",
      leaveApprovalBy: "",
      leaveStatus: ""
    }
    AddLeave(addLeave);
  };
  

  const AddLeave = (addLeave) =>{
    http.post(GetEndPoints().addLeave, addLeave )
    .then((res) =>{
       if(res.data.success){
        setAlert(
          <SweetAlert
            success
            style={{ display: "block", marginTop: "-100px" }}
            title="Leave Add!"
            onConfirm={() => hideAlert()}
            onCancel={() => hideAlert()}
            confirmBtnBsStyle="success"
            btnSize=""
          >
            Leave has been added.</SweetAlert>
        );
       }
       GetLeavesById();
    })
    .catch((err) => console.log(err.message))
  }


  const hideAlert = () => {
    setAlert(null);
    setModal(false);
  };

  const eventColors = (event, start, end, isSelected) => {
    let style;
    var clockInStyle = {
      backgroundColor: '#fff',
      borderRadius: '0px',
      opacity: 1,
      color: '#9B9898 !important',
      border: '0px',
      display: 'block',
      width:'auto',
      right:0,
      top:'83px',
      lineHeight:'20px',
    }

    var clockOutStyle = {
      backgroundColor: '#fff',
      borderRadius: '0px',
      opacity: 1,
      color: '#9B9898 !important',
      border: '0px',
      display: 'block',
      width:'auto',
      right:0,
      top:'85px',
      lineHeight:'20px',
    }

    var vaccationReject = {
      backgroundColor: 'red',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block'
    }

    var leaveIsApproved = {
      backgroundColor: '#17a61e',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block'
    }

    var vaccationLeaveStyle = {
        backgroundColor: '#ffc107',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block'
    };

    var sickLeaveStyle = {
      backgroundColor: '#fa8a09',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block'
  };

      if(event.clockType === "Clock-Out")
      {
        style = clockOutStyle
      }
     if(event.clockType === "Clock-In")
      {
        style = clockInStyle
      }
      if( event.leaveTypeId === 1){
          style = sickLeaveStyle
      }
      if(event.leaveTypeId === 2 ){
        style = vaccationLeaveStyle
      }
      if(!event.isApproved && event.leaveStatus === 'Rejected')
      {
        style = vaccationReject;
      }
      if(event.isApproved && event.leaveStatus === 'Approved')
      {
        style = leaveIsApproved;
      }
  
    return {
        style:style
    };

  };

   if(timeSheet === undefined)
   {
    return (<div class="d-flex justify-content-center">
            <div class="spinner-grow text-success" style={{width: "3rem", height: "3rem"}} role="status">
            <span class="sr-only">Loading.....</span>
            </div>
        </div>);
   }
   else{
    return (
      <>
         <div className="px-3">
         {alert}
         <Row class="justify-content-center">
           <Col className="ml-auto mr-auto mb-5 pe-0" md={12}>
             <Card className="card-calendar prCard">
               <CardBody>
               <BigCalendar
                   selectable
                   localizer={localizer}
                   events={[...event, ...timeSheet]}
                   views={{month: true}}                 
                   defaultView="month"
                   scrollToTime={new Date(1970, 1, 1, 6)}
                   defaultDate={new Date()}
                   onSelectEvent={(event) => selectedEvent(event)}
                   onSelectSlot={(slotInfo) => addNewEventAlert(slotInfo)}
                   eventPropGetter={eventColors}
                   
                 />
               </CardBody>
             </Card>
             </Col>
         </Row>
         </div>
         {/* cancel leave modal */}
         <Modal isOpen={modal} backdrop="static" centered>
           <ModalBody>
                 <h4>{title}</h4>
                 <div className="d-flex justify-content-center mt-5">
                 <Button className="me-3" color="primary" onClick={successDelete}>
                     Cancel Leave
                 </Button>
                 <Button color="secondary" onClick={() => {
                   setModal(!modal);
                   }} >
                     Cancel
                 </Button>
                 </div>
           </ModalBody>
         </Modal>
     </>
   );
   }
  
};
export default Timesheet;