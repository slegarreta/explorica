import React from 'react';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAHLHnY7aoCPC2Sjl7fEhhstbm3ps52-T4",
  authDomain: "jsr-709-sam.firebaseapp.com",
  databaseURL: "https://jsr-709-sam.firebaseio.com",
  projectId: "jsr-709-sam",
  storageBucket: "",
  messagingSenderId: "1061331343323",
  appId: "1:1061331343323:web:81504f2ae8488ee7"
};

const Firebase = firebase.initializeApp(config);
export default Firebase;
