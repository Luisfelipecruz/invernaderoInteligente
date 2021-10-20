import React, {Fragment} from 'react';
import GraficaLineal from '../components/GraficaLineal';
import GraficaTorta from '../components/GraficaTorta';
import useDatabaseEntry from '../components/UseDatabaseEntry';


export const GraficasPage = () => {
    return (
        <Fragment>
            <GraficaLineal />
        </Fragment>
    );
};

export const GraficaLinealPage = () => {
    return (
        <Fragment>
            <GraficaLineal />
        </Fragment>
    );
};

export const GraficaTortaPage = () => {
    return (
        <Fragment>
            <GraficaTorta />
        </Fragment>
    );
};

export const GraficaHistogramaPage = () => {
    return (
        <Fragment>
                <useDatabaseEntry />
        </Fragment>
    );
};