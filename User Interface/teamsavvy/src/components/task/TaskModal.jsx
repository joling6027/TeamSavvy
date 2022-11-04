import React, { Component, useState, useEffect } from 'react';
import '../../assets/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Container, Row, Col } from 'reactstrap';

const TaskModal = (props) => {

  console.log(props.onOpen().taskName)
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [enteredHours, setEnteredHours] = useState('');
  const [enteredStatus, setEnteredStatus] = useState('');
  const [enteredStartDate, setEnteredStartDate] = useState('');
  const [enteredEndDate, setEnteredEndDate] = useState('');

  const [validate, setValidate] = useState(true);

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value)
    // setValidate(false);
  }

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value)
  }

  const HoursChangeHandler = (event) => {
    setEnteredHours(event.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(e.target)
    const taskData = {
      title: enteredTitle,
      description: enteredDescription,
      hour: enteredHours,
      status: enteredStatus,
      StartDate: new Date(enteredStartDate),
      EndDate: new Date(enteredEndDate)
    }

    props.onSaveTaskData(taskData);

    setEnteredTitle('');
    setEnteredDescription('');
    setEnteredHours('');
    setEnteredStatus('');
    setEnteredStartDate('');
    setEnteredEndDate('');
    setValidate(true)

  }


  return (
    <div>
      <Modal
        className='task-modal'
        size='lg'
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
                  <Input type='text' name='task-title' id='task-title' onChange={titleChangeHandler} defaultValue={props.onOpen().taskName} invalid={validate} />
                  <FormFeedback>Title cannot be blank</FormFeedback>
                </Row>
                <Row>
                  <Label for='task-desc'>Description</Label>
                  <Input type='text' name='task-desc' id='task-desc' onChange={descriptionChangeHandler} defaultValue={props.onOpen().taskDesc} invalid={validate} />
                  <FormFeedback valid>Sweet! Description can be blank</FormFeedback>
                </Row>
                <Row>
                  <Col>
                    <Label for='task-hour'>Hours</Label>
                    <Input type='number' name='task-hour' id='task-hour' onChange={HoursChangeHandler} defaultValue={props.onOpen().taskTotalHours} min={0} invalid={validate} />
                    <FormFeedback>Task hours cannot be blank</FormFeedback>
                    {/* <FormText>Please remember to set reasonable hours to the task</FormText> */}
                  </Col>
                  <Col>
                    <Label for='task-status'>Status</Label>
                    <Input type='select' name='task-status' id='task-status'>
                      <option>Assigned</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </Input>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label for="task-start-date">Start Date</Label>
                    <Input type='date' name='task-start-date' id='task-start-date' invalid={validate} />
                    <FormFeedback>The start date cannnot be blank</FormFeedback>
                  </Col>
                  <Col>
                    <Label for="task-end-date">End Date</Label>
                    <Input type='date' name='task-end-date' id='task-end-date' invalid={validate} />
                    <FormFeedback>The start date cannnot be blank</FormFeedback>
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