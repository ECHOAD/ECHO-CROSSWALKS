import "./App.css";
import React, { useState, useEffect, Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDgYowCQmgJO8bbtkzs5A6l2-_fbLgxmvQ",
  authDomain: "semaforo-f41b0.firebaseapp.com",
  projectId: "semaforo-f41b0",
  storageBucket: "semaforo-f41b0.appspot.com",
  messagingSenderId: "1028679765541",
  appId: "1:1028679765541:web:b8e9eb5589bd0ec82579cc",
  measurementId: "G-9S7E6TRRED",
});

const firestore = firebase.firestore();
let color = "red";
let countNormal = 10; // Agrege esta variable para manejar el tiempo del color red y green
let countYellow = 5  // Esta para el color Yellow
let activeLight = 0;
let change = false;

const circles = document.getElementsByClassName("circle");

function changeLight() {
  circles[activeLight].className = "circle";
  //Cambie este codigo, para evitar que semaforo pase de verde a rojo.
  // activeLight++; 

  // console.log(circles)
  // if (activeLight > 2) {
  //   activeLight = 0;
  // }

  switch (color) {
    case "red":
      activeLight = 1
      break;
    case "yellow":
      if(change) {
        activeLight = 0;
        change = false;
      }else {
        activeLight = 2;
        change = true;
      }
      break;
    case "green":
      activeLight = 1;
      break;
    default:
      activeLight = 0;
      break;
  }
  const currentLight = circles[activeLight];
  currentLight.classList.add(currentLight.getAttribute("color"));
  color = currentLight.getAttribute("color");
  console.log(`Cambio color  ${color}`);
}

function App() {
  const semaforoRef = firestore.collection("semaforo");
  const query = semaforoRef;
  const [semaforos] = useCollectionData(query, { idField: "id" });
 
  const [seconds, setSeconds] = useState(countNormal);
  let activeLight = 0;
  let semaRef = firestore.collection("semaforo").doc(color);
  
  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds -1), 1000);
      semaRef.update({
        tiempoactual: seconds
      });
    } else {
      changeLight();
      semaRef = firestore.collection("semaforo").doc(color);
      semaRef.get().then((doc) => {
        if(color === "yellow"){ 
          setSeconds(countYellow);
        }else{
          setSeconds(countNormal)
        }
        // setSeconds(Number(doc.data().tiempo)); Esta Linea esta Colocando un valor NaN en el estado
      });
      
    }
   
  });

  return (
    <div className="App">
      <div className="principal">
        <div className="sticks">
          <div className="stick1"></div>
          <div className="stick2"></div>
        </div>
        <div className="container">
          <div className="circle red" color="red"></div>
          <div className="circle" color="yellow"></div>
          <div className="circle" color="green"></div>
        </div>
        <div className="sticks">
          <div className="stick3"></div>
        </div>
        <div className="sticks">
          <div className="counter">
            <div className="count">{seconds}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
