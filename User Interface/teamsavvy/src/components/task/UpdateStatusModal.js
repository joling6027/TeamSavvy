import React, { Component, useState, useEffect } from 'react';
import '../../assets/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Container, Row, Col } from 'reactstrap';



const UpdateStatusModal = (props) => {

  const [status, setStatus] = useState();

  const statusChangeHandler = (e) => {
    let st = e.target.value.split(" ").join("");
    setStatus(st);

  }

  const submitHandler = (e) => {
    e.preventDefault();
    props.onSaveTaskData(status);
    props.close(false);
  }

  return (
    <>
      <Modal
        className='task-modal'
        size='lg'
        centered={true}
        show={props.show}
        onHide={props.close}
        backdrop={true}
        contentClassName='status-modal-style'
        aria-labelledby='contained-modal-title-vcenter'
      >
        <Modal.Header>
          <Modal.Title id='contained-modal-title-vcenter'>Update Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={submitHandler}
          >
            <FormGroup>
              <Container className='status-modal-container'>
                <Label for='task-status'>Status</Label>
                <Input type='select' name='task-status' id='task-status' defaultValue="In Progress" onChange={statusChangeHandler}>
                  <option>Assigned</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </Input>
              </Container>
            </FormGroup>
            <Modal.Footer className='status-modal-footer'>
              <Button onClick={props.close} className="border-0 bg-danger">Cancel</Button>
              <Button type='submit' className="border-0">Apply Changes</Button>{''}
            </Modal.Footer>
          </Form>
        </Modal.Body>

      </Modal>




    </>

  )
}

export default UpdateStatusModal;