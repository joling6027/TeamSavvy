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
    Button
  } from "reactstrap";
  import { changePasswordInitialValue } from '../models/changepassword.model';
  import { useState } from 'react';
  import { useParams, useNavigate } from 'react-router-dom';
  import SweetAlert from "react-bootstrap-sweetalert";
  import AuthService from '../services/authService';
  import { GetEndPoints } from '../utilities/EndPoints';

const ResetPassword = () => {
  
  const {http} = AuthService();
  const [formValue, setFormValue] = useState(changePasswordInitialValue);
  const [alert, setAlert] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const handleChange = e => {
    const {name, value} = e.target;
    setFormValue({...formValue, [name]:value});
  }

  const hideAlert = () => {
    setAlert(null);
  };

  const onSuccess = () => {
    setAlert(null);
    navigate('/')
  };

  const ChangePassword = () => {
    const empId = parseInt(params.id)
    http.put(GetEndPoints().changePassword, {employeeId: empId, password: formValue.newpassword })
    .then((res) => {
        if(res.data.success){
          setAlert(<SweetAlert
            success
            style={{ display: "block", marginTop: "-100px" }}
            title="PASSWORD CHANGED"
            onConfirm={() => onSuccess()}
            onCancel={() => hideAlert()}
            confirmBtnBsStyle="success"
            btnSize=""
         >Password is changes successfully.</SweetAlert>)
        }
    })
    .catch((err) => console.log(err.message));
  }
  const handleSubmit = e =>{
    e.preventDefault();
    console.log(formValue)
    ChangePassword();
  }
  return (  <>
    <div className="loginBody d-inline-block position-absolute h-100 w-100">
      {alert}
    <Card className= "loginCard ">
      <img src={loginbg} className="mb-2 cardImg" alt="reset password background image."  />
      <CardBody className="border-none">
        <h2 className="card-title mt-5 pb-3"><strong>Reset Password</strong></h2>
        <Form>
          <FormGroup className="mb-3 mt-2">
          <Label htmlFor="newpassword" className="form-label mt-2">New Password</Label>
            <Input type="password" className="form-control" id="newpassword" name='newpassword' 
            value={formValue.newpassword}
            onChange={handleChange}/>
          </FormGroup>
          <FormGroup className="mb-5">
          <Label htmlFor="confirmpassword" className="form-label mt-2">Confirm Password</Label>
            <Input type="password" className="form-control " id="confirmpassword" 
            name='confirmpassword' value={formValue.confirmpassword}
            onChange={handleChange}/>
          </FormGroup>
          <div className="w-100 text-center d-inline-block">
          <Button onClick={handleSubmit} className="btn bg-primary">CONTINUE</Button>
          </div>
        </Form>
      </CardBody>
    </Card>
    </div>
</> 
);
}

export default ResetPassword ;

