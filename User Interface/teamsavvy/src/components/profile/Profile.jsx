import React, { Component, useState } from 'react';
import pic from "../../assets/img/Profilepic.png";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import {Link} from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './profile.css';
import { Button,Card,CardBody, FormGroup,Form,Input,Row, Col, Container, CardTitle, CardSubtitle, ListGroup,
    ListGroupItem,  Label, Badge, Modal, ModalHeader, ModalBody, } from "reactstrap";
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';
import { useEffect } from 'react';
import { employeeInitialValue } from '../models/employee.model';

  const Profile = () => {

    const {http, user, getDropdown} = AuthService();
    const dropdownData = getDropdown();
    const [formValue, setFormValue] = useState(employeeInitialValue);
    const GetEmployee = () => {
        http.get(GetEndPoints().employee + '/' + user.employeeId)
        .then((res) =>{
            if(res.data.success){
                let response = res.data.response;
                setFormValue({...formValue, ...response})
                let countryId = response.address.city.province.country.countryId;
                let provinceId = response.address.city.province.provinceId;
                let cityId = response.address.city.cityId;
                let {provinces} = dropdownData.find((c) => c.countryId ===  parseInt(countryId));
                let {cities} = provinces.find((p) => p.provinceId ===  parseInt(provinceId));
                setAvailableProvinces(provinces);
                setAvailableCities(cities);
                setSelectedCity(cityId);
                setSelectedCountry(countryId);
                setSelectedProvince(provinceId);
                setSkills(response.skills)
            }
         })
    }

    useEffect(()=>{
        GetEmployee()
    },[user.employeeId]);

    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedProvince, setSelectedProvince] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [availableProvinces, setAvailableProvinces] = useState();
    const [availableCities, setAvailableCities] = useState();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [skills, setSkills] = useState(formValue.skills);
    console.log(skills)
    const handleDelete = (event) => {
    // console.log(data);
    }

    const handleCountryChange = e =>{
        setSelectedCountry(e.target.value);
        let {provinces} = dropdownData.find((c) => c.countryId ===  parseInt(e.target.value));
        let [{cities:availCities}] = provinces;
        setAvailableProvinces(provinces);
        setAvailableCities(availCities);
    }

    const handleProvinceChange = e =>{
        setSelectedProvince(e.target.value);
        let {cities:availCities} = availableProvinces?.find((c) => c.provinceId ===  parseInt(e.target.value));
        setAvailableCities(availCities);
    }
    
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
                    <Link to="#" onClick={(e) => e.preventDefault()}>
                        <img alt="..."className="avatar mt-5" src={pic} />
                    </Link>
                    <CardTitle tag="h5"> {formValue.employeeFirstname + " " + formValue.employeeLastname} </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6"><small> <strong>ID: </strong>  E-{formValue.employeeId}</small>
                {/* <p>Position, dept, location</p> */}
                <p className="mb-0"><small>{formValue.role?.roleType}, {formValue.department?.departmentName}, {formValue.jobLocation?.location}</small></p>
                <small className="lh-1 me-2"><strong>Ext: </strong> {formValue.extension}</small>
                </CardSubtitle>
                </CardBody>
            </Card>

            {/* team members */}
            <Card style={{}} className="mt-4 mb-md-4 mb-sm-0 prCard ">
                <CardBody>
                <CardTitle tag="h6"> Team Members</CardTitle>
                <ListGroup flush className="teamMem">
                    <ListGroupItem className="px-0 justify-content-between">  <p className="p-0 m-0"><strong>Dan Kayger</strong>  <p className="float-end">Team Lead</p></p>
                    <Link to="mailto:dan@teamsavvy.com" className="mail text-decoration-none p-0 d-inline-block position-relative"><MailOutlineOutlinedIcon fontSize='small'/>
                    <span className="d-none showmail position-absolute top-0 p-1 fsmall bg-light start-0">Dan@teamsavvy.com</span></Link>
                    <Link to="tel:12345" className="mail text-decoration-none p-0 d-inline-block position-relative ms-2 "><LocalPhoneOutlinedIcon fontSize='small'/>
                    <span className="d-none showmail position-absolute top-0 p-1 fsmall bg-light start-0">12345</span></Link>
                    </ListGroupItem>
                    <ListGroupItem className="px-0"> <p className="p-0 m-0"> <strong>Kartik</strong> <p className="float-end">Manager</p></p>
                    <Link to="mailto:dan@teamsavvy.com" className="mail text-decoration-none p-0 d-inline-block position-relative"><MailOutlineOutlinedIcon fontSize='small'/>
                    <span className="d-none showmail position-absolute top-0 p-1 fsmall bg-light start-0">Dan@teamsavvy.com</span></Link>
                    <Link to="tel:12345" className="mail text-decoration-none p-0 d-inline-block position-relative ms-2 "><LocalPhoneOutlinedIcon fontSize='small'/>
                    <span className="d-none showmail position-absolute top-0 p-1 fsmall bg-light start-0">12345</span></Link>
                    </ListGroupItem>
                    <ListGroupItem className="px-0"> <p className="p-0 m-0"> <strong>Peter Danial</strong> <p className="float-end">Software Dev</p></p>
                    <Link to="mailto:dan@teamsavvy.com" className="mail text-decoration-none p-0 d-inline-block position-relative"><MailOutlineOutlinedIcon fontSize='small'/>
                    <span className="d-none showmail position-absolute top-0 p-1 fsmall bg-light start-0">Dan@teamsavvy.com</span></Link>
                    <Link to="tel:12345" className="mail text-decoration-none p-0 d-inline-block position-relative ms-2 "><LocalPhoneOutlinedIcon fontSize='small'/>
                    <span className="d-none showmail position-absolute top-0 p-1 fsmall bg-light start-0">12345</span></Link>
                    </ListGroupItem>
                    <ListGroupItem className="px-0"><p className="p-0 m-0"> <strong>Dan Kayger</strong>  <p className="float-end">Designer</p></p>
                    <Link to="mailto:dan@teamsavvy.com" className="mail text-decoration-none p-0 d-inline-block position-relative"><MailOutlineOutlinedIcon fontSize='small'/>
                    <span className="d-none showmail position-absolute top-0 p-1 fsmall bg-light start-0">Dan@teamsavvy.com</span></Link>
                    <Link to="tel:12345" className="mail text-decoration-none p-0 d-inline-block position-relative ms-2 "><LocalPhoneOutlinedIcon fontSize='small'/>
                    <span className="d-none showmail position-absolute top-0 p-1 fsmall bg-light start-0">12345</span></Link>
                    </ListGroupItem>
                    <ListGroupItem className="px-0"> <p className="p-0 m-0">  <strong>Kartik</strong> <p className="float-end">Software Dev 2</p></p>
                    <Link to="mailto:dan@teamsavvy.com" className="mail text-decoration-none p-0 d-inline-block position-relative"><MailOutlineOutlinedIcon fontSize='small'/>
                    <span className="d-none showmail position-absolute top-0 p-1 fsmall bg-light start-0">Dan@teamsavvy.com</span></Link>
                    <Link to="tel:12345" className="mail text-decoration-none p-0 d-inline-block position-relative ms-2 "><LocalPhoneOutlinedIcon fontSize='small'/>
                    <span className="d-none showmail position-absolute top-0 p-1 fsmall bg-light start-0">12345</span></Link>                    </ListGroupItem>
                    <ListGroupItem className="px-0"> <p className="p-0 m-0">  <strong>Dan</strong> <p className="float-end">Tester</p></p>
                    <Link to="mailto:dan@teamsavvy.com" className="mail text-decoration-none p-0 d-inline-block position-relative"><MailOutlineOutlinedIcon fontSize='small'/>
                    <span className="d-none showmail position-absolute top-0 p-1 fsmall bg-light start-0">Dan@teamsavvy.com</span></Link>
                    <Link to="tel:12345" className="mail text-decoration-none p-0 d-inline-block position-relative ms-2 "><LocalPhoneOutlinedIcon fontSize='small'/>
                    <span className="d-none showmail position-absolute top-0 p-1 fsmall bg-light start-0">12345</span></Link>
                    </ListGroupItem>
                </ListGroup>
                </CardBody>
            </Card>
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
                placeholder="with a placeholder"
                disabled
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
                disabled
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
                value={selectedCountry}
                onChange={handleCountryChange}
                >
                {
                   dropdownData.map((country, index) => <option key={index} value={country.countryId}>{country.countryName}</option>)
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
                value={selectedProvince}
                onChange={handleProvinceChange}
                >
                {
                   availableProvinces?.map((province, index) => <option key={index} value={province.provinceId}>{province.provinceName}</option>)
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
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                >
                {
                   availableCities?.map((city) => <option key={city.cityId} value={city.cityId}>{city.cityName}</option>)
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

            
            {/* skill set */}
            <Card style={{}} className="ms-md-4 ms-sm-0 mt-4 prCard">
                <CardBody className="" >
                <CardTitle tag="h5" className="mb-3"> Skill Set </CardTitle>
                <div className="d-flex flex-wrap">
                    <div class="skill position-relative" >
                        {

                        }
                <Badge className="skillPill rounded-pill me-3 mb-3 " pill> C# </Badge> 
                <Badge className="bg-secondary p-1 rounded-circle position-absolute close-badge " key={1} onClick={(event) => handleDelete(event.target.value)}> <CloseOutlinedIcon sx={{fontSize: 13 }}/> </Badge>
                    </div>
                    {/* <div className="skill position-relative">
                <Badge className="skillPill rounded-pill me-3 mb-3" pill> Java </Badge>  
                <Badge className="bg-secondary p-1 rounded-circle position-absolute close-badge "> <CloseOutlinedIcon sx={{fontSize: 13 }}/> </Badge>
                    </div> 
                    <div className="skill position-relative">
                <Badge className="skillPill rounded-pill me-3 mb-3" pill> Manual Testing </Badge> 
                <Badge className="bg-secondary p-1 rounded-circle position-absolute close-badge "> <CloseOutlinedIcon sx={{fontSize: 13 }}/> </Badge>
                    </div> 
                    <div className="skill position-relative"> 
                <Badge className="skillPill rounded-pill me-3 mb-3" pill> Automation Testing </Badge>
                <Badge className="bg-secondary p-1 rounded-circle position-absolute close-badge "> <CloseOutlinedIcon sx={{fontSize: 13 }}/> </Badge>
                    </div>
                    <div className="skill position-relative"> 
                     
                <Badge className="skillPill rounded-pill me-3 mb-3" pill> Manual Testing </Badge>    
                     <Badge className="bg-secondary p-1 rounded-circle position-absolute close-badge "> <CloseOutlinedIcon sx={{fontSize: 13 }}/> </Badge>
                    </div>  
                    <div className="skill position-relative"> 
                     
                <Badge className="skillPill rounded-pill me-3 mb-3" pill> C# </Badge>  
                     <Badge className="bg-secondary p-1 rounded-circle position-absolute close-badge "> <CloseOutlinedIcon sx={{fontSize: 13 }}/> </Badge>
                    </div>  
                    <div className="skill position-relative"> 
                <Badge className="skillPill rounded-pill me-3 mb-3" pill> Java </Badge>   
                     
                     <Badge className="bg-secondary p-1 rounded-circle position-absolute close-badge "> <CloseOutlinedIcon sx={{fontSize: 13 }}/> </Badge>
                    </div>  
                    <div className="skill position-relative"> 
                <Badge className="skillPill rounded-pill me-3 mb-3" pill> Manual Testing </Badge>  
                     
                     <Badge className="bg-secondary p-1 rounded-circle position-absolute close-badge "> <CloseOutlinedIcon sx={{fontSize: 13 }}/> </Badge>
                    </div>  
                    <div className="skill position-relative"> 
                <Badge className="skillPill rounded-pill me-3 mb-3" pill> Automation Testing </Badge>
                     
                     <Badge className="bg-secondary p-1 rounded-circle position-absolute close-badge "> <CloseOutlinedIcon sx={{fontSize: 13 }}/> </Badge>
                    </div>  
                    <div className="skill position-relative"> 
                     
                <Badge className="skillPill rounded-pill me-3 mb-3" pill> Manual Testing </Badge>              
                     <Badge className="bg-secondary p-1 rounded-circle position-absolute close-badge "> <CloseOutlinedIcon sx={{fontSize: 13 }}/> </Badge>
                    </div>   */}
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
                    disabled
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
                    disabled
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
                disabled
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
                <CardBody className="d-flex justify-content-between">
                <CardTitle tag="h5" className="mb-3"> Resignation </CardTitle>
                <Button className="btn-primary bg-primary float-end">Resign</Button>
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