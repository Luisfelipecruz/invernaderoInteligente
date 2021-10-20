import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Card} from "react-bootstrap";
import {
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import '../App.css';
import CapturadorDatos from "./CapturadorDatos";
import app from "../firestone";


const GraficaHistograma = () => {

    const [entradas, setEntradas] = useState([]);
    const usersRef = app.database().ref.child('/arduinoMega001/registros');
    console.log("pase por aca");
    usersRef.set({
        humedadAire: 80,
        humedadTierra: 60,
        temperatura: 30,
        tiempo: 20180203073000
    });

    return (
        <>
            <Container fluid="true">
                <Card style={{border: '10px solid rgba(255,255,255,.5)'}}>
                    <Card.Body>
                        <Row>
                            <Col xl={{span: 10, offset: 2}}>
                                <Card.Title style={{textAlign: 'center'}}>Graficas de histogramas con capacidad de hacer
                                    zoom</Card.Title>
                                <Card.Text style={{textAlign: 'center'}}>
                                    Utilizando hooks como useState, useForm con librerias como React-bootstrap y
                                    Recharts
                                </Card.Text>
                            </Col>
                        </Row>
                        <Row className="panelGraficas">
                            <Col xl={{span: 5, offset: 2}}>
                                <CapturadorDatos enviarPadre={entradas => setEntradas(entradas)}/>
                            </Col>
                            <Col xl={{span: 5}} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "2em"
                            }}>
                                <ResponsiveContainer width={'99%'} height={300}>
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={entradas}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="etiquetas"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend verticalAlign="top" wrapperStyle={{lineHeight: "40px"}}/>
                                        <ReferenceLine y={0} stroke="#000"/>
                                        <Brush dataKey="valores" height={30} stroke="#8884d8"/>
                                        <Bar dataKey="valores" fill="#8884d8"/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default GraficaHistograma;