import React from 'react';
import {Container, Row, Col, Card} from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';

import '../App.css'

const LandingPage = () => {

    return (
        <>
            <Container fluid="true">
                <Card style={{border: '10px solid rgba(255,255,255,.5)'}}>
                    <Card.Body>
                        <Row>
                            <Col xl={{span: 10, offset: 2}}>
                                <Card.Title style={{textAlign: 'center'}}>
                                    <h1>Taller 3 Programación Javascript</h1>
                                </Card.Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={{span: 10, offset: 2}} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: 'center',
                                marginTop: "2em",
                                padding: "1em"
                            }}>
                                <Card.Text style={{textAlign: 'center'}}>
                                    <h3>Utilizando React js con hooks como useState, useForm con librerias como
                                        React-bootstrap y Recharts</h3>
                                </Card.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={{span: 10, offset: 2}} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: 'center',
                                marginTop: "2em",
                                padding: "1em"
                            }}>
                                <h3>Creador del proyecto: Luis Felipe Cruz
                                    {'   '}<FaIcons.FaJsSquare size={70}/>
                                    {'   '}<FaIcons.FaReact size={70}/></h3>
                                <br></br>
                                ,
                            </Col>
                            <Col xl={{span: 5}} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "2em"
                            }}>

                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default LandingPage;