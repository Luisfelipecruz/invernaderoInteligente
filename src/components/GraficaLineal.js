import React, {useState} from 'react';
import {Container, Row, Col, Card} from "react-bootstrap";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import '../App.css'
import CapturadorDatos from "./CapturadorDatos"
import firebase from "firebase";

const GraficaLineal = () => {
    const [registros, setRegistros] = useState([])
    const starCountRef = firebase.database().ref().child('arduinoMega001/');
    starCountRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            let bandera = true;
            registros.map(data => {
                if (childSnapshot.key === data.key) {
                    bandera = false;
                }
            })
            if (bandera) {
                console.log("Items");
                console.log(item);
                registros.push(item);
            }
        });
        console.log("imprimiendo registros");
        console.log(registros);
    });

    var data_humTierr = registros[0].humedadTierra;
    var result_humTierr = [];
    for (var i in data_humTierr)
        result_humTierr.push([data_humTierr[i]]);
    result_humTierr = result_humTierr.reverse();

    var data_humedadAire = registros[0].humedadAire;
    var result_humedadAire = [];
    for (var j in data_humedadAire)
        result_humedadAire.push([data_humedadAire[j]]);
    result_humedadAire = result_humedadAire.reverse();

    var data_temperatura = registros[0].temperatura;
    var result_temperatura = [];
    for (var k in data_temperatura)
        result_temperatura.push([data_temperatura[k]]);
    result_temperatura = result_temperatura.reverse();

    var data_tiempo = registros[0].tiempo;
    var result_tiempo = [];
    for (var l in data_tiempo)
        result_tiempo.push([data_tiempo[l]]);
    result_tiempo = result_tiempo.reverse();

    console.log(JSON.stringify(result_humTierr));
    console.log(JSON.stringify(result_humedadAire));
    console.log(JSON.stringify(result_temperatura));
    console.log(JSON.stringify(result_tiempo));

    return (
        <>
            <Container fluid="true">
                <Card style={{border: '10px solid rgba(255,255,255,.5)'}}>
                    <Card.Body>
                        <Row>
                            <Col xl={{span: 10, offset: 2}}>
                                <Card.Title style={{textAlign: 'center'}}>Graficas area bajo la curva</Card.Title>
                                <Card.Text style={{textAlign: 'center'}}>
                                    Utilizando hooks como useState, useForm con librerias como React-bootstrap y
                                    Recharts
                                </Card.Text>
                            </Col>
                        </Row>
                        <Row className="panelGraficas">
                            <Col xl={{span: 10, offset: 2}} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "2em"
                            }}>
                                <ResponsiveContainer width={'99%'} height={300}>
                                    <AreaChart
                                        width={700}
                                        height={400}
                                        data={result_tiempo}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="etiquetas"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Area type="monotone" dataKey="valores" stroke="#8884d8" fill="#8884d8"/>
                                    </AreaChart>
                                </ResponsiveContainer>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default GraficaLineal;