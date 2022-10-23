import React from 'react';
import { Link } from 'react-router-dom';
import loginbg from '../../assets/img/card-bg.png';
import './forgetPassword.css';

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

  const ForgotPasswordOtp = () => {
    return ( <>
      <div className="loginBody d-inline-block position-absolute h-100 w-100">
      <Card className= "loginCard">
        <img src={loginbg} className="mb-2 cardImg" alt="forget password background image"  />
        <CardBody className="border-none">
          <h2 className="card-title mt-5 pb-3"><strong>Forgot Password</strong></h2>
          <Form>
            <FormGroup className="mb-3 mt-2" >
            <Label htmlFor="exampleInputEmail1" className="form-label mt-2">Enter OTP</Label>
              <div className="d-flex" id="otp">
              <Input className="mr-2 my-2 text-center form-control rounded" type="text" id="first" maxLength="1" />
              <Input className="m-2 text-center form-control rounded" type="text" id="second" maxLength="1" />
              <Input className="m-2 text-center form-control rounded" type="text" id="third" maxLength="1" />
              <Input className="m-2 text-center form-control rounded" type="text" id="fourth" maxLength="1" />
              <Input className="m-2 text-center form-control rounded" type="text" id="fifth" maxLength="1" />
              <Input className="my-2 ml-2 text-center form-control rounded" type="text" id="sixth" maxLength="1" aria-describedby="emailHelp" />
              </div>
              <small id= "otpEmail">OTP sent on your email</small>
            </FormGroup>
            <FormGroup className="mb-5">
              
            </FormGroup>
            <div className="w-100 text-center d-inline-block">
            <Link to="/resetpassword" className="alert-link">CONTINUE</Link>
            </div>
          </Form>
        </CardBody>
      </Card>
      </div>
  </> );
  }
   
  export default ForgotPasswordOtp;
  