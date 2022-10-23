import React from 'react';
import { Link } from 'react-router-dom';
import loginbg from '../../assets/img/card-bg.png'
import {
    Card,
    CardBody,
    Form,
    Input,
    FormGroup,
    Label,
  } from "reactstrap";

const ResetPassword = () => {
  return (  <>
    <div className="loginBody d-inline-block position-absolute h-100 w-100">
    <Card className= "loginCard ">
      <img src={loginbg} className="mb-2 cardImg" alt="reset password background image."  />
      <CardBody className="border-none">
        <h2 className="card-title mt-5 pb-3"><strong>Reset Password</strong></h2>
        <Form>
          <FormGroup className="mb-3 mt-2">
          <Label htmlFor="newpassword" className="form-label mt-2">New Password</Label>
            <Input type="password" className="form-control" id="newpassword" name='newpassword' />
          </FormGroup>
          <FormGroup className="mb-5">
          <Label htmlFor="confirmpassword" className="form-label mt-2">Confirm Password</Label>
            <Input type="password" className="form-control " id="confirmpassword" name='confirmpassword'/>
          </FormGroup>
          <div className="w-100 text-center d-inline-block">
          <Link to="/" className="alert-link">CONTINUE</Link>
          </div>
        </Form>
      </CardBody>
    </Card>
    </div>
</> 
);
}

export default ResetPassword ;

