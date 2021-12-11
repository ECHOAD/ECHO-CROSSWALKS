import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyDgYowCQmgJO8bbtkzs5A6l2-_fbLgxmvQ",
  authDomain: "semaforo-f41b0.firebaseapp.com",
  projectId: "semaforo-f41b0",
  storageBucket: "semaforo-f41b0.appspot.com",
  messagingSenderId: "1028679765541",
  appId: "1:1028679765541:web:b8e9eb5589bd0ec82579cc",
  measurementId: "G-9S7E6TRRED"
  };

const fire = firebase.initializeApp(firebaseConfig);
  export default fire;