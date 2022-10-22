import React, { Component } from 'react';
import pic from "../../assets/img/Profilepic.png"
import bg from "../../assets/img/bg-profile.png"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import './profile.css'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Container,
    CardTitle,
    CardSubtitle,
    ListGroup,
    ListGroupItem,
    Label,
    Badge,
    Table
  } from "reactstrap";
  
  const Profile = () => {
    return (
      <>
      <Container className="d-flex">
        <div className="col-3">

            {/* profile card */}
            <Card style={{}} className="text-center prCard">
                <CardBody className="profile-card" >
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img alt="..."className="avatar mt-5" src={pic} />
                    </a>
                    <CardTitle tag="h5"> Jenny Doe </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6"> Id: E-134578
                <p>Position, dept, location</p>
                </CardSubtitle>
                <CardText>
                    Intro: Some quick example text to build on the card title and make up the bulk of the card‘s content.
                </CardText>
                </CardBody>
            </Card>

            {/* team members */}
            <Card style={{}} className="mt-4 prCard">
                <CardBody>
                <CardTitle tag="h6"> Team Members</CardTitle>
                <ListGroup flush>
                    <ListGroupItem className="px-0">  <p className="p-0 m-0"> Dan <p className="float-end">Team Lead</p></p>
                    <a href="mailto:dan@teamsavvy.com" className="text-decoration-none p-0 d-inline-block ">Dan@teamsavvy.com</a>
                    </ListGroupItem>
                    <ListGroupItem className="px-0"> <p className="p-0 m-0"> Kartik <p className="float-end">Manager</p></p>
                    <a href="mailto:kartik@teamsavvy.com"  className="text-decoration-none p-0 d-inline-block ">kartik@teamsavvy.com</a>
                    </ListGroupItem>
                    <ListGroupItem className="px-0"> <p className="p-0 m-0"> Peter Danial <p className="float-end">Software Dev</p></p>
                    <a href="mailto:peter@teamsavvy.com"  className="text-decoration-none p-0 d-inline-block">peter@teamsavvy.com</a>
                    </ListGroupItem>
                    <ListGroupItem className="px-0"><p className="p-0 m-0"> Dan <p className="float-end">Designer</p></p>
                    <a href="mailto:dan@teamsavvy.com"  className="text-decoration-none p-0 d-inline-block">dan@teamsavvy.com</a>
                    </ListGroupItem>
                    <ListGroupItem className="px-0"> <p className="p-0 m-0"> Kartik <p className="float-end">Software Dev 2</p></p>
                    <a href="mailto:peter@teamsavvy.com"  className="text-decoration-none p-0 d-inline-block">kartik@teamsavvy.com</a>
                    </ListGroupItem>
                    <ListGroupItem className="px-0"> <p className="p-0 m-0"> Dan <p className="float-end">Tester</p></p>
                    <a href="mailto:dan@teamsavvy.com"  className="text-decoration-none p-0 d-inline-block">dan@teamsavvy.com</a>
                    </ListGroupItem>
                </ListGroup>
                </CardBody>
            </Card>
        </div>
        <div className="col-9">

            {/* personal details */}
            <Card className="ms-4 col-9 prCard">
            <CardBody>
            <CardTitle tag="h5"> Personal Details </CardTitle>
            
            <Form>
            <Row>
                <Col md={6}>
                <FormGroup>
                    <Label className="mt-2 mb-1" for="firstname">
                    First Name
                    </Label>
                    <Input
                    id="firstname"
                    name="firstname"
                    type="text"
                    />
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label className="mt-2  mb-1" for="lastname">
                    Last Name
                    </Label>
                    <Input
                    id="lastname"
                    name="lastname"
                    type="text"
                    />
                </FormGroup>
                </Col>
            </Row>
            <Row>
            <Col md={6}> 
            <FormGroup>
                <Label className="mt-3  mb-1" for="email" >
                Email
                </Label>
                <Input
                id="email"
                name="email"
                placeholder="with a placeholder"
                disabled
                />
            </FormGroup>
            </Col>
            <Col md={6}>
            <FormGroup>
                <Label className="mt-3  mb-1" for="date">
                Hire date
                </Label>
                <Input
                disabled
                id="date"
                name="date"
                placeholder="01/09/2022"
                type="date"
                />
            </FormGroup>       
            </Col>
            </Row>
            <Row>
            <Col md={6}>
            <FormGroup>
                <Label className="mt-3  mb-1" for="dobdate">
                DOB
                </Label>
                <Input
                id="dobdate"
                name="dobdate"
                placeholder="01/09/2022"
                type="date"
                />
                </FormGroup>    
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label className="mt-3  mb-1" for="phone">
                    Phone
                    </Label>
                    <Input
                    id="phone"
                    name="number"
                    placeholder="phone"
                    type="number"
                    />
                </FormGroup>
                </Col>
            </Row>
            <Row>
            <Col md={6}>
            <FormGroup>
                <Label className="mt-3" for="address">
                Apartment
                </Label>
                <Input
                id="address"
                name="address"
                placeholder="1234 Main St"
                />
            </FormGroup>
            </Col>
            <Col md={6}>
            <FormGroup>
                <Label className="mt-3" for="country">
                Country
                </Label>
                <Input
                id="country"
                name="country"
                type="select"
                >
                <option>
                    Canada
                </option>
                <option>
                    India
                </option>
                <option>
                    US
                </option>
                <option>
                    China
                </option>
                <option>
                    England
                </option>
                </Input>
            </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col md={6}>
            <FormGroup>
                <Label className="mt-3  mb-1" for="province">
                Province
                </Label>
                <Input
                id="province"
                name="province"
                type="select"
                >
                <option>
                    British Columbia
                </option>
                <option>
                    Ontario
                </option>
                <option>
                    Nova Scotia
                </option>
                <option>
                    Quebec
                </option>
                </Input>
            </FormGroup>
            </Col>
            <Col md={6}>
            <FormGroup>
                <Label className="mt-3  mb-1" for="city">
                City
                </Label>
                <Input
                id="city"
                name="city"
                type="select"
                >
                <option>
                    Burnaby
                </option>
                <option>
                    Vancouver
                </option>
                <option>
                    New Westminster
                </option>
                <option>
                    Surrey
                </option>
                <option>
                    Richmond
                </option>
                </Input>
            </FormGroup>
            </Col>
            </Row>
            <Row>
            <FormGroup>
                <Label className="mt-3 mb-2" for="description">About   </Label>
                <Input
                id="description"
                name="description"
                placeholder="Add your intro here"
                type="textarea"
                />
            </FormGroup>
            </Row>
            </Form>
            </CardBody>
            </Card>

            
            {/* skill set */}
            <Card style={{}} className="ms-4 mt-4 prCard">
                <CardBody className="" >
                <CardTitle tag="h5" className="mb-3"> Skill Set </CardTitle>
                <div className="d-flex flex-wrap ">
                <Badge className="skillPill rounded-pill me-2 mb-3" pill> C# </Badge>  
                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Java </Badge>   
                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Manual Testing </Badge>  
                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Automation Testing </Badge>
                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Manual Testing </Badge>    
                <Badge className="skillPill rounded-pill me-2 mb-3" pill> C# </Badge>  
                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Java </Badge>   
                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Manual Testing </Badge>  
                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Automation Testing </Badge>
                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Manual Testing </Badge>              
                </div>
                <a href="#" className="alert-link text-decoration-none text-center" target="_blank"><AddOutlinedIcon/> ADD</a>
                </CardBody>
            </Card>
            
            {/* Bank details */}
            <Card className="ms-4 col-9 mt-4 prCard">
            <CardBody>
            <CardTitle tag="h5"> Bank Details </CardTitle>
            <Form>
            <Row>
                <Col md={6}>
                <FormGroup>
                    <Label className="mt-2 mb-1" for="bankname">
                    Bank Name
                    </Label>
                    <Input
                    id="bankname"
                    name="bankname"
                    type="text"
                    disabled
                    />
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label className="mt-2  mb-1" for="accountnum">
                    Account Number
                    </Label>
                    <Input
                    id="accountnum"
                    name="accountnum"
                    type="text"
                    disabled
                    />
                </FormGroup>
                </Col>
            </Row>
            <Row>
            <Col md={6}> 
            <FormGroup>
                <Label className="mt-3  mb-1" for="bankcode" >
                Bank Code
                </Label>
                <Input
                id="bankcode"
                name="bankcode"
                type="text"
                disabled
                />
            </FormGroup>
            </Col>
            </Row>
            </Form>
            </CardBody>
            </Card>

            {/* Compansation */}
            {/* <Card className="ms-4 col-9 mt-4">
                <CardBody>
                    <CardTitle tag="h5" className="mb-3">Compansation</CardTitle>
                    <p className="text-uppercase">Earnings</p>
                    <Table striped>
                        <thead>
                            <tr>
                            <th>
                                Type
                            </th>
                            <th>
                                Hours
                            </th>
                            <th>
                                Rate
                            </th>
                            <th>
                                Amount
                            </th>
                            <th>
                                YTD
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">
                                Reg Hours
                            </th>
                            <td>
                                80
                            </td>
                            <td>
                                23
                            </td>
                            <td>
                                1840
                            </td>
                            <td>
                                3800
                            </td>
                            </tr>
                            <tr>
                            <th scope="row">
                                Sick
                            </th>
                            <td>
                                6.00
                            </td>
                            <td>
                                20
                            </td>
                            <td>
                                180
                            </td>
                            <td>
                                350
                            </td>
                            </tr>
                            <tr>
                            <th scope="row">
                                Vac Pay
                            </th>
                            <td>
                                0.00
                            </td>
                            <td>
                                30.00
                            </td>
                            <td>
                                30.00
                            </td>
                            <td>
                                30.00
                            </td>
                            </tr>
                        </tbody>
                    </Table>

                    <p className="text-uppercase mt-4">Net</p>
                    <Table striped>
                        <thead>
                            <tr>
                            <th>
                                Summary
                            </th>
                            <th>
                                Gross Pay
                            </th>
                            <th>
                                Deductions
                            </th>
                            <th>
                                Net Pay
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">
                                Current
                            </th>
                            <td>
                                3800
                            </td>
                            <td>
                                500
                            </td>
                            <td>
                                3200
                            </td>
                            </tr>
                            <tr>
                            <th scope="row">
                                Year to Date
                            </th>
                            <td>
                                2000
                            </td>
                            <td>
                                3500
                            </td>
                            <td>
                                16500
                            </td>
                            </tr>
                        </tbody>
                        </Table>
                </CardBody>
            </Card> */}


            <Card className="d-flex ms-4 mt-4 moremargin prCard">
                <CardBody className="d-flex justify-content-between">
                <CardTitle tag="h5" className="mb-3"> Resignation </CardTitle>
                <Button className="btn-primary bg-primary float-end">Resign</Button>
                </CardBody>
            </Card>
           
        
        </div>
        <div className="position-fixed bottom-0 end-0 w-100 bg-light text-center p-3">
                <Button className="d-inline-block bg-primary btn-primary"> Submit Changes</Button>
                <Button className="d-inline-block bg-danger btn-primary ms-2"> Cancel</Button>
            
            </div>
    </Container>
             
              
      </>
    );
  };
  
  export default Profile;