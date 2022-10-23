import React, { useState , useCallback} from 'react';
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import DatePicker from 'react-datepicker';
import { Card, CardBody, Row, Col, CardTitle ,Button,Modal} from "reactstrap";
import './timesheet.css';
import { dateFnsLocalizer } from 'react-big-calendar';
import SweetAlert from "react-bootstrap-sweetalert";
import events from './events';


const locales ={
  "en-US" : require ("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({format, parse, startOfWeek, getDay, locales})


const Timesheet = () => {
  

  const [event, setEvents] = React.useState(events);
  const [alert, setAlert] = React.useState(null);

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
    // window.alert(event.title);
    //event.title;
    const title = "Do you want to delete '"+ (event.title) + "' event"; 
    const hrtitle = "Edit event '" +  (event.title) + "'";
    setAlert(
      <SweetAlert
        showCancel
        title= {title}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="info"
        cancelBtnBsStyle="danger"
      />
      
      // for HR or manager
      // <SweetAlert
      //   showCancel
      //   title= {hrtitle}
      //   onCancel={() => hideAlert()}
      //   onConfirm= {() => successDelete()}
      //   cancelBtnBsStyle="danger"
      // />
     
    );
  };
  const addNewEventAlert = (slotInfo) => {
    console.log(new Date());
    console.log(slotInfo);
    if(new Date(slotInfo.start).getDate() >= new Date().getDate())
    {
      setAlert(
        <SweetAlert
          input
          showCancel
          title="Input something"
          onConfirm={(e) => addNewEvent(e, slotInfo)}
          onCancel={() => hideAlert()}
          confirmBtnBsStyle="info"
          cancelBtnBsStyle="danger"
        />
      );
    }
    
  };
  const addNewEvent = (e, slotInfo) => {
    var newEvents = events;
    newEvents.push({
      title: e,
      start: slotInfo.start,
      end: slotInfo.end
    });
    setAlert(null);
    setEvents(newEvents);
  };
  const hideAlert = () => {
    setAlert(null);
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
              <CardBody>
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
    </>
  );
};
export default Timesheet;