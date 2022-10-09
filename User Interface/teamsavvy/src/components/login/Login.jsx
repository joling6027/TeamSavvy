import React, { Component } from 'react';
import classnames from 'classnames';
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
    Col
  } from "reactstrap";


class  Login extends Component {
  // state = { 
  //   count : this.state.name 
  // } 
  render() { 
    //  console.log(this.state.count);
    return (
      <>
            <div className="card m-auto " style={{width: "18rem"}}>
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">Login</h5>
              <form>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                </div>
                <a type="submit" className="btn btn-primary">LETS GO</a>
              </form>
            </div>
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