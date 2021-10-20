import React, {Component, useEffect, useState} from 'react';
import firebase from "firebase";

const TableComponent = () => {
    const [registros, setRegistros] = useState([])
    const starCountRef = firebase.database().ref().child('arduinoMega001/');
    starCountRef.on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            let bandera = true;
            registros.map(data => {
                if( childSnapshot.key === data.key){
                    bandera = false;
                }
            })
            if(bandera){
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
    for(var i in data_humTierr)
        result_humTierr.push([data_humTierr[i]]);
    result_humTierr = result_humTierr.reverse();

    var data_humedadAire = registros[0].humedadAire;
    var result_humedadAire = [];
    for(var j in data_humedadAire)
        result_humedadAire.push([data_humedadAire[j]]);
    result_humedadAire = result_humedadAire.reverse();

    var data_temperatura = registros[0].temperatura;
    var result_temperatura = [];
    for(var k in data_temperatura)
        result_temperatura.push([data_temperatura[k]]);
    result_temperatura = result_temperatura.reverse();

    var data_tiempo = registros[0].tiempo;
    var result_tiempo = [];
    for(var l in data_tiempo)
        result_tiempo.push([data_tiempo[l]]);
    result_tiempo = result_tiempo.reverse();

    console.log(JSON.stringify(result_humTierr));
    console.log(JSON.stringify(result_humedadAire));
    console.log(JSON.stringify(result_temperatura));
    console.log(JSON.stringify(result_tiempo));

    return (
        <>
            <div>
                <div>
                    <h3>Informacion capturada por los sensores del invernadero</h3>
                </div>
                <div class="row justify-content-center">
                    <div class="col-auto">
                        <table class="table table-bordered">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Humedad Aire</th>
                                <th scope="col">Humedad Tierra</th>
                                <th scope="col">Temperatura</th>
                                <th scope="col">Tiempo</th>
                            </tr>
                            </thead>
                            <tbody>

                            {result_tiempo.map((data, index) => {
                                return (
                                    <tr scope="row">
                                        <td>{result_humedadAire[index]} %</td>
                                        <td>{result_humTierr[index]}</td>
                                        <td>{result_temperatura[index]} °C</td>
                                        <td>{Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        }).format(data)}</td>

                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>

    );
};

export default TableComponent;