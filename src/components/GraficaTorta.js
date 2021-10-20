import React, {useState, useCallback} from 'react';
import {Container, Row, Col, Card} from "react-bootstrap";
import {PieChart, Pie, Sector, ResponsiveContainer} from "recharts";
import '../App.css'
import CapturadorDatos from "./CapturadorDatos"

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 2;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.etiquetas}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >{`VR ${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 5}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const GraficaTorta = () => {

    const [entradas, setEntradas] = useState([]);

    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    return (
        <>
            <Container fluid="true">
                <Card style={{border: '10px solid rgba(255,255,255,.5)'}}>
                    <Card.Body>
                        <Row>
                            <Col xl={{span: 10, offset: 2}}>
                                <Card.Title style={{textAlign: 'center'}}>Graficas de torta con etiquetas, valores y
                                    porcentajes</Card.Title>
                                <Card.Text style={{textAlign: 'center'}}>
                                    Utilizando hooks como useState, useCallback, useForm con librerias como
                                    React-bootstrap y Recharts
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
                                    <PieChart width={200} height={200}>
                                        <Pie
                                            activeIndex={activeIndex}
                                            activeShape={renderActiveShape}
                                            data={entradas}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="valores"
                                            onMouseEnter={onPieEnter}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default GraficaTorta;