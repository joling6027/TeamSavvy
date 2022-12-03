import React, { useState, useEffect } from 'react';
import pic from "../../assets/img/Profilepic.png";
import {useParams} from 'react-router-dom';
import './profileView.css';
import { Card,CardBody, FormGroup,Form,Input,Row, Col, Container, CardTitle, CardSubtitle, Label, Badge, Button,Modal, ModalHeader, ModalBody, } from "reactstrap";
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';
import { employeeInitialValue } from '../models/employee.model';
import SweetAlert from "react-bootstrap-sweetalert";
import { employeeProject } from '../models/employeeProject.model';

const ProfileView = () => {

    const params = useParams();
    const {http, user, getDropdownCont} = AuthService();
    const dropdownData = getDropdownCont();
    const [formValue, setFormValue] = useState(employeeInitialValue);
    const [alert, setAlert] = useState(null);
    const [selectProject, setSelectProject] = useState();
    const [projectDesc, setProjectDesc] = useState();
    const [projectManager, setProjectManager] = useState();
    const [projectMember, setProjectMember] = useState();
    const [assignProject, setassignModal] = useState(false);
    const [projectFormValue, setProjectFormValue] = useState(employeeProject);
    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedProvince, setSelectedProvince] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [availableProvinces, setAvailableProvinces] = useState();
    const [availableCities, setAvailableCities] = useState();
    const [skills, setSkills] = useState(formValue.skills);
    const [projects, setProjects] = useState([]);
    const assigntoggle = () => setassignModal(!assignProject);

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

 

    const GetEmployeeProj = () =>{
        http.get(GetEndPoints().projectByEmployeeId+'/'+ params.id)
        .then((res) =>{
            console.log(res.data)
            setProjects(res.data.response)
            if(res.data.response.length > 0)
            {
                setProjectDesc(res.data.response[0].projectDesc);
                setProjectManager(res.data.response[0].projectManagerName);
                setProjectMember(res.data.response[0].projectTotalEmployees);
                let assignEmpProj = {...res.data.response[0]}
                projectFormValue.projectId = assignEmpProj.projectId
                setProjectFormValue(projectFormValue)
            }
        })
        .catch((err) => console.log(err.message));
    }

    const handleProject = e => {
        setSelectProject(e.target.value);
        let proj = projects.find((p) => p.projectId === parseInt(e.target.value));
        setProjectDesc(proj.projectDesc);
        setProjectManager(proj.projectManagerName);
        setProjectMember(proj.projectTotalEmployees);
        setProjectFormValue((projectFormValue) =>{
            let assignEmpProj = {...projectFormValue}
            assignEmpProj.projectId = parseInt(e.target.value);
            assignEmpProj.status = false;
            console.log(assignEmpProj);
            return assignEmpProj
        })
    }



    useEffect(()=>{
        GetEmployee();
        GetEmployeeProj();
    },[params.id]);

  
    // const handleChange = event => {
    //     const {name, value} = event.target;
    //     setFormValue({...formValue, [name]: value});
    // };
    const hideAlert = () => {
        setAlert(null);
      };
    const handleRemoveProject = () =>{
       console.log()
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Are you sure!!"
                onConfirm={() => putOnBench()}
                onCancel={() => hideAlert()}
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="light"
                btnSize=""
                focusCancelBtn
            >
             Employee will be on bench.</SweetAlert>
        )
        
    }

    const putOnBench = () =>{
        http.delete(GetEndPoints().removeEmpFromProj+'/'+params.id + '/'+ projectFormValue.projectId)
        .then((res)=>{
            if(res.data.success)
                {
                    setAlert(
                        <SweetAlert
                            danger
                            style={{ display: "block", marginTop: "-100px" }}
                            title="Employee On Bench"
                            onConfirm={() => {hideAlert(); assigntoggle();GetEmployeeProj();}}
                            confirmBtnBsStyle="danger"
                            btnSize=""
                        >
                         Employee is removed from project.</SweetAlert>
                    )
                }
            
        })
        .catch((err) => console.log(err.message));
    }

    const cancelProj = e =>{
        e.preventDefault();
        setSelectProject();
        assigntoggle();
    }

    if(formValue.employeeId === 0)
    {
            return (<div className="d-flex justify-content-center">
                <div className="spinner-grow text-success" style={{width: "3rem", height: "3rem"}} role="status">
                <span className="sr-only">Loading.....</span>
                </div>
            </div>);
    }
    else
    {
        return (
            <>
            <div className="d-flex flex-wrap position-relative w-100">
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
                  {/* project */}
            <Card style={{}} className="mt-4 mb-md-4 mb-sm-0 prCard ">
                <CardBody>
                <Button className="btn bg-primary w-100" onClick={assigntoggle} disabled={projects.length === 0}>{projects.length === 0 ? 'Employee On Bench':'Remove From Project'}</Button>
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
                                    disabled
                                    value={formValue.employeeFirstname + " " + formValue.employeeLastname}
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
                                    value={selectProject}
                                    onChange={handleProject}
                                    >
                                    {
                                       projects && projects.map((project, index) => <option key={index} value={project.projectId}>{project.projectName}</option>)
                                    }
                                    </Input>
                        </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <h6 className="text-muted">Project Description</h6>
                        <p className="text-muted">{projectDesc}</p>
                        <p className="text-muted">Project Manager <strong>{projectManager}</strong> <span className="ms-2">Team Member <strong> {projectMember}</strong></span></p>
                        </Row>
                    </Form>
                    <div className="d-flex justify-content-center mt-5">
                    <Button className="me-3" color="primary" onClick={handleRemoveProject}>
                        Remove From Project 
                    </Button>{' '}
                    <Button color="secondary" onClick={cancelProj}>
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
                                 skill.isactive && <div className="skill position-relative" key={index}>
                                  <Badge className="skillPill rounded-pill me-3 mb-3 " pill > {skill.skills.skillName} </Badge> 
                                  </div>
                              )
                          }
                      </div>
                      </CardBody>
                  </Card>
          
              </div>
          </div>
            </>
          );
    }
   
  };
  
  
  export default ProfileView;