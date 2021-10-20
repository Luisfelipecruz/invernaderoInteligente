import React, {useState} from 'react';
import {Container, Row, Col, Card} from "react-bootstrap";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import '../App.css'
import firebase from "firebase";

const LinealHumedadTierra = () => {

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

    var data_tiempo = registros[0].tiempo;
    var result_tiempo = [];
    for (var l in data_tiempo)
    result_tiempo.push([data_tiempo[l]]);
    result_tiempo = result_tiempo.reverse();

    console.log(JSON.stringify(result_humTierr));
    console.log(JSON.stringify(result_tiempo));


    var resultado_json = [];
    for(var z=0; z< result_tiempo.length; z++){
        var iner_objt = new Object();
        if(result_humTierr.length>z+1){
            iner_objt["tiempo"] = Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(result_tiempo[z][0]);
            iner_objt["humedad_Tierra"] = result_humTierr[z][0];

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
                                <Card.Title style={{textAlign: 'center'}}>Humedad del suelo</Card.Title>
                                <Card.Text style={{textAlign: 'center'}}>
                                    Estas mediciones se tomaron con un sensor de humedad de suelo YL100 con un higometro, este mide de 0 "cero" a 100 "cien" siendo este ultimo mas seco.
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
                                        <Area type="monotone" dataKey="humedad_Tierra" stroke="#8884d8" fill="#8884d8"/>
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

export default LinealHumedadTierra;