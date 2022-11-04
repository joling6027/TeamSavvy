import React, { Component } from 'react';
import './internaljobs.css'
import '../../assets/css/bootstrap.min.css'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {
    Container, Row, Col, Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Button, ListGroup, ListGroupItem, List, Badge
} from 'reactstrap';
import { useEffect } from 'react';
import AuthService from '../services/authService';

const InternalJobs = () => {

    const { http } = AuthService();

    useEffect(() => {

    })

    return (
        <>
            <div className="content">
                <Container>
                    <Row>
                        <Row>
                            <Col sm="4">
                                <Card className='jobs-card' body>
                                    <CardTitle className='job-card-title'>Jobs<Button className='createAndApply-btn' color="link"><AddOutlinedIcon /> Create Job</Button></CardTitle>
                                    <Card className='job-card'>
                                        <CardSubtitle className='job-subtitle'>Assistant Manager Dept-A</CardSubtitle>
                                        <CardText>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum mollitia necessitatibus ducimus nisi ipsam possimus quas impedit eius accusantium</CardText>
                                        <Button className='btn-view-job-detail' color="link">VIEW</Button>
                                        <hr />
                                    </Card>
                                    <Card className='job-card'>
                                        <CardSubtitle className='job-subtitle'>Assistant Manager Dept-B</CardSubtitle>
                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                        <Button className='btn-view-job-detail' color="link">VIEW</Button>
                                        <hr />
                                    </Card>
                                    <Card className='job-card'>
                                        <CardSubtitle className='job-subtitle'>Assistant Manager Dept-C</CardSubtitle>
                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                        <Button className='btn-view-job-detail' color="link">VIEW</Button>
                                        <hr />
                                    </Card>

                                </Card>
                            </Col>
                            <Col sm="8">
                                <Card className='card-job-detail' body>
                                    <CardTitle className='job-card-title'>Assistant Manager<Button className='createAndApply-btn' color="link">Apply Now</Button></CardTitle>

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