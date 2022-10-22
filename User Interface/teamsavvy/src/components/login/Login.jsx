import React, { Component } from 'react';
import classnames from 'classnames';
import loginbg from '../../assets/img/card-bg.png';
import forgetpass from '../forgetPassword/ForgetPasswordOtp';
import './login.css';
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


class Login extends Component {
  // state = { 
  //   count : this.state.name 
  // } 
  render() { 
    //  console.log(this.state.count);
    return (
      <>
          <div className="loginBody d-inline-block position-absolute h-100 w-100">
            <Card className= "card" style={{}}>
            <img src={loginbg} className="mb-2 cardImg" alt=""  />
            <CardBody className="border-none">
              <h2 className="card-title mt-5 pb-3"><strong>Login</strong></h2>
              <Form>
                <FormGroup className="mb-3 mt-2">
                  <Label for="exampleInputEmail1" className="form-label mt-2">Employee Id</Label>
                  <Input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </FormGroup>
                <FormGroup className="mb-5">
                  <Label for="exampleInputPassword1" className="form-label mt-2">Password</Label>
                  <Input type="password" className="form-control " id="exampleInputPassword1"/>
                  <a href={forgetpass} className="alert-link mb-5 font-weight-light float-end text-secondary" target="_blank"><small>Forgot Password?</small></a>
                </FormGroup>
                <div className="w-100 text-center d-inline-block">
                <a href="#" className="alert-link" target="_blank">LETS GO</a>
                </div>
              </Form>
            </CardBody>
          </Card>
          </div>
      </>
    );
  }
}
 
export default Login;
// const Login = () => {
//     const [state, setState] = React.useState({});
//     React.useEffect(() => {
//     document.body.classList.toggle("login-page");
//     return function cleanup() {
//       document.body.classList.toggle("login-page");
//     };
//   });
//     return ( 
       
//       );
// }

// export default Login;