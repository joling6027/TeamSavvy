import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import loginbg from '../../assets/img/card-bg.png';
import './forgetPassword.css';
import { Card, CardBody, Form, Input, FormGroup, Label, Button} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';

  const ForgotPasswordOtp = () => {
    const initialValue = {
      first:"",
      second:"",
      third:"",
      fourth:"",
    }

    const {http} = AuthService();
    const params = useParams()
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [formValue, setFormValue] = useState(initialValue);
    const [alert, setAlert] = useState(null);

    const GetOtp = () =>{
      const empId = parseInt(params.id)
      http.post(GetEndPoints().otp, empId)
      .then((res) => {
          if(res.data.success){
             setOtp(res.data.response.result)
          }
      })
  }

  useEffect(() =>{
    GetOtp();
  }, [])

    const handleChange = e => {
      const {name, value} = e.target;
      setFormValue({...formValue, [name]:value});
    }

    const hideAlert = () => {
      setAlert(null);
    };


    const onContinue = e =>{
      console.log(otp)
      e.preventDefault();
      let num = formValue.first + formValue.second + formValue.third + formValue.fourth;
      console.log(num)
      if(num === "")
      {
        setAlert(<SweetAlert
           success
           style={{ display: "block", marginTop: "-100px" }}
           title="ONE TIME PASSWORD"
           onConfirm={() => hideAlert()}
           onCancel={() => hideAlert()}
           confirmBtnBsStyle="danger"
           btnSize=""
        >Please enter OTP!!</SweetAlert>)
      }
      else
      {
        let num = parseInt(formValue.first + formValue.second + formValue.third + formValue.fourth);
        if(num === parseInt(otp))
        {
          navigate(`/resetpassword/${params.id}`);
          setOtp("");
        }
        else
        {
         setAlert( <SweetAlert
            success
            style={{ display: "block", marginTop: "-100px" }}
            title="ONE TIME PASSWORD"
            onConfirm={() => hideAlert()}
            onCancel={() => hideAlert()}
            confirmBtnBsStyle="danger"
            btnSize="">Please enter valid OTP!!</SweetAlert>)
        }
       
      }
     
    }

    return ( <>
      <div className="loginBody d-inline-block position-absolute h-100 w-100">
        {alert}
      <Card className= "loginCard">
        <img src={loginbg} className="mb-2 cardImg" alt="forget password background image"  />
        <CardBody className="border-none">
          <h2 className="card-title mt-5 pb-3"><strong>Forgot Password</strong></h2>
          <Form>
            <FormGroup className="mb-3 mt-2" >
            <Label htmlFor="exampleInputEmail1" className="form-label mt-2">Enter OTP</Label>
              <div className="d-flex" id="otp">
              <Input className="mr-2 my-2 text-center form-control rounded" type="text" id="first" name='first' maxLength="1" value={formValue.first} onChange={handleChange}/>
              <Input className="m-2 text-center form-control rounded" type="text" id="second" name='second' maxLength="1" value={formValue.second} onChange={handleChange}/>
              <Input className="m-2 text-center form-control rounded" type="text" id="third" name='third' maxLength="1" value={formValue.third} onChange={handleChange}/>
              <Input className="m-2 text-center form-control rounded" type="text" id="fourth"  name='fourth' maxLength="1" value={formValue.fourth} onChange={handleChange}/>
              </div>
              <small id= "otpEmail">OTP sent on your email</small>
            </FormGroup>
            <FormGroup className="mb-5">
              
            </FormGroup>
            <div className="w-100 text-center d-inline-block">
            <Button onClick={onContinue} className="btn bg-primary">CONTINUE</Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      </div>
  </> );
  }
   
  export default ForgotPasswordOtp;
  
