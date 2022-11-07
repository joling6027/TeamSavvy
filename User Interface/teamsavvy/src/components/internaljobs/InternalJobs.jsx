import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './internaljobs.css'
import '../../assets/css/bootstrap.min.css'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {
    Container, Row, Col, Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Button, ListGroup, ListGroupItem, List, Badge
} from 'reactstrap';
import { useEffect } from 'react';
import AuthService from '../services/authService';
import { useState } from 'react';
import { GetEndPoints } from '../utilities/EndPoints';

const InternalJobs = () => {

    const { http, user } = AuthService();
    const [jobs, setjobs] = useState();
    const [jobItem, setJobItem] = useState();

    console.log(user);
    useEffect(() => {
        http.get(GetEndPoints().internalJob)
        .then((res) => {
            if(res.data.success){
                console.log(res.data.response)
                setjobs(res.data.response)
                setJobItem(res.data.response[0])
                console.log(jobItem)
            }
        })
        .catch((err) => console.log(err.message))


    }, [])

    return (
        <>
            <div className="content">
                <Container>
                    <Row>
                        <Row>
                            <Col sm="4">
                                <Card className='jobs-card' body>
                                    <CardTitle className='job-card-title'>Jobs
                                        {(user.role === 'HR' ? (<Button className='createAndApply-btn' color="link"><AddOutlinedIcon /> Create Job
                                        </Button>): "")}
                                    </CardTitle>
                                    {jobs && jobs.map((job) => (
                                        <Card className='job-card' key={job.jobId}>
                                        <CardSubtitle className='job-subtitle'>{job.jobPosition}</CardSubtitle>
                                        <CardText>{job.details}</CardText>
                                        <Button className='btn-view-job-detail' color="link"
                                        onClick={() => setJobItem(job)}>VIEW</Button>
                                        <hr />
                                    </Card>))}
                                    
                                    <Card className='job-card'>
                                        <CardSubtitle className='job-subtitle'>Assistant Manager Dept-C</CardSubtitle>
                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                        <Button 
                                        className='btn-view-job-detail' color="link"
                                        >VIEW</Button>
                                        <hr />
                                    </Card>

                                </Card>
                            </Col>
                            <Col sm="8">
                                <Card className='card-job-detail' body>
                                    <CardTitle className='job-card-title'>
                                    {}
                                    <Button className='createAndApply-btn' color="link">Apply Now</Button>
                                        <Link to={"/JobAppliedEmployees"}>Applied</Link></CardTitle>

                                    <CardText>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum mollitia necessitatibus ducimus nisi ipsam possimus quas impedit eius accusantium nobis minus perspiciatis, nesciunt rem et vitae. Distinctio commodi maiores possimus.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum mollitia necessitatibus ducimus nisi ipsam possimus quas impedit eius accusantium nobis minus perspiciatis, nesciunt rem et vitae. Distinctio commodi maiores possimus.</CardText>
                                    <CardSubtitle className='job-subtitle'>Responsibility</CardSubtitle>
                                    <br />
                                    <List>
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
                                    <CardSubtitle className='job-subtitle job-detail-payAndDealine'><span>Pay: $3500</span><span>Deadline: 25 Oct, 2022</span></CardSubtitle>
                                </Card>
                            </Col>
                        </Row>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default InternalJobs;