import React, {useState} from 'react';
import {Container, Row, Col, Card} from "react-bootstrap";
import {LineChart,AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Brush} from "recharts";
import '../App.css'
import firebase from "firebase";

const LinealCompleta = () => {

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
                registros.push(item);
            }
        });
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

    var resultado_json = [];
    for (var z = 0; z < result_tiempo.length; z++) {
        var iner_objt = new Object();
        if (result_humedadAire.length > z + 1) {
            iner_objt["tiempo"] = Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(result_tiempo[z][0]);
            iner_objt["humedad_Aire"] = result_humedadAire[z][0];
            iner_objt["humedad_Tierra"] = result_humTierr[z][0];
            iner_objt["temperatura"] = result_temperatura[z][0];
        } else {
            iner_objt[result_tiempo[z]] = null;
        }
        resultado_json.push(iner_objt);
    }

    console.log(JSON.stringify(resultado_json));

    return (
        <>
            <Container fluid="true">
                <Card style={{border: '10px solid rgba(255,255,255,.5)'}}>
                    <Card.Body>
                        <Row>
                            <Col xl={{span: 10, offset: 2}}>
                                <Card.Title style={{textAlign: 'center'}}>Data invernadero inteligente</Card.Title>
                            </Col>
                        </Row>
                        <Row className="panelGraficas">
                            <Col xl={{span: 10, offset: 2}} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "2em"
                            }}>
                                <div style={{width: '99%'}}>
                                    <ResponsiveContainer width={'99%'} height={200}>
                                        <LineChart
                                            width={500}
                                            height={200}
                                            data={resultado_json}
                                            syncId="anyId"
                                            margin={{
                                                top: 10,
                                                right: 30,
                                                left: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="tiempo" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="temperatura" stroke="#8884d8" fill="#8884d8" />
                                            <Brush />
                                        </LineChart>
                                    </ResponsiveContainer>
                                    <p>Maybe some other content</p>

                                    <ResponsiveContainer width="100%" height={200}>
                                        <LineChart
                                            width={500}
                                            height={200}
                                            data={resultado_json}
                                            syncId="anyId"
                                            margin={{
                                                top: 10,
                                                right: 30,
                                                left: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="tiempo" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="humedad_Aire" stroke="#82ca9d" fill="#82ca9d" />
                                            <Brush />
                                        </LineChart>
                                    </ResponsiveContainer>

                                    <ResponsiveContainer width="100%" height={200}>
                                        <LineChart
                                            width={500}
                                            height={200}
                                            data={resultado_json}
                                            syncId="anyId"
                                            margin={{
                                                top: 10,
                                                right: 30,
                                                left: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="tiempo" />
                                            <YAxis />
                                            <Line type="monotone" dataKey="humedad_Tierra" stroke="#82ca9d" fill="#82ca9d" />
                                            <Brush />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default LinealCompleta;