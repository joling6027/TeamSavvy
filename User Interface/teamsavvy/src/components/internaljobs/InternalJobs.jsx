import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './internaljobs.css'
import '../../assets/css/bootstrap.min.css'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
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
    // const [selectOptions, setSelectOptions] = useState(new Set());
    const [skills, setSkills] = useState([]);
    // const [skills, setSkills] = useState(new Set());
    const skillsData = getSkillsLst();
    const [appliedEmp, setAppliedEmp] = useState([]);

    //modal for skills
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    //modal for apply
    const [show, setShow] = useState(false);
    const toggleApplyJob = () => {
        setShow(!show)
    }
    //modal for delete job
    const [delJobModal, setDelJobModal] = useState(false);
    const toggleDelJob = () => {
        setDelJobModal(!delJobModal);
    }

    const getAppliedEmp = (jobId) => {
        http.get(GetEndPoints().appliedEmp + "/" + jobId)
        .then((res) => {
            console.log(res.data.response);
            setAppliedEmp(res.data.response);
        }).catch((err) => {
            if(err.response.status === 404){
                console.log("404 ---")
                setAppliedEmp([]);
            }
        })
    }

    //submit job apply
    const submitJobApply = (e) => {
        e.preventDefault();

        let isApplied = false;

        if(appliedEmp.length !== 0){
            for (let i = 0; i < appliedEmp.length; i++) {
                if (appliedEmp && appliedEmp[i].employeeId === user.employeeId) {
                    isApplied = true;
                }
            }
            if(!isApplied){
                const jobSubmitData = {
                    employeeId: user.employeeId,
                    jobId: jobItem.jobId,
                    appliedOn: today
                }

                http.post(GetEndPoints().internalJob + "/applyjob", { ...jobSubmitData })
                    .then((res) => {
                        if (res.data.success) {
                            setAlert(
                                <SweetAlert
                                    success
                                    style={{ display: "block", marginTop: "-100px" }}
                                    title="Submitted!"
                                    onConfirm={() => hideAlert()}
                                    onCancel={() => hideAlert()}
                                    confirmBtnBsStyle="success"
                                    btnSize=""
                                >
                                    Your application has been submitted!!</SweetAlert>
                            )
                        }
                    }).catch((err) => console.log(err.message))

            }else{
                setAlert(
                    <SweetAlert
                        danger
                        style={{ display: "block", marginTop: "-100px" }}
                        title="You have already applied!"
                        onConfirm={() => hideAlert()}
                        onCancel={() => hideAlert()}
                        confirmBtnBsStyle="success"
                        btnSize=""
                    >
                        Please wait for further information.</SweetAlert>
                )
                setShow(!show);
                return;
            }

        }else{
            const jobSubmitData = {
                employeeId: user.employeeId,
                jobId: jobItem.jobId,
                appliedOn: today
            }

            http.post(GetEndPoints().internalJob + "/applyjob", { ...jobSubmitData })
                .then((res) => {
                    if (res.data.success) {
                        setAlert(
                            <SweetAlert
                                success
                                style={{ display: "block", marginTop: "-100px" }}
                                title="Submitted!"
                                onConfirm={() => hideAlert()}
                                onCancel={() => hideAlert()}
                                confirmBtnBsStyle="success"
                                btnSize=""
                            >
                                Your application has been submitted!!</SweetAlert>
                        )
                    }
                }).catch((err) => console.log(err.message))
            
        }
        setShow(!show)
    }

    const hideAlert = () => {
        setAlert(null);
    };

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

    const getJobs = () => {
        http.get(GetEndPoints().internalJob)
            .then((res) => {
                if (res.data.success) {
                    setjobs(res.data.response)

                    const firstJob = res.data.response[0]
                    setJobItem(firstJob)
                }
            })
            .catch((err) => console.log(err.message))
    }

    useEffect(() => {
        getJobs();
    }, [])

    // handle skills
    const handleSkillChange = event => {
        let target = event.target
        let value = Array.from(target.selectedOptions, option => option.value);
        setSelectOptions(value);
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
        let skObjs = [];
        skObjs = selectOptions.map((id, index) => {
            
            let skRes = skillsData.find((s) => s.skillId === parseInt(id));
            return {
                skillid: skRes.skillId,
                isactive: true,
                skills: {
                    skillId: skRes.skillId,
                    skillName: skRes.skillName,
                },
            }
        })

        let skArr = [ ...skills, ...skObjs];
        setSkills(skArr);
        // formValue.skills = [...skArr]
        // setFormValue(formValue)
        setSelectOptions([]);

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
        if (e.target.value !== '' && DateEnteredDeadline < DateToday) {
            setJobDeadlineValidate(true)
        } else {
            setJobDeadlineValidate(false)
            setJobDeadline(e.target.value);

        }
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if (jobName === undefined || jobName === null){
            setJobNameValidate(true);
            return;
        }
        if (jobDetail === undefined || jobDetail === null){
            setJobDetailValidate(true);
            return;
        }
        if (jobResponsibility === undefined){
            setJobResponsibilityValidate(true);
            return;
        }
        if (jobPay === undefined){
            setJobPayValidate(true);
            return;
        }
        if (jobDeadline === undefined){
            setJobDeadlineValidate(true);
            return;
        }

        if (jobNameValidate || jobDetailValidate || jobResponsibilityValidate || jobDeadlineValidate || jobPayValidate) {
            return;
        }else{
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

            http.post(GetEndPoints().internalJob + "/addJob", { ...newJob })
                .then((res) => {
                    if (res.data.success) {
                        // setIsCreateJob(false);
                        setAlert(
                            <SweetAlert
                                success
                                style={{ display: "block", marginTop: "-100px" }}
                                title="Job Created!"
                                onConfirm={() => { hideAlert(); getJobs(); setIsCreateJob(true); setValidate(); setJobName(); setJobDetail(); setJobResponsibility(); setJobPay(); setJobDeadline(); setSelectOptions([]) }}
                                onCancel={() => hideAlert()}
                                confirmBtnBsStyle="success"
                                btnSize=""
                            >
                            </SweetAlert>
                        )
                    }
                }).catch((err) => console.log(err.message));

            e.target.reset();
            
        }

    }

    const deleteJobAlert = (jobId) => {
        setAlert(
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                style={{ display: "block", marginTop: "-100px" }}
                onConfirm={() => deleteJob(jobId)}
                onCancel={() => hideAlert()}
                btnSize=""
            >
            </SweetAlert>

        )
    }

    const deleteJob = (jobId) => {
        http.delete(GetEndPoints().deleteJob + "/" + jobId)
        .then((res) => {
            if(res.data.success){
                console.log("delete successfully.")

                hideAlert()
                getJobs();
            }

        }).catch((err) => console.log(err.message))
        
    }



    if (jobItem === undefined) {
        return (<div className="d-flex justify-content-center">
            <div className="spinner-grow text-success" style={{width: "3rem", height: "3rem"}} role="status">
                <span className="sr-only">No Applicant applied for this position yet.</span>
            </div>
        </div>);
    } else {

        return (
            <>
                {alert}
                <div className="content px-3" >
                    <div className="d-md-flex d-sm-block">
                            
                                <Col sm="12" md="4" className="me-md-2 me-sm-0 mb-4">
                                    <Card className='jobs-card' body>
                                        <CardTitle className='job-card-title'>Jobs
                                            {(user.role === 'HR' || user.role === 'Admin' ? 
                                            (<Button className='createAndApply-btn' color="link" onClick={() => { setIsCreateJob(true); setValidate(); setJobName(); setJobDetail(); setJobResponsibility(); setJobPay(); setJobDeadline(); setSelectOptions([]); setSkills([])}}>
                                                <AddCircleIcon /> Create Job
                                            </Button>) : "")}
                                        </CardTitle>
                                        {jobs && jobs.map((job) => (
                                            <Card className='job-card' key={Math.random()} id={job.jobId}>
                                                <CardSubtitle className='job-subtitle'>{job.jobPosition}</CardSubtitle>
                                                <CardText>{(job.details).substring(1, 100) + "..."}</CardText>
                                                {(user.role === 'HR' || user.role === 'Admin' ? (
                                                    /* <Button className='btn-view-job-detail' color="link"
                                                    onClick={() => { setJobItem(job) }}>VIEW</Button> */
                                                    <>
                                                    < Button className='btn-view-job-detail' color="link"
                                                        onClick={() => { setJobItem(job); setIsCreateJob(false) }}>VIEW</Button>
                                                    <Button className='btn-view-job-detail' color="text-danger" style={{color: 'red'}}
                                                        onClick={() => deleteJobAlert(job.jobId)}>DEL</Button>
 
                                                    </>
                                                )
                                                    :
                                                    (
                                                        <>
                                                        <Button className='btn-view-job-detail' color="link"
                                                            onClick={() => { setJobItem(job); setIsCreateJob(false) }}>VIEW</Button>
                                                        
                                                        </>
                                                    ))}
                                                <hr />
                                            </Card>))}
                                    </Card>
                                </Col>
                                <Col sm="12" md="8">
                                    <Card className='card-job-detail' body>
                                        {isCreateJob ? (

                                            <>
                                                <Form onSubmit={submitHandler}>
                                                    <FormGroup>
                                                        <Container>
                                                            <CardTitle className='job-card-title'>Job Details</CardTitle>
                                                            <div>
                                                            <Label for='newJob_name' className="mt-4">Position Name</Label>
                                                            <Input type='text' name='newJob_name' id='newJob_name' onChange={nameChangeHandler} invalid={jobNameValidate} />
                                                            <FormFeedback invalid>Position name cannot be blank</FormFeedback>
                                                            </div>
                                                            
                                                            <div>
                                                            <Label for='newJob_detail' className="mt-4" >Details</Label>
                                                            <Input type='text' name='newJob_detail' id='newJob_detail' onChange={detailChangeHandler} invalid={jobDetailValidate} />
                                                            <FormFeedback invalid>Detail cannot be blank</FormFeedback>
                                                            </div>

                                                            <div>
                                                            <Label for='newJob_responsibility' className="mt-4">Responsibilities</Label>
                                                            <Input type='text' name='newJob_responsibility' id='newJob_responsibility' onChange={responsibilityChangeHandler} invalid={jobResponsibilityValidate} />
                                                            <FormFeedback>Responsibilities cannot be blank</FormFeedback>
                                                            <CardSubtitle className='job-subtitle'>Skill Required</CardSubtitle>
                                                            </div>
                                                            {skills && skills.map((skill, index) => skill.isactive && <div class="skill position-relative" key={index}>
                                                                <Badge className="skillPill rounded-pill me-3 mb-3 " pill > {skill.skills.skillName} </Badge>
                                                                <Badge className="bg-secondary p-1 rounded-circle position-absolute close-badge" onClick={() => handleDelete(skill.skills.skillId)}> <CloseOutlinedIcon sx={{ fontSize: 13 }} /> </Badge>
                                                            </div>)}
                                                            <div className="d-flex flex-wrap ">
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
                                                                                        skillsData && skillsData.map(({ skillId, skillName }, index) => <option key={index} value={skillId}>{skillName}</option>)
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
                                                            <Link to="" className="alert-link text-decoration-none text-center" onClick={toggle}> <AddCircleIcon /> ADD</Link>
                                                            <Row>
                                                                <Col>
                                                                    <Label for='task-title' className="mt-4">Pay per month</Label>
                                                                    <Input type='number' name='task-title' id='task-title' onChange={payChangeHandler} invalid={jobPayValidate} />
                                                                    <FormFeedback>Pay cannot be blank or less than 1</FormFeedback>
                                                                </Col>
                                                                <Col>
                                                                    <Label for='task-title'className="mt-4" >Deadline</Label>
                                                                    <Input type='date' name='task-end-date' id='task-end-date' onChange={deadlineChangeHandler} invalid={jobDeadlineValidate} />
                                                                    <FormFeedback>Deadline cannot be blank or before today</FormFeedback>
                                                                </Col>

                                                            </Row>
                                                            <Col>
                                                                <Button type='submit' onClick={() => submitHandler} style={{ color: '#367FFF', backgroundColor: 'white', border: 'none', textTransform: 'uppercase', float: 'right' }}>Create Job</Button>{''}
                                                                <Button type='reset' style={{ color: '#FD8787', backgroundColor: 'white', border: 'none', textTransform: 'uppercase', float: 'right' }} onClick={() => setIsCreateJob(false)}>Cancel</Button>
                                                            </Col>
                                                        </Container>
                                                    </FormGroup>
                                                </Form>
                                            </>
                                        ) :
                                            (<>
                                                <CardTitle className='job-card-title'>
                                                    {(user.role === 'HR' || user.role === 'Admin' ? 
                                                        (<><Link className='createAndApply-btn pt-2 lh-1 m-0' color="link" to={`/jobs/applied/${jobItem.jobId}`} state={{ jobId:jobItem.jobId }}>Applied</Link>
                                                            <Link to="#" className='createAndApply-btn pt-2 px-3 m-0  lh-1'  color="link" onClick={() => { toggleApplyJob(); getAppliedEmp(jobItem.jobId) }}>Apply Now</Link></>) : (<Link to="#" className='createAndApply-btn py-0' color="link" onClick={() => { toggleApplyJob(); getAppliedEmp(jobItem.jobId) }}>Apply Now</Link>))}
                                                    {jobItem.jobPosition}
                                                    <Modal isOpen={show} toggle={toggleApplyJob} backdrop="static" centered>
                                                        <ModalBody>
                                                            <h4>Are you sure you want to apply for this position?</h4>
                                                            <div className="d-flex justify-content-center mt-5">
                                                                <Button className="me-3" color="secondary" onClick={() => setShow(false)} >
                                                                    Cancel
                                                                </Button>
                                                                <Button color="primary" onClick={submitJobApply}>
                                                                    Confirm
                                                                </Button>
                                                            </div>
                                                        </ModalBody>
                                                    </Modal>
                                                </CardTitle>
                                                
                                                <CardText>{(jobItem.details).charAt(0).toUpperCase() + (jobItem.details).slice(1)}</CardText>
                                                <CardSubtitle className='job-subtitle'>Responsibility</CardSubtitle>
                                                <br />
                                                <List>
                                                    {/* {jobItem.responsibilities} */}
                                                    {(jobItem.responsibilities).trim().split(". ").map((line) => {
                                                        return <li key={Math.random()}>{line}</li>
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
                                                </div>

                                                <CardSubtitle className='job-subtitle job-detail-payAndDealine'><span>Pay: {formatter.format(jobItem.salary)}</span>
                                                    <span>Deadline: {jobItem.deadline}</span></CardSubtitle>
                                            </>
                                            )}




                                    </Card>
                                </Col>
                            
                        
                    </div>
                </div>
            </>
        );
    }
}

export default InternalJobs;