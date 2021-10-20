import app from "firebase/app";
import firebase from "firebase/app";
import 'firebase/database';
import {featureToFilterValue} from "kepler.gl/dist/utils/filter-utils";
import React, {Component, useEffect, useState} from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyDsEstryyAEZA6MGPgDdRo4zpyXorYQdS4",
    authDomain: "invernadero-533c9.firebaseapp.com",
    databaseURL: "https://invernadero-533c9-default-rtdb.firebaseio.com",
    projectId: "invernadero-533c9",
    storageBucket: "invernadero-533c9.appspot.com",
    messagingSenderId: "231244788334",
    appId: "1:231244788334:web:a1811c0805376a8bee2c7f"
};
app.initializeApp(firebaseConfig);
// Get a reference to the database service

if (!firebase.apps.length) {
    firebase.initializeApp({});
}else {
    firebase.app(); // if already initialized, use that one
}

const dbref=firebase.database().ref().child('arduinoMega001/');

dbref.on('value',function(snapshot){
    snapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot.val())
    })
})
export default app;

export const database = firebase.database();
export const ref = app.database().ref();

export function useDataHibernadero(){
    const [value,setValue] = useState([]);
    const starCountRef=firebase.database().ref().child('arduinoMega001/');
    starCountRef.on('value',(snapshot)=>{
        const data = snapshot.val();
        setValue(data);
    });
    return value;
}