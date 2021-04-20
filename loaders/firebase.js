import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDYhqbu-ixcv-06SrAUza_RQ9dXDS0oScs",
    authDomain: "coding-test-nln.firebaseapp.com",
    databaseURL: "https://coding-test-nln-default-rtdb.firebaseio.com",
    projectId: "coding-test-nln",
    storageBucket: "coding-test-nln.appspot.com",
    messagingSenderId: "566909737199",
    appId: "1:566909737199:web:2c24f8b1eed3ddd409e31a",
    measurementId: "G-K14LBGVMEM",
  });
}

const db = firebase.firestore();
const auth = firebase.auth();

export { auth, db };
