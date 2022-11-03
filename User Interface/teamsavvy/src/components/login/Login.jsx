import React, { Component } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import loginbg from '../../assets/img/card-bg.png';
import forgetpass from '../forgetPassword/ForgetPasswordOtp';
import './login.css';
import {

    Button,
    Card,
    CardBody,
    Form,
    Input,
    FormGroup,
    Label,
  } from "reactstrap";
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';

const Login = () => {
  const {http, setToken, setDropdown} = AuthService();
  const [employeeId, setEmployeeId] = useState();
  const [password, setPassword] = useState();

  
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    http.post(GetEndPoints().login, {employeeId: parseInt(employeeId), password: password})
        .then((res) =>{
           if(res.data.success){
             setToken(res.data.response, res.data.response.token);
           }
        })
        .then(
          http.get(GetEndPoints().dropdown)
          .then((res) =>{
             if(res.data.success){
              setDropdown(res.data.response);
             }
          })
        );
  };

    return (
      <>
          <div className="loginBody d-inline-block position-absolute h-100 w-100">
            <Card className= "loginCard" style={{}}>
            <img src={loginbg} className="mb-2 cardImg" alt="login back ground" />
            <CardBody className="border-none">
              <h2 className="card-title mt-5 pb-3"><strong>Login</strong></h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3 mt-2">
                <Label htmlFor="employeeId" className="form-label mt-2">Employee Id</Label>
                  <Input type="text" className="form-control" id="employeeId" name='employeeId'
                  onChange={e => setEmployeeId(e.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-5">
                <Label htmlFor="password" className="form-label mt-2">Password</Label>
                  <Input type="password" className="form-control " id="password" name='password'
                  onChange={e => setPassword(e.target.value)}/>
                  <Link href={forgetpass} className="alert-link mb-5 font-weight-light float-end text-secondary" to="/forgetPassword"><small>Forgot Password?</small></Link>
                </FormGroup>
                <div className="w-100 text-center d-inline-block">
                <Button>LETS GO</Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          </div>
      </>
    );
  }
 
export default Login;