import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Container, Row, Col, Card, Button, Accordion} from "react-bootstrap";
import '../App.css'

const CapturadorDatos = (props) => {

    const {
        register,
        watch,
        formState: {errors},
        handleSubmit,
    } = useForm();

    const [entradas, setEntradas] = useState([]);

    const onSubmit = (data, e) => {
        console.log(data);
        setEntradas([
            ...entradas,
            {
                id: entradas.length + 1,
                etiquetas: data.etiquetas.toUpperCase(),
                valores: data.valores
            }
        ])
        e.target.reset();
    }

    const borrar = () => {
        setEntradas(entradas.slice(0, -1));
    }

    const clear = () => {
        setEntradas([]);
    }

    return (
        <>
            <div className="graficos">
                <Container fluid="true">
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} eventKey="0">
                                    Datos grafica
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Row>
                                        <Col xl={{span: 6}}>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <Row>
                                                    <Col>
                                                        <label>Nombre de la etiqueta</label>
                                                        <input type="hidden" value={0} {...register("id")} />
                                                        <label>Campo del valor</label>
                                                        <input type="text" {...register("etiquetas", {
                                                            required: {value: true, message: "Campo obligatorio"},
                                                            minLength: {value: 1, message: "minimo un caracteres"}
                                                        })} placeholder="Nombre de la etiqueta"
                                                               className="form-control my-m2"/>
                                                        {errors.etiquetas && (<span
                                                            className="text-danger text-small d-block mb-2"> {errors.etiquetas.message} </span>)}
                                                    </Col>
                                                </Row>
                                                <br/>
                                                <Row>
                                                    <Col>
                                                        <input type="number" {...register("valores", {
                                                            required: {value: true, message: "Campo obligatorio"},
                                                            min: {value: 0, message: "numero negativo"},
                                                            max: {value: 100, message: "numero mayor a 100"},
                                                            valueAsNumber: true
                                                        })}
                                                               placeholder="Ingrese numero "
                                                               className="form-control my-m2"/>
                                                        {errors.valores && (<span
                                                            className="text-danger text-small d-block mb-2"> {errors.valores.message} </span>)}
                                                    </Col>
                                                </Row>
                                                <br/>
                                                <Row>
                                                    <Col>
                                                        <div className="d-grid gap-2">
                                                            <input className="btn btn-md btn-primary" type="submit"/>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                {<pre>{JSON.stringify(watch())}</pre>}
                                            </form>
                                        </Col>
                                        <Col xl={{span: 6}}>
                                            <Row>
                                                <Col xl={{span: 6, offset: 3}}>
                                                    <br/>
                                                    <ul>
                                                        {entradas.map(entradas => (
                                                            <li key={entradas.id}>
                                                                <div>{entradas.id} - {entradas.etiquetas} - {entradas.valores}</div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <button className="btn btn-md btn-danger" onClick={clear}>Clear</button>
                                                <button className="btn btn-md btn-primary" style={{ marginTop: "5px",marginBottom: "5px"}} onClick={borrar}>Borrar ultimo </button>
                                                <button className="btn btn-md btn-success"
                                                        onClick={() => props.enviarPadre(entradas)}>Graficar
                                                </button>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Container>
            </div>
        </>
    )
        ;
};

export default CapturadorDatos;