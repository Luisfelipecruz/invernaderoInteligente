import React,  { useState }from "react";
import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from "react-palm/tasks";
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import useSwr from "swr";
import { Container, Row, Col } from "react-bootstrap";

const API = process.env.REACT_APP_API;

const reducers = combineReducers({
    keplerGl: keplerGlReducer,
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export const Geodata = () => {
    return (
        <Container fluid="true">
            <br></br>
            <Row>
                <Col xl={{ span: 10, offset: 3 }}>
                    <Provider store={store}>
                        <Map/>
                    </Provider>
                </Col>
            </Row>
        </Container>
    );
};

function Map(parametro) {
    {/*
    const dispatch = useDispatch();
    const { data } = useSwr("HURTO-A-PERSONAS", async () => {
        const response = await fetch(
            `${API}/reportespolicia/${"ARTICULO%20229.%20VIOLENCIA%20INTRAFAMILIAR"}`
        );

        const data = await response.json();
        return data;
    });*/}

    React.useEffect(() => {
        {/*if (data) {
            dispatch(
                addDataToMap({
                    datasets: {
                        info: {
                            label: "inverdadero_Inteligente",
                            id: "inverdadero",
                        },
                        data,
                    },
                    option: {
                        centerMap: true,
                        readOnly: false,
                    },
                    config: {},
                })
            );
        }*/}
    }, []);
    //    }, [dispatch, data]);
    return (
        <KeplerGl
            id="inverdadero"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
            width={1200}
            height={800}
        />
    );
}

