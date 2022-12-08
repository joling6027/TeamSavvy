import React, { Component } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import loginbg from '../../assets/img/card-bg.png';
import forgetpass from '../forgetPassword/ForgetPasswordOtp';
import './login.css';
import { LoginValidation } from '../utilities/validation';
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

  const {http, setToken, setDropdownCont, setSkillLst} = AuthService();
  const [employeeId, setEmployeeId] = useState();
  const [password, setPassword] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    setFormErrors(LoginValidation({employeeId: parseInt(employeeId), password: password}));
    setIsSubmit(true);
  };

  if(Object.keys(formErrors).length === 0 && isSubmit) 
  {
    http.post(GetEndPoints().login, {employeeId: parseInt(employeeId), password: password})
        .then((res) =>{
           if(res.data.success){
             setToken(res.data.response, res.data.response.token);
           }
        })
        .then(
          http.get(GetEndPoints().dropdownCont)
          .then((res) =>{
             if(res.data.success){
              setDropdownCont(res.data.response);
             }
          })
          .catch((err) => console.log(err.message))
        )
        .then(
          http.get(GetEndPoints().dropdownSkills)
          .then((res) =>{
             if(res.data.success){
              setSkillLst(res.data.response);
             }
          })
          .catch((err) => console.log(err.message))
        )
        .catch((err) => console.log(err.message));
  }

    return (
      <>
          <div className="loginBody d-inline-block position-absolute h-100 w-100">
            <Card className= "loginCard" style={{}}>
            <img src={loginbg} className="mb-2 cardImg" alt="login back ground" />
            <CardBody className="border-none ">
              <h2 className="card-title mt-5 pb-3"><strong>Login</strong></h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-3 mt-2">
                <Label htmlFor="employeeId" className="form-label mt-2">Employee Id</Label>
                  <Input type="text" className="form-control" id="employeeId" name='employeeId'
                  onChange={e => setEmployeeId(e.target.value)}/>
                   <span className='text-danger'>{formErrors.employeeId}</span>
                </FormGroup>
                <FormGroup className="mb-5">
                <Label htmlFor="password" className="form-label mt-2">Password</Label>
                  <Input type="password" className="form-control " id="password" name='password'
                  onChange={e => setPassword(e.target.value)}/>
                  <span className='text-danger'>{formErrors.password}</span>
                <Link to={'/forgetPassword/' + employeeId} className="alert-link mb-5 font-weight-light float-end text-secondary" >
                  <small>Forgot Password?</small></Link>
                </FormGroup>
                <div className="w-100 text-center d-inline-block">
                <button className="appBtn"><span>LETS GO</span></button>
                </div>
              </Form>
            </CardBody>
          </Card>
          </div>
      </>
    );
  }
 
export default Login;