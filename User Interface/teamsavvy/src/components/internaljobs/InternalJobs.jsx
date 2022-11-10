import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './internaljobs.css'
import '../../assets/css/bootstrap.min.css'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
    Container, Row, Col, Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Button, ListGroup, ListGroupItem, List, Badge
} from 'reactstrap';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Modal, ModalHeader, ModalBody } from 'reactstrap';

import { useEffect } from 'react';
import AuthService from '../services/authService';
import { useState } from 'react';
import { GetEndPoints } from '../utilities/EndPoints';

import SweetAlert from 'react-bootstrap-sweetalert';


const InternalJobs = () => {

    const skillsArr = [
        {
            skillid:0,
            isactive:true,
            skills:{

            }
        }
    ]

    // createOn date data
    const newDate = new Date();
    const d = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const today = `${year}-${month.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;

    const { http, user, getSkillsLst } = AuthService();
    const [jobs, setjobs] = useState();
    const [jobItem, setJobItem] = useState();
    const [isCreateJob, setIsCreateJob] = useState(false);
    const [jobName, setJobName] = useState();
    const [jobDetail, setJobDetail] = useState();
    const [jobResponsibility, setJobResponsibility] = useState();
    const [jobPay, setJobPay] = useState();
    const [jobDeadline, setJobDeadline] = useState();
    const [selectOptions, setSelectOptions] = useState([]);
    const [skills, setSkills] = useState([]);
    const skillsData = getSkillsLst();

    //modal for skills
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    //validation
    const [jobNameValidate, setJobNameValidate] = useState(false);
    const [jobDetailValidate, setJobDetailValidate] = useState(false);
    const [jobResponsibilityValidate, setJobResponsibilityValidate] = useState(false);
    const [jobPayValidate, setJobPayValidate] = useState(false);
    const [jobDeadlineValidate, setJobDeadlineValidate] = useState(false);
    const [alert, setAlert] = useState(null);


    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

    // console.log(user);
    useEffect(() => {
        http.get(GetEndPoints().internalJob)
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data.response)
                    setjobs(res.data.response)

                    const firstJob = res.data.response[0]
                    setJobItem(firstJob)
                    // console.log(firstJob)
                }
            })
            .catch((err) => console.log(err.message))
    }, [user.employeeId])

    // handle skills
    const handleSkillChange = event => {
        let target = event.target
        let value = Array.from(target.selectedOptions, option => option.value);
        setSelectOptions(value);
        console.log(value)
    };

    const handleDelete = (skillId) => {
        let newSkills = skills.map((s) => {
            if (s.skills.skillId === parseInt(skillId)) {
                s.isactive = false;
            }
            return s;
        })
        // formValue.skills = [...newSkills]
        // setFormValue(formValue)
        setSkills(newSkills);
    }

    const skillCancel = () => { setSelectOptions([]); toggle(); }
    const skillSubmit = () => {
        toggle();
        console.log(selectOptions)
        let skObjs = [];
        skObjs = selectOptions.map((id, index) => {
            
            let skRes = skillsData.find((s) => s.skillId === parseInt(id));
            console.log(skRes)
            return {
                skillid: skRes.skillId,
                isactive: true,
                skills: {
                    skillId: skRes.skillId,
                    skillName: skRes.skillName,
                    // skillName: event.target.value,
                },
            }
        })

        let skArr = [ ...skills, ...skObjs];
        console.log(skArr)
        setSkills(skArr);
        // formValue.skills = [...skArr]
        // setFormValue(formValue)
        setSelectOptions([]);
        // console.log(formValue)

    }

    const setValidate = () => {
        setJobNameValidate(false);
        setJobDetailValidate(false);
        setJobResponsibilityValidate(false);
        setJobPayValidate(false);
        setJobDeadlineValidate(false);
    }

    const nameChangeHandler = (e) => {
        if (e.target.value !== '') {
            setJobNameValidate(false);
            setJobName(e.target.value)
        } else {
            setJobNameValidate(true);
            console.log("name is empty")
        }
    }

    const detailChangeHandler = (e) => {
        if (e.target.value !== '') {
            setJobDetailValidate(false);
            setJobDetail(e.target.value)
        } else {
            setJobDetailValidate(true);
        }

    }

    const responsibilityChangeHandler = (e) => {
        if (e.target.value !== '') {
            setJobResponsibilityValidate(false);
            setJobResponsibility(e.target.value)
        } else {
            setJobResponsibilityValidate(true);
        }
    }

    const payChangeHandler = (e) => {
        if (e.target.value > 0) {
            setJobPayValidate(false);
            setJobPay(e.target.value);
        } else {
            setJobPayValidate(true)
        }
    }

    const deadlineChangeHandler = (e) => {

        const DateEnteredDeadline = Date.parse(e.target.value)
        const DateToday = Date.parse(today);
        if (e.target.value !== '' || DateEnteredDeadline < DateToday) {
            setJobDeadlineValidate(false)
            setJobDeadline(e.target.value);
        } else {
            setJobDeadlineValidate(true)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        

        if (jobName === undefined || jobDetail === undefined || jobResponsibility === undefined || jobPay === undefined || jobDeadline === undefined) {
            setJobNameValidate(true);
            setJobDetailValidate(true);
            setJobResponsibilityValidate(true);
            setJobDeadlineValidate(true);
            setJobPayValidate(true);
            return;
        }

        if (jobNameValidate || jobDetailValidate || jobResponsibilityValidate || jobDeadlineValidate || jobPayValidate) {
            return;
        }

        // console.log(today);

        const newJob = {
            jobPosition: jobName,
            salary: jobPay,
            details: jobDetail,
            responsibilities: jobResponsibility,
            createdOn: today,
            deadline: jobDeadline,
            isdelete: false,
            jobSkills: skills
        }

        console.log("new job -");
        console.log(newJob);

        http.post(GetEndPoints().internalJob + "/addJob", { ...newJob })
            .then((res) => {
                if (res.data.success) {
                    console.log("ok");
                }
            }).catch((err) => console.log(err.message));

        // clearCreateJobInput();
        e.target.reset();
       

    }

    const hideAlert = () => {
        setAlert(null);
    };

    if (jobItem === undefined) {
        return (
            <>Loading...</>
        )
    } else {

        return (
            <>

                <div className="content">
                    <Container>
                        <Row>
                            <Row>
                                <Col sm="4">
                                    <Card className='jobs-card' body>
                                        <CardTitle className='job-card-title'>Jobs
                                            {(user.role === 'HR' || user.role === 'Admin' ? (<Button className='createAndApply-btn' color="link" onClick={() => { setIsCreateJob(true); setValidate() }}>
                                                <AddOutlinedIcon /> Create Job
                                            </Button>) : "")}
                                        </CardTitle>
                                        {jobs && jobs.map((job) => (
                                            <Card className='job-card' key={job.jobId}>
                                                <CardSubtitle className='job-subtitle'>{job.jobPosition}</CardSubtitle>
                                                <CardText>{(job.details).substring(1, 100) + "..."}</CardText>
                                                {(user.role === 'HR' || user.role === 'Admin' ? (
                                                    /* <Button className='btn-view-job-detail' color="link"
                                                    onClick={() => { setJobItem(job) }}>VIEW</Button> */

                                                    < Button className='btn-view-job-detail' color="link"
                                                        onClick={() => { setJobItem(job); setIsCreateJob(false) }}>VIEW</Button>
                                                )
                                                    :
                                                    (
                                                        <Button className='btn-view-job-detail' color="link"
                                                            onClick={() => { setJobItem(job); setIsCreateJob(false) }}>VIEW</Button>

                                                    ))}
                                                <hr />
                                            </Card>))}
                                    </Card>
                                </Col>
                                <Col sm="8">
                                    <Card className='card-job-detail' body>
                                        {isCreateJob ? (

                                            <>
                                                <Form onSubmit={submitHandler}>
                                                    {/* {console.log('Here isCreateJob is false')} */}
                                                    <FormGroup>
                                                        <Container>
                                                            <CardTitle className='job-card-title'>Job Details</CardTitle>
                                                            <Label for='newJob_name'>Position Name</Label>
                                                            <Input type='text' name='newJob_name' id='newJob_name' onChange={nameChangeHandler} invalid={jobNameValidate} />
                                                            <FormFeedback>Position name cannot be blank</FormFeedback>
                                                            <Label for='newJob_detail'>Details</Label>
                                                            <Input type='text' name='newJob_detail' id='newJob_detail' onChange={detailChangeHandler} invalid={jobDetailValidate} />
                                                            <FormFeedback>Detail cannot be blank</FormFeedback>
                                                            <Label for='newJob_responsibility'>Responsibilities</Label>
                                                            <Input type='text' name='newJob_responsibility' id='newJob_responsibility' onChange={responsibilityChangeHandler} invalid={jobResponsibilityValidate} />
                                                            <FormFeedback>Responsibilities cannot be blank</FormFeedback>
                                                            <CardSubtitle className='job-subtitle'>Skill Required</CardSubtitle>
                                                            <br />
                                                            {skills && skills.map((skill, index) => skill.isactive && <div class="skill position-relative" key={index}>
                                                                <Badge className="skillPill rounded-pill me-3 mb-3 " pill > {skill.skills.skillName} </Badge>
                                                                <Badge className="bg-secondary p-1 rounded-circle position-absolute close-badge" onClick={() => handleDelete(skill.skills.skillId)}> <CloseOutlinedIcon sx={{ fontSize: 13 }} /> </Badge>
                                                            </div>)}
                                                            <div className="d-flex flex-wrap ">
                                                                {/* <Badge className="skillPill rounded-pill me-2 mb-3" pill> C# </Badge>
                                                                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Java </Badge>
                                                                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Manual Testing </Badge>
                                                                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Automation Testing </Badge>
                                                                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Manual Testing </Badge> */}
                                                                {/* <Button className='createAndApply-btn' color="link">
                                                                    <AddOutlinedIcon />Add
                                                                </Button> */}
                                                                <Modal isOpen={modal} toggle={toggle} backdrop="static" centered>
                                                                    <ModalHeader>  <h4>Add Skills</h4> </ModalHeader>
                                                                    <ModalBody>
                                                                        <Form>
                                                                            <FormGroup>
                                                                                <Label className="mt-3 mb-2" for="skills">
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
                                                                                        skillsData.map(({ skillId, skillName }, index) => <option key={index} value={skillId}>{skillName}</option>)
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
                                                            </div>
                                                            <Link to="" className="alert-link text-decoration-none text-center" onClick={toggle}> <AddOutlinedIcon /> ADD</Link>
                                                            <Row>
                                                                <Col>
                                                                    <Label for='task-title'>Pay per month</Label>
                                                                    <Input type='number' name='task-title' id='task-title' onChange={payChangeHandler} invalid={jobPayValidate} />
                                                                    <FormFeedback>Pay cannot be blank or less than 1</FormFeedback>
                                                                </Col>
                                                                <Col>
                                                                    <Label for='task-title'>Deadline</Label>
                                                                    <Input type='date' name='task-end-date' id='task-end-date' onChange={deadlineChangeHandler} invalid={jobDeadlineValidate} />
                                                                    <FormFeedback>Deadline cannot be blank or before today</FormFeedback>
                                                                </Col>

                                                            </Row>
                                                            <Col>
                                                                <Button type='submit' style={{ color: '#367FFF', backgroundColor: 'white', border: 'none', textTransform: 'uppercase', float: 'right' }}>Create Job</Button>{''}
                                                                <Button type='reset' style={{ color: '#FD8787', backgroundColor: 'white', border: 'none', textTransform: 'uppercase', float: 'right' }}>Cancel</Button>
                                                            </Col>
                                                        </Container>
                                                    </FormGroup>
                                                </Form>
                                            </>
                                        ) :
                                            (<>
                                                <CardTitle className='job-card-title'>
                                                    {(user.role === 'HR' || user.role === 'Admin' ? 
                                                        (<Link className='createAndApply-btn' color="link" to={"/JobAppliedEmployees"} state={{ jobId:jobItem.jobId }}>Applied</Link>) : (<Button className='createAndApply-btn' color="link">Apply Now</Button>))}
                                                    {jobItem.jobPosition}
                                                </CardTitle>
                                                <CardText>{(jobItem.details).charAt(0).toUpperCase() + (jobItem.details).slice(1)}</CardText>
                                                <CardSubtitle className='job-subtitle'>Responsibility</CardSubtitle>
                                                <br />
                                                <List>
                                                    {/* {jobItem.responsibilities} */}
                                                    {(jobItem.responsibilities).trim().split(". ").map((line) => {
                                                        return <li>{line}</li>
                                                    })}
                                                </List>
                                                <CardSubtitle className='job-subtitle'>Skill Required</CardSubtitle>
                                                <br />
                                                <div className="d-flex flex-wrap ">
                                                    {(jobItem.jobSkills.length !== 0 ?
                                                        (jobItem.jobSkills.map((skill) => {
                                                            return <Badge className="skillPill rounded-pill me-2 mb-3" key={skill.skills.skillId} pill>{skill.skills.skillName}</Badge>
                                                        }))
                                                        : (<p>NONE</p>))}
                                                    {/* <Badge className="skillPill rounded-pill me-2 mb-3" pill> C# </Badge>
                                                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Java </Badge>
                                                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Manual Testing </Badge>
                                                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Automation Testing </Badge>
                                                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Manual Testing </Badge>
                                                <Badge className="skillPill rounded-pill me-2 mb-3" pill> C# </Badge>
                                                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Java </Badge>
                                                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Manual Testing </Badge>
                                                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Automation Testing </Badge>
                                                <Badge className="skillPill rounded-pill me-2 mb-3" pill> Manual Testing </Badge> */}
                                                </div>

                                                <CardSubtitle className='job-subtitle job-detail-payAndDealine'><span>Pay: {formatter.format(jobItem.salary)}</span>
                                                    <span>Deadline: {jobItem.deadline}</span></CardSubtitle>
                                            </>
                                            )}




                                    </Card>
                                </Col>
                            </Row>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

export default InternalJobs;