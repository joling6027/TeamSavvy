import React, { Component, useState, useEffect } from 'react';
import pic from "../../assets/img/Profilepic.png";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import {Link} from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './profile.css';
import { Button,Card,CardBody, FormGroup,Form,Input,Row, Col, Container, CardTitle, CardSubtitle, ListGroup,
    ListGroupItem,  Label, Badge, Modal, ModalHeader, ModalBody, FormFeedback} from "reactstrap";
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';
import { employeeInitialValue } from '../models/employee.model';
import ConvertToBase64 from '../utilities/uploadImage';
import SweetAlert from "react-bootstrap-sweetalert";
import { ProfileValidation } from '../utilities/validation';

const Profile = () => {
    const resignationStr = `This will initiate your resignation process from ${new Date().toDateString()} and notify your manager.`+ 
                           `(if required) You need to serve 15 days notice period.`
    const {http, user, getDropdownCont, getSkillsLst} = AuthService();
    const dropdownData = getDropdownCont();
    const skillsData = getSkillsLst();
    const [formValue, setFormValue] = useState(employeeInitialValue);
     //validation
     const [formErrors, setFormErrors] = useState({});
     const [isSubmit, setIsSubmit] = useState(false);

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
         .catch((err) => console.log(err.message));
    }

    const GetTeamMembers = () =>{
        http.get(GetEndPoints().teams + '/' + user.employeeId)
        .then((res) =>{
            if(res.data.success){
               setTeamMembers(res.data.response)
            }
         })
         .catch((err) => console.log(err.message));
    };

    useEffect(()=>{
        GetEmployee();
        GetTeamMembers();
    },[user.employeeId]);

    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedProvince, setSelectedProvince] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [availableProvinces, setAvailableProvinces] = useState();
    const [availableCities, setAvailableCities] = useState();

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    const [profileModal, setproModal] = useState(false);
    const protoggle = () => setproModal(!profileModal);
    
    const [resignmodal, setresignModal] = useState(false);
    const resigntoggle = () => setresignModal(!resignmodal);
    
    const [skills, setSkills] = useState(formValue.skills);
    const [selectOptions, setSelectOptions] = useState([]);

    const [teamMembers, setTeamMembers] = useState([])
    const [alert, setAlert] = useState(null);

    const handleCountryChange = e =>{
        setSelectedCountry(e.target.value);
        let {provinces} = dropdownData.find((c) => c.countryId ===  parseInt(e.target.value));
        let [{cities:availCities}] = provinces;
        setAvailableProvinces(provinces);
        setAvailableCities(availCities);
        let countr = dropdownData.find(( c) => c.countryId === parseInt(e.target.value));
        setFormValue((formValue) =>{
            let newValues = {...formValue}
            newValues.address.city.province.country.countryId = countr.countryId;
            newValues.address.city.province.country.countryName = countr.countryName;
            newValues.address.city.province.provinceId = provinces[0].provinceId;
            newValues.address.city.province.provinceName = provinces[0].provinceName;
            newValues.address.city.province.provinceAbbr = provinces[0].provinceAbbr;
            newValues.address.city.cityId = availCities[0].cityId;
            newValues.address.city.cityName = availCities[0].cityName;
            return newValues
        })
    }

    const handleProvinceChange = e =>{
        setSelectedProvince(e.target.value);
        let {cities:availCities} = availableProvinces?.find((c) => c.provinceId ===  parseInt(e.target.value));
        setAvailableCities(availCities);
        let provin = availableProvinces.find(( c) => c.provinceId === parseInt(e.target.value));
        setFormValue((formValue) =>{
            let newValues = {...formValue}
            newValues.address.city.province.provinceId = provin.provinceId;
            newValues.address.city.province.provinceName = provin.provinceName;
            newValues.address.city.province.provinceAbbr = provin.provinceAbbr;
            newValues.address.city.cityId = availCities[0].cityId;
            newValues.address.city.cityName = availCities[0].cityName;
            return newValues
        })
    }
    
    const handleCityChange = e => {
        const {name, value} = e.target;
        setSelectedCity(value);
        let city = availableCities.find(( c) => c.cityId === parseInt(value));
        setFormValue((formValue) =>{
            let newValues = {...formValue}
            newValues.address.city.cityId = city.cityId;
            newValues.address.city.cityName = city.cityName;
            return newValues
        })
    }

    const handleChange = event => {
        const {name, value} = event.target;
        setFormValue({...formValue, [name]: value});
        setFormErrors(ProfileValidation({...formValue, [name]: value}))
    };

    const handleSkillChange = event =>{
        let target = event.target
        let value = Array.from(target.selectedOptions, option => option.value);
        setSelectOptions(value); 
    };

    const resignCancel = () =>{ resigntoggle();}
    const resignSubmit = () =>{
         resigntoggle();
         ResignationInitiation();
    }

    const skillCancel = () =>{ setSelectOptions([]); toggle();}
    const skillSubmit = () =>{
        toggle();
        let skObjs = [];
        skObjs = selectOptions.map((id, index) =>{
           let skRes = skillsData.find((s) => s.skillId === parseInt(id));
            return {
                employeeSkillId:0,
                employeeId:user.employeeId,
                skillId:skRes.skillId,
                isactive: true, 
                skills: {
                    skillId:skRes.skillId,
                    skillName:skRes.skillName,
                },
            }
        })
        
       let skArr = [...skills, ...skObjs];
       setSkills(skArr);
       formValue.skills = [...skArr]
       setFormValue(formValue)
       setSelectOptions([]); 
    }

    const handleDelete = (skillId) => {
        let newSkills = skills.map((s) => {
            if(s.skills.skillId == parseInt(skillId))
            {
                s.isactive = false;
            }
            return s;
        })
        formValue.skills = [...newSkills]
        setFormValue(formValue)
        setSkills(newSkills);

       
    }

    const handleImage = async (e) =>{
        const file = e.target.files[0];
        const base64 = await ConvertToBase64(file);
        setFormValue({...formValue, employeeImage: base64});
        protoggle();
    }

    const handleAddress = event =>{
        const {name, value} = event.target;
        setFormValue((formValue) =>{
            let newValues = {...formValue}
            newValues.address[name] = value
            return newValues
        })
        setFormErrors(ProfileValidation(formValue))
    };

    const UpdateEmployee = () =>{
        http.put(GetEndPoints().updateEmployee, {...formValue})
        .then((res) => {
            if(res.data.success){
                setAlert(
                    <SweetAlert
                        success
                        style={{ display: "block", marginTop: "-100px" }}
                        title="Updated!"
                        onConfirm={() => hideAlert()}
                        onCancel={() => hideAlert()}
                        confirmBtnBsStyle="success"
                        btnSize=""
                    >
                     Data has been updated!!</SweetAlert>
                )
            }
        })
        .catch((err) => console.log(err.message));
    }

    const ResignationInitiation = () =>{
        http.post(GetEndPoints().resignation, {
            employeeId: formValue.employeeId,
            body: resignationStr
          })
        .then((res) => {
            if(res.data.success){
                setAlert(
                    <SweetAlert
                        success
                        style={{ display: "block", marginTop: "-100px" }}
                        title="Initiated!"
                        onConfirm={() => hideAlert()}
                        onCancel={() => hideAlert()}
                        confirmBtnBsStyle="danger"
                        btnSize=""
                    >
                     Sad to here this. Please contact to your manager and HR.</SweetAlert>
                )
            }
        })
        .then(
            http.delete(GetEndPoints().deleteEmployee + '/' + formValue.employeeId)
            .then((res) => {
                if(res.data.success)
                {
                }
            })
            .catch((err) => console.log(err.message))
        ).catch((err) => console.log(err.message));
    }

    const hideAlert = () => {
        setAlert(null);
      };

    const handleSubmit = event =>{
       event.preventDefault();
       setFormErrors(ProfileValidation(formValue))
       setIsSubmit(true);
       submitForm();
    };

    //validation
    const submitForm = () => {
        if(Object.keys(formErrors).length === 0 && isSubmit) 
        {
            UpdateEmployee();
        }
    }

    const handleCancel = event =>{
        event.preventDefault();
        GetEmployee();
    };

    if(formValue.employeeId <= 0)
    {
        return (<div className="d-flex justify-content-center">
            <div className="spinner-grow text-success" style={{width: "3rem", height: "3rem"}} role="status">
            <span className="sr-only">Loading.....</span>
            </div>
        </div>);
    }
    else{
        return (
            <>
            <Container className="d-flex flex-wrap position-relative">
              {alert}
              <div className="col-md-3 col-sm-12 profileleft">
      
                  {/* profile card */}
                  <Card style={{}} className="text-center prCard">
                      <CardBody className="profile-card" >
                          <Link to="#" onClick={protoggle}>
                              <img alt="..."className="avatar mt-5 rounded-circle" style={{width:100}} src={`${formValue.employeeImage ? formValue.employeeImage : pic}`} />
                          </Link>
      
                          <CardTitle tag="h5"> {formValue.employeeFirstname + " " + formValue.employeeLastname} </CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6"><small> <strong>ID: </strong>  E-{formValue.employeeId}</small>
                      {/* <p>Position, dept, location</p> */}
                      <p className="mb-0"><small>{formValue.role?.roleType}, {formValue.department?.departmentName}, {formValue.jobLocation?.location}</small></p>
                      <small className="lh-1 me-2"><strong>Ext: </strong> {formValue.extension}</small>
                      </CardSubtitle>
                      </CardBody>
                  </Card>
      
      
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
                                  name="employeeImage"
                                  type="file"
                                  accept="image/png, image/gif, image/jpeg"
                                  onChange={handleImage}
                                  >
                                  </Input>
                              </FormGroup>
                          </Form>
                          <div className="d-flex justify-content-center mt-5">
                          <Button className="me-3" color="primary" onClick={handleImage}>
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
                      <CardTitle tag="h6"> Team Members</CardTitle>
                      <ListGroup flush className="teamMem">
                          {
                              teamMembers.map((teamMember, index) => 
                              <ListGroupItem className="px-0 justify-content-between" key={index}> 
                              <p className="p-0 m-0"><strong>{teamMember.name}</strong>  
                              <p className="float-end">{teamMember.position}</p></p>
                              <a href={`mailto:${teamMember.email}`} className="mail text-decoration-none p-0 d-inline-block position-relative">
                              <MailOutlineOutlinedIcon fontSize='small'/>
                              <span className="d-none showmail position-absolute top-0 p-1 fsmall bg-light start-0">{teamMember.email}</span></a>
                              <a href={`tel:${teamMember.extension}`} className="mail text-decoration-none p-0 d-inline-block position-relative ms-2 "><LocalPhoneOutlinedIcon fontSize='small'/>
                              <span className="d-none showmail position-absolute top-0 p-1 fsmall bg-light start-0">{teamMember.extension}</span></a>
                              </ListGroupItem>
                              )
                          }
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
                          invalid = {formErrors.employeeFirstname? true : false}
                          valid = {formValue.employeeFirstname? true : false}
                          />
                          <FormFeedback>{formErrors.employeeFirstname}</FormFeedback>
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
                          invalid = {formErrors.employeeLastname? true : false}
                          valid = {formValue.employeeLastname? true : false}
                          />
                          <FormFeedback>{formErrors.employeeLastname}</FormFeedback>
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
                      invalid = {formErrors.dateofbirth? true : false}
                      valid = {formValue.dateofbirth? true : false}
                      />
                      <FormFeedback>{formErrors.dateofbirth}</FormFeedback>
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
                          invalid = {formErrors.phone? true : false}
                          valid = {formValue.phone? true : false}
                          />
                          <FormFeedback>{formErrors.phone}</FormFeedback>
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
                      onChange={handleAddress}
                      invalid = {formErrors.apartment? true : false}
                      valid = {formValue.address.apartment? true : false}
                      />
                      <FormFeedback>{formErrors.apartment}</FormFeedback>
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
                      name="cityId"
                      type="select"
                      value={selectedCity}
                      onChange={handleCityChange}
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
                          onChange={handleAddress}
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
                                  <Badge className="bg-secondary p-1 rounded-circle position-absolute close-badge" onClick={()=>handleDelete(skill.skills.skillId)}> <CloseOutlinedIcon sx={{fontSize: 13 }} /> </Badge>
                                  </div>
                              )
                          }
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
                                  name="selectOptions"
                                  type="select"
                                  value={selectOptions}
                                  onChange={handleSkillChange}
                                  multiple={true}
                                  >
                                  {
                                      skillsData.map(({skillId, skillName}, index) => <option key={index} value={skillId}>{skillName}</option>)
                                  }
                                  </Input>
                              </FormGroup>
                          </Form>
                          <div className="d-flex justify-content-center mt-5">
                          <Button className="me-3" color="primary" onClick={skillSubmit}>
                              Submit
                          </Button>{' '}
                          <Button color="secondary" onClick={skillCancel}>
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
                      <Button onClick={resigntoggle} className="btn-primary bg-primary float-end">Resign</Button>
                      </CardBody>
                  </Card>
                  
                  {/* resign popup  */}
                  <Modal isOpen={resignmodal} toggle={resigntoggle} backdrop="static" centered>
                          <ModalHeader>  <h4>Resignation </h4> </ModalHeader>
                          <ModalBody>
                              <p>{resignationStr}</p>
                          <div className="d-flex justify-content-center mt-5">
                          <Button className="me-3" color="primary" onClick={resignSubmit}>
                              Submit
                          </Button>{' '}
                          <Button color="secondary" onClick={resignCancel}>
                              Cancel
                          </Button>
                          </div>
                          </ModalBody>
                          
                      </Modal>
                 
                  <div className="ms-md-2 mt-4 d-inline-block text-center p-md-3 p-sm-0 ms-sm-0">
                      <Button className="d-inline-block bg-primary btn-primary" onClick={handleSubmit}> Submit Changes</Button>
                      <Button className="d-inline-block bg-danger btn-primary ms-2" onClick={handleCancel}> Reset</Button>
                  
                  </div>
              </div>
          </Container>
            </>
          );
    }
  
  };
  
  
  export default Profile;