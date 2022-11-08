import React, { Component, useState, useEffect } from 'react';
import addnew from "../../assets/img/addbutton.png";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import {Link} from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './addEmployee.css';
import { Button,Card,CardBody, FormGroup,Form,Input,Row, Col, Container, CardTitle, CardSubtitle, ListGroup,
    ListGroupItem,  Label, Badge, Modal, ModalHeader, ModalBody, } from "reactstrap";
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';
import { employeeInitialValue } from '../models/employee.model';

  const Profile = () => {

    //    const {http, user, getDropdown} = AuthService();
    //    const dropdownData = getDropdown();
       const [formValue, setFormValue] = useState(employeeInitialValue);
    // const GetEmployee = () => {
    //     http.get(GetEndPoints().employee + '/' + user.employeeId)
    //     .then((res) =>{
    //         if(res.data.success){
    //             let response = res.data.response;
    //             setFormValue({...formValue, ...response})
    //             let countryId = response.address.city.province.country.countryId;
    //             let provinceId = response.address.city.province.provinceId;
    //             let cityId = response.address.city.cityId;
    //             let {provinces} = dropdownData.find((c) => c.countryId ===  parseInt(countryId));
    //             let {cities} = provinces.find((p) => p.provinceId ===  parseInt(provinceId));
    //             setAvailableProvinces(provinces);
    //             setAvailableCities(cities);
    //             setSelectedCity(cityId);
    //             setSelectedCountry(countryId);
    //             setSelectedProvince(provinceId);
    //             setSkills(response.skills)
    //         }
    //      })
    // }

    // useEffect(()=>{
    //     GetEmployee()
    // },[user.employeeId]);

    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedProvince, setSelectedProvince] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [availableProvinces, setAvailableProvinces] = useState();
    const [availableCities, setAvailableCities] = useState();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    const [profileModal, setproModal] = useState(false);
    const protoggle = () => setproModal(!profileModal);

    const [assignProject, setassignModal] = useState(false);
    const assigntoggle = () => setassignModal(!assignProject);

    const [skills, setSkills] = useState(formValue.skills);
    console.log(skills)
    const handleDelete = (event) => {
    // console.log(data);
    }

    // const handleCountryChange = e =>{
    //     setSelectedCountry(e.target.value);
    //     let {provinces} = dropdownData.find((c) => c.countryId ===  parseInt(e.target.value));
    //     let [{cities:availCities}] = provinces;
    //     setAvailableProvinces(provinces);
    //     setAvailableCities(availCities);
    // }

    // const handleProvinceChange = e =>{
    //     setSelectedProvince(e.target.value);
    //     let {cities:availCities} = availableProvinces?.find((c) => c.provinceId ===  parseInt(e.target.value));
    //     setAvailableCities(availCities);
    // }
    
    const handleChange = event => {
        const {name, value} = event.target;
        setFormValue({...formValue, [name]: value});
    };

    const handSubmit = event =>{
        event.preventDefault();
        // setFormErrors(validate(formValues));
        // setIsSubmit(true);
    };

    return (
      <>
      <Container className="d-flex flex-wrap position-relative">
        <div className="col-md-3 col-sm-12 profileleft">

            {/* profile card */}
            <Card style={{}} className="text-center prCard">
                <CardBody className="profile-card" >
                    <Link to="#" onClick={protoggle}>
                        <img alt="..."className="avatar mt-5" src={addnew} />
                    </Link>
                    <CardTitle tag="h5"> {formValue.employeeFirstname + " " + formValue.employeeLastname} </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6"><small> <strong>ID: </strong>  E-{formValue.employeeId}</small>
                {/* <p>Position, dept, location</p> */}
                <p className="mb-0"><small>{formValue.role?.roleType}, {formValue.department?.departmentName}, {formValue.jobLocation?.location}</small></p>
                <small className="lh-1 me-2"><strong>Ext: </strong> {formValue.extension}</small>
                </CardSubtitle>
                </CardBody>
            </Card>

            {/* set profile modal */}
            <Modal isOpen={profileModal} toggle={protoggle} backdrop="static" centered>
                    <ModalHeader>  <h4>Add Profile Pic</h4> </ModalHeader>
                    <ModalBody>
                        <Form>
                        <FormGroup>
                            <Label className="mt-3 mb-2"  for="profilepic">
                            Select image
                            </Label>
                            <Input
                            id="profilepic"
                            name="profilepic"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            >
                            </Input>
                        </FormGroup>
                    </Form>
                    <div className="d-flex justify-content-center mt-5">
                    <Button className="me-3" color="primary" onClick={protoggle}>
                        Submit
                    </Button>{' '}
                    <Button color="secondary" onClick={protoggle}>
                        Cancel
                    </Button>
                    </div>
                    </ModalBody>
                    
                </Modal>

            {/* team members */}
            <Card style={{}} className="mt-4 mb-md-4 mb-sm-0 prCard ">
                <CardBody>
                <Button className="btn bg-primary w-100" onClick={assigntoggle}>Assign Project</Button>
                </CardBody>
            </Card>

            {/* assign project modal */}
            <Modal isOpen={assignProject} toggle={assigntoggle} backdrop="static" centered>
                    <ModalHeader>  <h4>Assign Project</h4> </ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row>
                                <Col>
                                 <FormGroup>
                                    <Label className="mt-2 mb-1" for="employee">
                                    Employee name
                                    </Label>
                                    <Input
                                    id="empname"
                                    name="empname"
                                    type="text"
                                    valid
                                    />
                                </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                        <Col>
                        <FormGroup>
                        <Label className=""  for="projectname">
                                Project
                                    </Label>
                                    <Input
                                    id="projectname"
                                    name="projectname"
                                    type="select"
                                    >
                                    <option>
                                        Project 1                                        
                                    </option>
                                    <option>
                                        Project 2
                                    </option>
                                    <option>
                                        Project 3
                                    </option>
                                    <option>
                                        Project 4
                                    </option>
                                    <option>
                                        Project 5
                                    </option>
                                    </Input>
                        </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <h6 className="text-muted">Project Description</h6>
                        <p className="text-muted"> Lorem ipsum dolor sit amet. Nam voluptatibus tempore et distinctio natus eum magni quae est accusamus aspernatur.</p>
                        <p className="text-muted">Project Manager <strong>Ben Darek</strong> <span className="ms-2">Team Member <strong> 12</strong></span></p>
                        </Row>
                    </Form>
                    <div className="d-flex justify-content-center mt-5">
                    <Button className="me-3" color="primary" onClick={assigntoggle}>
                        Assign 
                    </Button>{' '}
                    <Button color="secondary" onClick={assigntoggle}>
                        Cancel
                    </Button>
                    </div>
                    </ModalBody>
                    
            </Modal>
        </div>
        <div className="col-md-9 col-sm-12 profileright">
            
            {/* personal details */}
            <Card className="ms-md-4 ms-sm-0 mt-sm-4 mt-md-0 col-9 prCard">
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
                    name="employeeFirstname"
                    type="text"
                    value={formValue.employeeFirstname}
                    onChange={handleChange}
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
                    name="employeeLastname"
                    type="text"
                    value={formValue.employeeLastname}
                    onChange={handleChange}
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
                placeholder="jake@teamsavvy.com"
                value={formValue.email}
                onChange={handleChange}
                />
            </FormGroup>
            </Col>
            <Col md={6}>
            <FormGroup>
                <Label className="mt-3  mb-1" for="date">
                Hire date
                </Label>
                <Input
                id="date"
                name="hiredate"
                placeholder="01/09/2022"
                type="date"
                value={formValue.hiredate}
                onChange={handleChange}
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
                name="dateofbirth"
                placeholder="01/09/2022"
                type="date"
                value={formValue.dateofbirth}
                onChange={handleChange}
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
                    name="phone"
                    placeholder="phone"
                    type="number"
                    value={formValue.phone}
                    onChange={handleChange}
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
                name="apartment"
                placeholder="1234 Main St"
                value={formValue.address.apartment}
                onChange={handleChange}
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
                // value={selectedCountry}
                // onChange={handleCountryChange}
                >
                {
                //    dropdownData.map((country, index) => <option key={index} value={country.countryId}>{country.countryName}</option>)
                }
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
                // value={selectedProvince}
                // onChange={handleProvinceChange}
                >
                {
                //    availableProvinces?.map((province, index) => <option key={index} value={province.provinceId}>{province.provinceName}</option>)
                }
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
                // value={selectedCity}
                // onChange={(e) => setSelectedCity(e.target.value)}
                >
                {
                //    availableCities?.map((city) => <option key={city.cityId} value={city.cityId}>{city.cityName}</option>)
                }
                </Input>
            </FormGroup>
            </Col>
            </Row>
            <Row>
                <Col md={6}>
                <FormGroup>
                    <Label className="mt-2 mb-1" for="postalCode">
                    Postal Code
                    </Label>
                    <Input
                    id="postalCode"
                    name="postcode"
                    value={formValue.address.postcode}
                    onChange={handleChange}
                    />
                </FormGroup>
                </Col>
            </Row>
            </Form>
            </CardBody>
            </Card>
            
            {/* Office Deatils */}
            <Card className="ms-md-4 ms-sm-0 mt-sm-4 col-9 prCard">
            <CardBody>
            <CardTitle tag="h5"> Office Details </CardTitle>
            <Form>
            <Row>
                <Col md={6}>
                <FormGroup>
                    <Label className="mt-2 mb-1" for="department">
                    Department
                    </Label>
                    <Input
                    id="department"
                    name="department"
                    type="select"
                    // value={formValue.employeeFirstname}
                    // onChange={handleChange}
                    >
                     <option>
                         IT
                    </option>
                    <option>
                         Finance
                    </option>
                    <option>
                         Management
                    </option>
                    </Input>
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label className="mt-2 mb-1" for="role">
                    Role
                    </Label>
                    <Input
                    id="role"
                    name="role"
                    type="select"
                    // value={formValue.employeeFirstname}
                    // onChange={handleChange}
                    >
                     <option>
                         Software Engineer
                    </option>
                    <option>
                         Jr Software Engineer
                    </option>
                    <option>
                         Sr Software Engineer
                    </option>
                    <option>
                         Tester
                    </option>
                    <option>
                        Jr Tester
                    </option>
                    <option>
                        Sr Tester
                    </option>
                    <option>
                         Graphic Designer
                    </option>
                    <option>
                        UI designer
                    </option>
                    <option>
                        UI UX designer
                    </option>
                    <option>
                        Team Lead
                    </option>
                    <option>
                        Project Manager
                    </option>
                    </Input>
                </FormGroup>
                </Col>
            </Row>
            <Row>
            <Col md={6}> 
            <FormGroup>
                <Label className="mt-3  mb-1" for="extension" >
                Extension
                </Label>
                <Input
                id="email"
                name="email"
                placeholder="jake@teamsavvy.com"
                value={formValue.email}
                onChange={handleChange}
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
                // value={selectedCountry}
                // onChange={handleCountryChange}
                >
                {
                //    dropdownData.map((country, index) => <option key={index} value={country.countryId}>{country.countryName}</option>)
                }
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
                // value={selectedProvince}
                // onChange={handleProvinceChange}
                >
                {
                //    availableProvinces?.map((province, index) => <option key={index} value={province.provinceId}>{province.provinceName}</option>)
                }
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
                // value={selectedCity}
                // onChange={(e) => setSelectedCity(e.target.value)}
                >
                {
                //    availableCities?.map((city) => <option key={city.cityId} value={city.cityId}>{city.cityName}</option>)
                }
                </Input>
            </FormGroup>
                </Col>
            </Row>
            </Form>
            </CardBody>
            </Card>
            
            {/* skill set */}
            <Card style={{}} className="ms-md-4 ms-sm-0 mt-4 prCard">
                <CardBody className="" >
                <CardTitle tag="h5" className="mb-3"> Skill Set </CardTitle>
                <div className="d-flex flex-wrap">
                    <div class="skill position-relative" >
                        {
                        }
                    </div>
                </div>
                <Link to="" className="alert-link text-decoration-none text-center"  onClick={toggle}> <AddOutlinedIcon/> ADD</Link>
                {/* add skill popup */}
                <Modal isOpen={modal} toggle={toggle} backdrop="static" centered>
                    <ModalHeader>  <h4>Add Skills</h4> </ModalHeader>
                    <ModalBody>
                        <Form>
                        <FormGroup>
                            <Label className="mt-3 mb-2"  for="skills">
                            Select Skills
                            </Label>
                            <Input
                            id="skills"
                            name="skilld"
                            type="select"
                            multiple
                            >
                            <option>
                                JavaScript
                            </option>
                            <option>
                                Work Management
                            </option>
                            <option>
                                UX Design
                            </option>
                            <option>
                                Communication
                            </option>
                            <option>
                                Client Handling
                            </option>
                            </Input>
                        </FormGroup>
                    </Form>
                    <div className="d-flex justify-content-center mt-5">
                    <Button className="me-3" color="primary" onClick={toggle}>
                        Submit
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                    </div>
                    </ModalBody>
                    
                </Modal>
                </CardBody>
            </Card>
            
            {/* Bank details */}
            <Card className="ms-sm-0 ms-md-4 col-9 mt-4 prCard">
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
                    
                    value={formValue.bankname}
                    onChange={handleChange}
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
                    name="bankaccount"
                    type="text"
                    
                    value={formValue.bankaccount}
                    onChange={handleChange}
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
                
                value={formValue.bankcode}
                onChange={handleChange}
                />
            </FormGroup>
            </Col>
            </Row>
            </Form>
            </CardBody>
            </Card>
            <Card className="d-flex ms-md-4 ms-sm-0 mt-4 prCard">
                <CardBody className="">
                <CardTitle tag="h5" className="mb-3"> Pay scale </CardTitle>
                <Row>
                <Form>
                   
                        <Col md={6}>
                        <FormGroup>
                            <Label className="mt-2 mb-1" for="salary">
                            Salary per month
                            </Label>
                            <Input
                            id="salary"
                            name="salary"
                            type="text"
                            />
                        </FormGroup>
                        </Col>
                  
                </Form>
                </Row>
                </CardBody>
            </Card>
           
            <span className="ms-2 mt-3 d-inline-block text-center p-3">
                <Button className="d-inline-block bg-primary btn-primary"> Submit Changes</Button>
                <Button className="d-inline-block bg-danger btn-primary ms-2"> Cancel</Button>
            
            </span>
        </div>
        
       
    </Container>
             
              
      </>
    );
  };
  
  
  export default Profile;