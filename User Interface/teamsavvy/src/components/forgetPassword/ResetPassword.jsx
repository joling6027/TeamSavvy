import React, { Component } from 'react';
import classnames from 'classnames';
import loginbg from '../../assets/img/card-bg.png'
import {

    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    FormGroup,
    Label,
    Col
  } from "reactstrap";

const ResetPassword = () => {
  return (  <>
    <div className="loginBody d-inline-block position-absolute h-100 w-100">
      <Card className= "card " style={{}}>
      <img src={loginbg} className="mb-2 cardImg" alt=""  />
      <CardBody className="border-none">
        <h2 className="card-title mt-5 pb-3"><strong>Reset Password</strong></h2>
        <Form>
          <FormGroup className="mb-3 mt-2">
            <Label for="newpassword" className="form-label mt-2">New Password</Label>
            <Input type="password" className="form-control" id="newpassword" />
          </FormGroup>
          <FormGroup className="mb-5">
            <Label for="confirmpassword" className="form-label mt-2">Confirm Password</Label>
            <Input type="password" className="form-control " id="confirmpassword"/>
          </FormGroup>
          <div className="w-100 text-center d-inline-block">
          <a href="#" className="alert-link" target="_blank">CONTINUE</a>
          </div>
        </Form>
      </CardBody>
    </Card>
    </div>
</> 
);
}

export default ResetPassword ;

