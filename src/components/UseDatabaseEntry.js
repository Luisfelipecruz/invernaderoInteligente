import app from "../firestone";
import React, {Component, useEffect, useState} from 'react';
import database from "../firestone";
import 'bootstrap/dist/css/bootstrap.min.css';
//Calling Firebase config setting to call the data
import firebase from "firebase";

class UseDatabaseEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {studentslist: []}
    }

    componentDidMount() {
        const studentlist = [];
        const starCountRef=firebase.database().ref().child('arduinoMega001/');
        starCountRef.on('value',function(snapshot){
            snapshot.forEach(function(childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

            });

        });

    }

    render() {
        return (
            <div>
                <div>
                    <h3>How to show firebase data in reactjs?</h3>
                </div>

                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>humedadAire</th>
                            <th>humedadTierra</th>
                            <th>temperatura</th>
                            <th>tiempo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.studentslist.map(data => {
                            return (
                                <tr>
                                    <td>{data.humedadAire}</td>
                                    <td>{data.humedadTierra}</td>
                                    <td>{data.temperatura}</td>
                                    <td>{data.tiempo}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default UseDatabaseEntry;