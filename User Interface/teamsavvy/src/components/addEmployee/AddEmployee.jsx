import React, { Component, useState, useEffect } from 'react';
import addnew from "../../assets/img/addbutton.png";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {Link} from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './addEmployee.css';
import { Button,Card,CardBody, FormGroup,Form,Input,Row, Col, Container, CardTitle, CardSubtitle, Label, Badge, Modal, ModalHeader, ModalBody, FormFeedback} from "reactstrap";
import AuthService from '../services/authService';
import { GetEndPoints } from '../utilities/EndPoints';
import { employeeInitialValue } from '../models/employee.model';
import { employeeProject } from '../models/employeeProject.model';
import ConvertToBase64 from '../utilities/uploadImage';
import SweetAlert from "react-bootstrap-sweetalert";
import { formatDate } from '../utilities/convertDate';
import { RegisterationValidation } from '../utilities/validation';

  const AddEmployee = () => {

    const {http, user, getDropdownCont, getSkillsLst} = AuthService();
    const dropdownData = getDropdownCont();
    const skillsData = getSkillsLst();
    const [formValue, setFormValue] = useState(employeeInitialValue);

    //validation
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const [projectFormValue, setProjectFormValue] = useState(employeeProject);
    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedProvince, setSelectedProvince] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [availableProvinces, setAvailableProvinces] = useState();
    const [availableCities, setAvailableCities] = useState();
    const [modal, setModal] = useState(false);
    const [assignProject, setassignModal] = useState(false);
    const [profileModal, setproModal] = useState(false);
    const [skills, setSkills] = useState([]);
    const [selectOptions, setSelectOptions] = useState([]);
    const [alert, setAlert] = useState(null);
    const [compaines, setCompanies] = useState([]);
    const [selectCompany, setSelectCompany] = useState();
    const [roles, setRoles] = useState([]);
    const [selectRole, setSelectRole] = useState();
    const [departments, setDeparments] = useState([]);
    const [selectDepartment, setSelectDeparment] = useState();
    const [projects, setProjects] = useState([]);
    const [selectProject, setSelectProject] = useState();
    const [projectDesc, setProjectDesc] = useState();
    const [projectManager, setProjectManager] = useState();
    const [projectMember, setProjectMember] = useState();
    const [salary, setSalary] = useState("");
    const protoggle = () => setproModal(!profileModal);
    const toggle = () => setModal(!modal);
    const assigntoggle = () => setassignModal(!assignProject);

    const GetCompanies = () => {
        http.get(GetEndPoints().dropdownCompanies)
        .then((res) =>{
           if(res.data.success){
            setCompanies(res.data.response);
            let comp = res.data.response.find(( c) => c.jobLocationId === parseInt(res.data.response[0].jobLocationId));
            setFormValue((formValue) =>{
                let newValues = {...formValue}
                newValues.jobLocation.jobLocationId = comp.jobLocationId;
                newValues.jobLocation.location = comp.location;
                return newValues
            })
            setSelectDeparment(comp.jobLocationId)
           }
        })
        .catch((err) => console.log(err.message));
    }

    const GetRoles = () => {
        http.get(GetEndPoints().dropdownRoles)
        .then((res) =>{
           if(res.data.success){
            setRoles(res.data.response);
            let role = res.data.response.find(( c) => c.roleId === parseInt(res.data.response[0].roleId));
            setFormValue((formValue) =>{
                let newValues = {...formValue}
                newValues.role = {...role};
                return newValues
            })
            setSelectDeparment(role.roleId)
           }
        })
        .catch((err) => console.log(err.message));
    }

    const GetDepartments = () => {
        http.get(GetEndPoints().dropdownDepartments)
        .then((res) =>{
           if(res.data.success){
            setDeparments(res.data.response);
            let dept = res.data.response.find(( c) => c.departmentId === parseInt(res.data.response[0].departmentId));
            setFormValue((formValue) =>{
                let newValues = {...formValue}
                newValues.department = {...dept};
                return newValues
            })
            setSelectDeparment(dept.departmentId)
           }
        })
        .catch((err) => console.log(err.message));
    }

    const GetProjects = () => {
        http.get(GetEndPoints().projects)
        .then((res) =>{
           if(res.data.success){
            setProjects(res.data.response);
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


    useEffect(()=>{
        GetCompanies();
        GetDepartments();
        GetRoles();
        GetProjects();
        initialContProvCitiSelction();
    },[]);

    const initialContProvCitiSelction = () =>{
        let coun = dropdownData[0];
        let {provinces} = coun;
        let {cities} = provinces[0];
        setSelectedCountry(coun);
        setAvailableProvinces(provinces);
        setAvailableCities(cities);
        setFormValue((formValue) =>{
            let newValues = {...formValue}
            newValues.address.city.province.country.countryId = coun.countryId;
            newValues.address.city.province.country.countryName = coun.countryName;
            newValues.address.city.province.provinceId = provinces[0].provinceId;
            newValues.address.city.province.provinceName = provinces[0].provinceName;
            newValues.address.city.province.provinceAbbr = provinces[0].provinceAbbr;
            newValues.address.city.cityId = cities[0].cityId;
            newValues.address.city.cityName = cities[0].cityName;
            return newValues
        })
    }

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

    const handleCompLocation = e =>{
        setSelectCompany(e.target.value);
        let comp = compaines.find(( c) => c.jobLocationId === parseInt(e.target.value));
        setFormValue((formValue) =>{
            let newValues = {...formValue}
            newValues.jobLocation.jobLocationId = comp.jobLocationId;
            newValues.jobLocation.location = comp.location;
            return newValues
        })
    }

    const handleRole = e=>{
        setSelectRole(e.target.value);
        let role = roles.find(( c) => c.roleId === parseInt(e.target.value));
        setFormValue((formValue) =>{
            let newValues = {...formValue}
            newValues.role = {...role};
            return newValues
        })
    }

    const handleDepartment = e=>{
        setSelectDeparment(e.target.value);
        let dept = departments.find(( c) => c.departmentId === parseInt(e.target.value));
        setFormValue((formValue) =>{
            let newValues = {...formValue}
            newValues.department = {...dept};
            return newValues
        })
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
            assignEmpProj.status = true;
            return assignEmpProj
        })
    }

    const handleChange = event => {
        const {name, value} = event.target;
        if(name === "extension")
        {
            setFormValue({...formValue, [name]: parseInt(value)});
        }
        else
        {
            setFormValue({...formValue, [name]: value});
        }
    };

    const handleSkillChange = event =>{
        let target = event.target
        let value = Array.from(target.selectedOptions, option => option.value);
        setSelectOptions(value);
    };


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
       formValue.skills = skArr;
       setFormValue(formValue)
       setSelectOptions([]); 
    }

    const handleDelete = (skillId) => {
        let newSkills = skills.filter((s) => s.skills.skillId !== parseInt(skillId))
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
    };

    const handleSalary = e =>{
        setSalary(e.target.value);
    }

    const hideAlert = () => {
        setAlert(null);
      };


      const AddEmployee = () =>{
        http.post(GetEndPoints().addEmployee, {...formValue})
        .then((res) => {
            if(res.data.success){
                setAlert(
                    <SweetAlert
                        success
                        style={{ display: "block", marginTop: "-100px" }}
                        title="New Employee Created"
                        onConfirm={() => hideAlert()}
                        onCancel={() => hideAlert()}
                        confirmBtnBsStyle="success"
                        btnSize=""
                    >
                     Congratulation Welcome to the Organisation!!</SweetAlert>
                )
                if(projectFormValue.projectId !== 0)
                {
                    AddProject(res.data.response);
                }
                AddSalary(res.data.response);
                return true;
            }
        })
        .catch((err) => console.log(err.message));
    }

    const AddProject = (employeeId) =>{

        http.post(GetEndPoints().addEmployeeOnProject, {...projectFormValue, employeeId})
        .then((res) => {
            if(res.data.success){
            }
        })
        .catch((err) => console.log(err.message));
    }

    const AddSalary = (employeeId) =>{
        http.post(GetEndPoints().addSalary, {
            salaryId: 0,
            employeesalary: salary,
            employeeId: employeeId,
            salaryIncrementDate: formatDate(new Date().toDateString()),
            salaryType: "Monthy"
          })
        .then((res) => {
            if(res.data.success){
            }
        })
        .catch((err) => console.log(err.message));
    }

    const handleSubmit = event =>{
       event.preventDefault();
       
       //validation
       setFormErrors(RegisterationValidation(formValue, salary))
       setIsSubmit(true);
       submitForm();
    };

    //validation
    const submitForm = () => {
        if(Object.keys(formErrors).length === 0 && isSubmit) 
        {
            AddEmployee();
            setFormValue(employeeInitialValue);
        }
    }
   

    const handleCancel = event =>{
        event.preventDefault();
        setFormValue(employeeInitialValue);
    };

    const assignProj = e =>{
        e.preventDefault();
        assigntoggle();
    }

    const cancelProj = e =>{
        e.preventDefault();
        setSelectProject();
        assigntoggle();
    }

    return (
      <>
      <Container className="d-flex flex-wrap position-relative">
        {alert}
        <div className="col-md-3 col-sm-12 profileleft">

            {/* profile card */}
            <Card style={{}} className="text-center prCard">
                <CardBody className="profile-card" >
                    <Link to="#" onClick={protoggle}>
                        <img alt="..."className="avatar mt-5 rounded-circle" style={{width:100}} src={`${formValue.employeeImage ? formValue.employeeImage : addnew}`} />
                    </Link>

                    <CardTitle tag="h5"> {formValue.employeeFirstname + " " + formValue.employeeLastname} </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                <p className="mb-0"><small>{formValue.role?.roleType}, {formValue.department?.departmentName}, {formValue.jobLocation?.location}</small></p>
                <small className="lh-1 me-2"><strong>Ext: </strong> {formValue?.extension}</small>
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

            {/* project */}
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
                    <Button className="me-3" color="primary" onClick={assignProj}>
                        Assign 
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
                placeholder="jake@teamsavvy.com"
                value={formValue.email}
                onChange={handleChange}
                invalid = {formErrors.email? true : false}
                valid = {formValue.email? true : false}
                />
                <FormFeedback>{formErrors.email}</FormFeedback>
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
                invalid = {formErrors.hiredate? true : false}
                valid = {formValue.hiredate? true : false}
                />
                <FormFeedback>{formErrors.hiredate}</FormFeedback>
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
                name="location"
                type="select"
                value={selectedCountry}
                onChange={handleCountryChange}
                >
                {
                   dropdownData && dropdownData.map((country, index) => <option key={index} value={country.countryId}>{country.countryName}</option>)
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
                  availableProvinces && availableProvinces?.map((province, index) => <option key={index} value={province.provinceId}>{province.provinceName}</option>)
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
                onChange={handleCityChange}
                >
                {
                  availableCities && availableCities?.map((city) => <option key={city.cityId} value={city.cityId}>{city.cityName}</option>)
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
                <Col md={6}>
                <FormGroup>
                    <Label className="mt-2 mb-1" for="postalCode">
                    Password
                    </Label>
                    <Input
                    id="password"
                    name="password"
                    value={formValue.password}
                    onChange={handleChange}
                    invalid = {formErrors.password? true : false}
                    valid = {formValue.password? true : false}
                    />
                    <FormFeedback>{formErrors.password}</FormFeedback>
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
                    value={selectDepartment}
                    onChange={handleDepartment}

                    >
                    {
                      departments && departments.map((department, index) => <option key={index} value={department.departmentId}>{department.departmentName}</option>)
                    }
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
                    value={selectRole}
                    onChange={handleRole}
                    >
                     {
                           roles && roles.map((role, index) => <option key={index} value={role.roleId}>{role.roleType}</option>)
                     }
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
                id="extension"
                name="extension"
                type='number'
                placeholder="office contact"
                value={formValue.extension}
                onChange={handleChange}
                invalid = {formErrors.extension? true : false}
                valid = {formValue.extension? true : false}
                />
                <FormFeedback>{formErrors.extension}</FormFeedback>
            </FormGroup>
            </Col>
            <Col md={6}>
            <FormGroup>
                <Label className="mt-3" for="location">
                Location
                </Label>
                <Input
                id="location"
                name="location"
                type="select"
                value={selectCompany}
                onChange={handleCompLocation}
                >
                {
                 compaines &&  compaines.map((comapany, index) => <option key={index} value={comapany.jobLocationId}>{comapany.location}</option>)
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
                              skillsData && skillsData.map(({skillId, skillName}, index) => <option key={index} value={skillId}>{skillName}</option>)
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
                    value={formValue.bankname}
                    onChange={handleChange}
                    invalid = {formErrors.bankname? true : false}
                    valid = {formValue.bankname? true : false}
                    />
                    <FormFeedback>{formErrors.bankname}</FormFeedback>
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
                    invalid = {formErrors.bankaccount? true : false}
                    valid = {formValue.bankaccount? true : false}
                    />
                    <FormFeedback>{formErrors.bankaccount}</FormFeedback>
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
                invalid = {formErrors.bankcode? true : false}
                valid = {formValue.bankcode? true : false}
                />
                <FormFeedback>{formErrors.bankcode}</FormFeedback>
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
                            value={salary}
                            onChange={handleSalary}
                            invalid = {formErrors.salary? true : false}
                            valid = {!formErrors.salary && salary ? true : false}
                            />
                            <FormFeedback>{formErrors.salary}</FormFeedback>
                        </FormGroup>
                        </Col>
                  
                </Form>
                </Row>
                </CardBody>
            </Card>

            <span className="ms-2 mt-3 d-inline-block text-center p-3">
                <Button className="d-inline-block bg-primary btn-primary" onClick={handleSubmit}> Submit Changes</Button>
                <Button className="d-inline-block bg-danger btn-primary ms-2" onClick={handleCancel}> Cancel</Button>
            </span>
        </div>

       
    </Container>
             
              
      </>
    );
  };


  export default AddEmployee;