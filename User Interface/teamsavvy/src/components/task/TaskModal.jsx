import React, { Component, useState, useEffect } from 'react';
import moment from 'moment/moment';
import '../../assets/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Container, Row, Col } from 'reactstrap';

const TaskModal = (props) => {
  const [enteredTitle, setEnteredTitle] = useState(props.onOpen.taskName);
  const [enteredDescription, setEnteredDescription] = useState(props.onOpen.taskDesc);
  const [enteredHours, setEnteredHours] = useState(props.onOpen.taskTotalHours);
  const [enteredStatus, setEnteredStatus] = useState(props.onOpen.taskStatus);
  const [enteredStartDate, setEnteredStartDate] = useState(props.onOpen.taskStartDate);
  const [enteredEndDate, setEnteredEndDate] = useState(props.onOpen.taskEndDate);
  const [taskId, setTaskId] = useState(props.onOpen.taskId);
  const [projectId, setProjectId] = useState(props.onOpen.projectId);
  const [enteredAssignedBy, setEnteredAssignedBy] = useState(props.onOpen.assignedBy);
  const [enteredAssignedTo, setEnteredAssignedTo] = useState(props.onOpen.assignedTo);
  const [assignedDate, setAssignedDate] = useState(props.onOpen.assignedDate);

  //validation
  const [titleValidate, setTitleValidate] = useState(false);
  const [descValidate, setDescTitleValidate] = useState(false);
  const [hourValidate, setHourValidate] = useState(false)
  const [endDateValidate, setEndDateValidate] = useState(false);

  const titleChangeHandler = (event) => {

    if (event.target.value !== '') {
      setTitleValidate(false);
      setEnteredTitle(event.target.value)
    } else {
      setTitleValidate(true)
    }

  }

  const descriptionChangeHandler = (event) => {
    if (event.target.value !== '') {
      setDescTitleValidate(false);
      setEnteredDescription(event.target.value)
    } else {
      setDescTitleValidate(true);
    }

  }

  const HoursChangeHandler = (event) => {
    if (event.target.value <= 0) {
      setHourValidate(true);
    } else {
      setHourValidate(false);
      setEnteredHours(event.target.value);
    }

  }

  const statusChangeHandler = (e) => {
    let st = e.target.value.split(" ").join("");
    setEnteredStatus(st)
  }

  const startDateChangeHandler = (e) => {
    setEnteredStartDate(e.target.value)
  }

  const endDateChangeHandler = (e) => {
    setEnteredEndDate(e.target.value)
  }


  const submitHandler = (e) => {
    e.preventDefault();

    const dateStartDate = Date.parse(enteredStartDate);
    const dateEndDate = Date.parse(enteredEndDate);

    if (dateEndDate < dateStartDate) {
      setEndDateValidate(true);
      return;
    }

    if (titleValidate || descValidate || endDateValidate) {
      return;
    }

    const taskData = {
      taskId: taskId,
      projectId: projectId,
      taskName: enteredTitle,
      taskDesc: enteredDescription,
      taskStartDate: enteredStartDate,
      taskEndDate: enteredEndDate,
      taskTotalHours: enteredHours,
      assignedBy: enteredAssignedBy,
      assignedTo: enteredAssignedTo,
      assignedDate: assignedDate,
      taskStatus: enteredStatus,
    }


    props.onSaveTaskData(taskData);
    props.close(false);
  }


  return (
    <div>
      <Modal
        className='task-modal'
        centered={true}
        show={props.show}
        onHide={props.close}
        backdrop={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modify Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={submitHandler}
          >
            <FormGroup>
              <Container>
                <Row>
                  <Label for='task-title'>Title</Label>
                  <Input type='text' name='task-title' id='task-title' onChange={titleChangeHandler} defaultValue={props.onOpen.taskName} invalid={titleValidate} />
                  <FormFeedback>Title cannot be blank</FormFeedback>
                </Row>
                <Row>
                  <Label for='task-desc'>Description</Label>
                  <Input type='textarea' name='task-desc' id='task-desc' onChange={descriptionChangeHandler} defaultValue={props.onOpen.taskDesc} invalid={descValidate} />
                  <FormFeedback>Description cannot be blank</FormFeedback>
                </Row>
                <Row>
                  <Col>
                    <Label for='task-hour'>Hours</Label>
                    <Input type='number' name='task-hour' id='task-hour' onChange={HoursChangeHandler} defaultValue={props.onOpen.taskTotalHours} invalid={hourValidate} />
                    <FormFeedback>Task hours cannot be blank or 0</FormFeedback>
                    {/* <FormText>Please remember to set reasonable hours to the task</FormText> */}
                  </Col>
                  <Col>
                    <Label for='task-status'>Status</Label>
                    <Input type='select' name='task-status' id='task-status' onChange={statusChangeHandler}>
                      <option>Assigned</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </Input>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label for="task-start-date">Start Date</Label>
                    <Input type='date' name='task-start-date' id='task-start-date'
                      defaultValue={props.onOpen.taskStartDate} onChange={startDateChangeHandler} />
                    <FormFeedback>The start date cannnot be blank</FormFeedback>
                  </Col>
                  <Col>
                    <Label for="task-end-date">End Date</Label>
                    <Input type='date' name='task-end-date' id='task-end-date'
                      defaultValue={props.onOpen.taskEndDate} onChange={endDateChangeHandler} invalid={endDateValidate} />
                    <FormFeedback>The start date cannnot be blank or earlier than start date</FormFeedback>
                  </Col>
                </Row>
              </Container>
            </FormGroup>
            <Modal.Footer>
              <Button onClick={props.close} style={{ color: '#FD8787', backgroundColor: 'white', border: 'none', textTransform: 'uppercase' }}>Cancel</Button>
              <Button type='submit' style={{ color: '#367FFF', backgroundColor: 'white', border: 'none', textTransform: 'uppercase' }}>Apply Changes</Button>{''}
            </Modal.Footer>
          </Form>
        </Modal.Body>

      </Modal>
    </div>
  )

}
export default TaskModal;