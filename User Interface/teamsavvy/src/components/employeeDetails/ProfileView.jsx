import React, { Component, useState, useEffect } from 'react';
import pic from "../../assets/img/Profilepic.png";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import {Link, useParams} from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './profileView.css';
import { Button,Card,CardBody, FormGroup,Form,Input,Row, Col, Container, CardTitle, CardSubtitle, ListGroup,
    ListGroupItem,  Label, Badge, Modal, ModalHeader, ModalBody, } from "reactstrap";
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';
import { employeeInitialValue } from '../models/employee.model';
import ConvertToBase64 from '../utilities/uploadImage';
import SweetAlert from "react-bootstrap-sweetalert";

const ProfileView = () => {

    const params = useParams();
    const {http, user, getDropdownCont, getSkillsLst} = AuthService();
    const dropdownData = getDropdownCont();
    const [formValue, setFormValue] = useState(employeeInitialValue);
    const GetEmployee = () => {
        http.get(GetEndPoints().employee + '/' + params.id)
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
         .catch((err) => console.log(err.message));
    }

    
    useEffect(()=>{
        GetEmployee();
    },[user.employeeId]);

    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedProvince, setSelectedProvince] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [availableProvinces, setAvailableProvinces] = useState();
    const [availableCities, setAvailableCities] = useState();
    
    const [skills, setSkills] = useState(formValue.skills);

    const handleChange = event => {
        const {name, value} = event.target;
        setFormValue({...formValue, [name]: value});
        console.log(formValue)
    };

    if(formValue.employeeId === 0)
    {
            return (<div class="d-flex justify-content-center">
                <div class="spinner-grow text-success" style={{width: "3rem", height: "3rem"}} role="status">
                <span class="sr-only">Loading.....</span>
                </div>
            </div>);
    }
    else
    {
        return (
            <>
            <Container className="d-flex flex-wrap position-relative">
              {alert}
              <div className="col-md-3 col-sm-12 profileleft">
      
                  {/* profile card */}
                  <Card style={{}} className="text-center prCard">
                      <CardBody className="profile-card" >
                              <img alt="..."className="avatar mt-5 rounded-circle" style={{width:100}} src={`${formValue.employeeImage ? formValue.employeeImage : pic}`} />
                          <CardTitle tag="h5"> {formValue.employeeFirstname + " " + formValue.employeeLastname} </CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6"><small> <strong>ID: </strong>  E-{formValue.employeeId}</small>
                      <p className="mb-0"><small>{formValue.role?.roleType}, {formValue.department?.departmentName}, {formValue.jobLocation?.location}</small></p>
                      <small className="lh-1 me-2"><strong>Ext: </strong> {formValue.extension}</small>
                      </CardSubtitle>
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
                          disabled
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
                          disabled
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
                      disabled
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
                          disabled
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
                      disabled
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
                      disabled
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
                      disabled
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
                      name="cityId"
                      type="select"
                      value={selectedCity}
                      disabled
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
                          id="postCode"
                          name="postcode"
                          value={formValue.address.postcode}
                          // onChange={handleAddress}
                          disabled
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
                          {
                              skills.map((skill, index) => 
                                 skill.isactive && <div class="skill position-relative" key={index}>
                                  <Badge className="skillPill rounded-pill me-3 mb-3 " pill > {skill.skills.skillName} </Badge> 
                                  {/* <Badge className="bg-secondary p-1 rounded-circle position-absolute close-badge" onClick={()=>handleDelete(skill.skills.skillId)}> <CloseOutlinedIcon sx={{fontSize: 13 }} /> </Badge> */}
                                  </div>
                              )
                          }
                      </div>
                     
                      </CardBody>
                  </Card>
              </div>
          </Container>
            </>
          );
    }
   
  };
  
  
  export default ProfileView;