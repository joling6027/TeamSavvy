import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import loginbg from '../../assets/img/card-bg.png';
import './forgetPassword.css';
import { Card, CardBody, Form, Input, FormGroup, Label, Button} from "reactstrap";

  const ForgotPasswordOtp = () => {
    const initialValue = {
      first:"",
      second:"",
      third:"",
      fourth:"",
    }

    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [formValue, setFormValue] = useState(initialValue);
    const [alert, setAlert] = useState(null);
    const handleChange = e => {
      const {name, value} = e.target;
      setFormValue({...formValue, [name]:value});
      console.log(formValue)
    }

    const onContinue = e =>{
      e.preventDefault();
      if(otp === "")
      {
        window.alert()
      }
      else
      {
        let num = parseInt(formValue.first + formValue.second + formValue.third + formValue.fourth);
        if(num === otp)
        {
          navigate("/resetpassword");
        }
        else
        {

        }
       
      }
     
    }

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
  