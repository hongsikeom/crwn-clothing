import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDxhiDeIUiz9BnGmT0-H0h1wi2DVrwMVms",
    authDomain: "crwn-db-1e369.firebaseapp.com",
    projectId: "crwn-db-1e369",
    storageBucket: "crwn-db-1e369.appspot.com",
    messagingSenderId: "329780591772",
    appId: "1:329780591772:web:eab17b41594272ba464159",
    measurementId: "G-CP5XGLDE44"
  };


  firebase.initializeApp(config);

  // set provide (google)
  const provider = new firebase.auth.GoogleAuthProvider();


  // auth and firestore
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const signInWithGoogle = () =>  firebase.auth().signInWithPopup(provider)
  export default firebase;

