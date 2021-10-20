import React, {useState} from 'react';
import {Container, Row, Col, Card} from "react-bootstrap";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import '../App.css'
import firebase from "firebase";

const LinealTemperatura = () => {

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

    var data_temperatura = registros[0].temperatura;
    var result_temperatura = [];
    for(var k in data_temperatura)
        result_temperatura.push([data_temperatura[k]]);
    result_temperatura = result_temperatura.reverse();

    var data_tiempo = registros[0].tiempo;
    var result_tiempo = [];
    for (var l in data_tiempo)
        result_tiempo.push([data_tiempo[l]]);
    result_tiempo = result_tiempo.reverse();

    console.log(JSON.stringify(result_temperatura));
    console.log(JSON.stringify(result_tiempo));


    var resultado_json = [];
    for(var z=0; z< result_tiempo.length; z++){
        var iner_objt = new Object();
        if(result_temperatura.length>z+1){
            iner_objt["tiempo"] = Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(result_tiempo[z][0]);
            iner_objt["temperatura"] = result_temperatura[z][0];

        }else{
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
                                <Card.Title style={{textAlign: 'center'}}>Humedad del aire</Card.Title>
                                <Card.Text style={{textAlign: 'center'}}>
                                    Estas mediciones se tomaron con un sensor DHT11 conectado directamente a la placa ES8266, este mide grados celcious.
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
                                        data={resultado_json}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="tiempo"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Area type="monotone" dataKey="temperatura" stroke="#8884d8" fill="#8884d8"/>
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

export default LinealTemperatura;