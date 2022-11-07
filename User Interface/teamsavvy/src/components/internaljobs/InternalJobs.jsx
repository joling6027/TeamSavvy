import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './internaljobs.css'
import '../../assets/css/bootstrap.min.css'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {
    Container, Row, Col, Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Button, ListGroup, ListGroupItem, List, Badge
} from 'reactstrap';
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { useEffect } from 'react';
import AuthService from '../services/authService';
import { useState } from 'react';
import { GetEndPoints } from '../utilities/EndPoints';

const InternalJobs = () => {

    const { http, user } = AuthService();
    const [jobs, setjobs] = useState();
    const [jobItem, setJobItem] = useState();
    const [isCreateJob, setIsCreateJob] = useState(false);

    console.log(user);
    useEffect(() => {
        http.get(GetEndPoints().internalJob)
        .then((res) => {
            if(res.data.success){
                console.log(res.data.response)
                setjobs(res.data.response)

                const firstJob = res.data.response[0]
                setJobItem(firstJob)
                console.log(firstJob)
            }
        })
        .catch((err) => console.log(err.message))


    }, [])

    if(jobItem === undefined){
        return(
            <>Loading...</>
        )
    }else{

    return (
        <>

            <div className="content">
                <Container>
                    <Row>
                        <Row>
                            <Col sm="4">
                                <Card className='jobs-card' body>
                                    <CardTitle className='job-card-title'>Jobs
                                        {(user.role === 'HR' ? (<Button className='createAndApply-btn' color="link" onClick={() => setIsCreateJob(false)}>
                                        <AddOutlinedIcon /> Create Job
                                        </Button>): "")}
                                    </CardTitle>
                                    {jobs && jobs.map((job) => (
                                        <Card className='job-card' key={job.jobId}>
                                        <CardSubtitle className='job-subtitle'>{job.jobPosition}</CardSubtitle>
                                        <CardText>{job.details}</CardText>
                                        <Button className='btn-view-job-detail' color="link"
                                        onClick={() => {setJobItem(job); setIsCreateJob(true)}}>VIEW</Button>
                                        <hr />
                                    </Card>))}
                                    
                                    {/* <Card className='job-card'>
                                        <CardSubtitle className='job-subtitle'>Assistant Manager Dept-C</CardSubtitle>
                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                        <Button 
                                        className='btn-view-job-detail' color="link"
                                        >VIEW</Button>
                                        <hr />
                                    </Card> */}

                                </Card>
                            </Col>
                            <Col sm="8">
                                <Card className='card-job-detail' body>
                                {isCreateJob=== false? (
                                    <>
                                    <Form>
                                    <FormGroup>
                                        <Container>
                                    <CardTitle className='job-card-title'>Job Details</CardTitle>
                                    <Label for='task-title'>Position Name</Label>
                                    <Input type='text' name='task-title' id='task-title'  />
                                    <Label for='task-title'>Details</Label>
                                    <Input type='text' name='task-title' id='task-title' />
                                    <Label for='task-title'>Responsibilities</Label>
                                    <Input type='text' name='task-title' id='task-title' />
                                    <CardSubtitle className='job-subtitle'>Skill Required</CardSubtitle>
                                    <br />
                                    <div className="d-flex flex-wrap ">
                                        <Badge className="skillPill rounded-pill me-2 mb-3" pill> C# </Badge>
                                        <Badge className="skillPill rounded-pill me-2 mb-3" pill> Java </Badge>
                                        <Badge className="skillPill rounded-pill me-2 mb-3" pill> Manual Testing </Badge>
                                        <Badge className="skillPill rounded-pill me-2 mb-3" pill> Automation Testing </Badge>
                                        <Badge className="skillPill rounded-pill me-2 mb-3" pill> Manual Testing </Badge>
                                        <Button className='createAndApply-btn' color="link">
                                            <AddOutlinedIcon />Add
                                        </Button>
                                    </div>
                                    <Row>
                                        <Col>
                                            <Label for='task-title'>Pay per month</Label>
                                            <Input type='text' name='task-title' id='task-title' />
                                        </Col>
                                        <Col>
                                            <Label for='task-title'>Deadline</Label>
                                            <Input type='date' name='task-end-date' id='task-end-date' />
                                        </Col>
                                        
                                    </Row>
                                    <Col>
                                        <Button type='submit' style={{ color: '#367FFF', backgroundColor: 'white', border: 'none', textTransform: 'uppercase', float: 'right' }}>Create Job</Button>{''}
                                        <Button style={{ color: '#FD8787', backgroundColor: 'white', border: 'none', textTransform: 'uppercase', float:'right' }}>Cancel</Button>
                                    </Col>
                                    </Container>
                                    </FormGroup>
                                    </Form>
                                    </>
                                    ) : 
                                    (<>
                                        <CardTitle className='job-card-title'>
                                            {(user.role === 'HR' ? (<Link className='createAndApply-btn' color="link" to={"/JobAppliedEmployees"}>Applied</Link>) : (<Button className='createAndApply-btn' color="link">Apply Now</Button>))}
                                            {jobItem.jobPosition}
                                        </CardTitle>
                                        <CardText>{jobItem.details}</CardText>
                                    <CardSubtitle className='job-subtitle'>Responsibility</CardSubtitle>
                                    <br />
                                    <List>
                                        {jobItem.responsibilities}
                                        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
                                        <li>Ipsum mollitia necessitatibus ducimus nisi ipsam possimus quas impedit eius accusantium nobis minus perspiciatis</li>
                                        <li>dolor sit amet consectetur adipisicing elit.</li>
                                        <li>nesciunt rem et vitae. Distinctio commodi maiores possimus.</li>
                                        <li>Ipsum mollitia necessitatibus ducimus nisi ipsam possimus quas</li>
                                    </List>
                                    <CardSubtitle className='job-subtitle'>Skill Required</CardSubtitle>
                                    <br />
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
                                    <CardSubtitle className='job-subtitle job-detail-payAndDealine'><span>Pay: ${jobItem.salary}</span><span>Deadline: {jobItem.deadline}</span></CardSubtitle>
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