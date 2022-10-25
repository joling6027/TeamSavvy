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
import events from './events';


const locales ={
  "en-US" : require ("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({format, parse, startOfWeek, getDay, locales})


const Timesheet = () => {
  
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState();
  // const [leaveType, setLeaveType] = useState();
  const [event, setEvents] = React.useState(events);
  const [alert, setAlert] = React.useState(null);
  const leavesArr =[
     { id : 1, title : "Sick Leave(s)"},
     { id : 2, title : "Vacation Leave(s)"}
    ];
  
  const successDelete = () => {
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
        Leave has been cancelled</SweetAlert>
    );
  };
  
  const selectedEvent = (event) => {
    const selectedTitle = "Do you want to delete '"+ (event.title) + "' leave"; 
    //change title on the basis of role
    // const hrtitle = "Edit event '" +  (event.title) + "'";
    setTitle(selectedTitle);
    setModal(!modal);
  
  };
  
  // const handleLeave = (event) =>{
  //   window.alert();
  //   console.log(event.target.value);
  //   const leaveTitle = (leavesArr.find( leave => leave.id == event.target.value)).title;
  //   console.log(leaveTitle);
  //   setLeaveType(leaveTitle);
  //   console.log(leaveType);
  // };
  
  const addNewEventAlert = (slotInfo) => {
    if(new Date(slotInfo.start).getMonth() >= new Date().getMonth() &&
    new Date(slotInfo.start).getMonth() >= new Date().getMonth())
    {
      setAlert(
        <SweetAlert
          showCancel
          title="Select type of Leave"
          onCancel={() => hideAlert()}
          confirmBtnBsStyle="info"
          cancelBtnBsStyle="danger"
          onConfirm={(e) => addLeave(e, slotInfo)}
          type={'controlled'}
          dependencies = {[this.state.leaveType]}
          >
            
          <select id="leaves" name="leaves" className="w-100 form-select" onChange={(e) => this.setState({leaveType : e.target.value})}>
          {/* <option value={0} key="0">Select Leave </option> */}
          <option value={1} key="1">Sick Leave(s) </option>
          <option value={2} key="2"> Vacation Leave(s) </option>
          </select>
        
        </SweetAlert>
      );
    }
    
  };

  const addLeave = (e, slotInfo) => {
    console.log(e);
    var newEvents = events;
    newEvents.push({
      title:  e,
      start: slotInfo.start,
      end: slotInfo.end
    });
    setAlert(null);
    setEvents(newEvents);
  };
  
  const hideAlert = () => {
    setAlert(null);
    setModal(false);
  };
  const eventColors = (event, start, end, isSelected) => {
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
          return {
      className: backgroundColor
    };
  };

   return (
     <>
        <div className="container">
        {alert}
        <Row class="justify-content-center">
          <Col className="ml-auto mr-auto mb-5 pe-0" md={10}>
            <Card className="card-calendar prCard">
              <CardBody>.
              <BigCalendar
                  selectable
                  localizer={localizer}
                  events={event}
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
            <Col className="d-inline-block" md={2}>
            <Card className="prCard p-2 text-center">
                <h3 className="pt-1">Hours</h3>
                <CardBody className="p-2">
                    <p className="mt-2 mb-2">Worked</p>
                    <div className="totalhr flex-column d-flex">
                      <span>40</span>
                      <span>40</span>
                      <span>40</span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                </CardBody>
            </Card>
            </Col>
        </Row>
        </div>
        <Modal isOpen={modal} backdrop="static" centered>
          <ModalBody>
                <h4>{title}</h4>
                <div className="d-flex justify-content-center mt-5">
                <Button className="me-3" color="primary" onClick={successDelete}>
                    Cancel Leave
                </Button>
                <Button color="secondary" onClick={() => {setModal(!modal)}} >
                    Cancel
                </Button>
                </div>
          </ModalBody>
        </Modal>
    </>
  );
};
export default Timesheet;