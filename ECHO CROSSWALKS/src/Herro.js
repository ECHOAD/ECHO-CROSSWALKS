import React, { useState, useEffect, Component } from "react";
import logo from "./Img/Logo.png";
import FireBase from "./FireBase";
import "firebase/auth";
import "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";

const circles = document.getElementsByClassName("circle");
let activeLight = 0;
let estado = "";
let tiempo = "apagado";
let infoText = "Desactivado";

const firestore = FireBase.firestore();
let semaRef = firestore.collection("semaforo").doc("green");

function changeLight() {
  circles[activeLight].className = "circle";
  activeLight++;

  if (activeLight > 2) {
    activeLight = 0;
  }

  const currentLight = circles[activeLight];

  currentLight.classList.add(currentLight.getAttribute("color"));
}

const Hero = (props) => {
  const [seconds, setSeconds] = React.useState(0);
  const semaforoRef = firestore.collection("semaforo");
  const query = semaforoRef;
  const [semaforos] = useCollectionData(query, { idField: "id" });
  useEffect(() => {
    if (tiempo == "encendido") {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        estado = "Adelante, ya puedes cruzar";
        setSeconds(0);
        circles[activeLight].className = "circle";
      }
    } else {
      setSeconds(0);
    }
  });

  function activado() {
    estado = "Ten paciencia, ya llegará tu turno :)";
    tiempo = "encendido";
    circles[activeLight].className = "circle";
    activeLight = 2;
    const currentLight = circles[activeLight];

    currentLight.classList.add(currentLight.getAttribute("color"));

    semaRef.get().then((doc) => {
      setSeconds(Number(doc.data().tiempoactual));
    });
  }

  function cancelar() {
    circles[activeLight].className = "circle";
    estado = "Ya no cruzarás :(";
    tiempo = "apagado";
    setSeconds(0);
  }

  const {
    email,
    setEmail,

    handleLogout,
  } = props;

  return (
    <section className="hero">
      <nav>
        <div className="contain">
          <img src={logo} width="" height="60" />
          <h2>
            Bienvenido a
            <span className="ECHOLOGO">
              <b> Echo Croswalks </b>
            </span>
          </h2>
        </div>
      </nav>

      <div className="divSemaforo">
        <div className="circle" id="circle1" color="red"></div>
        <div className="circle" id="circle2" color="yellow"></div>
        <div className="circle" id="circle3" color="green"></div>
      </div>

      <div className="sticks">
        <div className="counter">
          <div className="count">{seconds} Segundos</div>
        </div>
      </div>

      <div className="Container1" id="containerInfo">
        <div className="infoText">{estado == "" ? "Desactivado" : estado}</div>
      </div>

      
        <div className="btn-action">
          <input
            type="button"
            value="Solicitar Cruce"
            onClick={activado}
            className="input1"
          />

          <input
            type="button"
            value="Cancelar Solicitud"
            onClick={cancelar}
            className="input2"
          />

          <input
            type="button"
            value="Cerrar Sesión"
            onClick={handleLogout}
            className="input3"
          />
        </div>
     
    </section>
  );
};

export default Hero;
