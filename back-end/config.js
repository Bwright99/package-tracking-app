var firebase = require("firebase-admin");

var serviceAccount = require("./firestore_credentials.json");



const firebaseConfig = {
    apiKey: "AIzaSyDpk1YzZmxoFVjOalrQvADYK6rigFV1ke0",
    authDomain: "track-it-99392.firebaseapp.com",
    projectId: "track-it-99392",
    storageBucket: "track-it-99392.appspot.com",
    messagingSenderId: "80192568162",
    appId: "1:80192568162:web:2525865b07d9e8fec84a3b",
    measurementId: "G-6TMC0CW4MJ"
  };

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

const db = firebase.firestore();
const User = db.collection("Users");
const Package = db.collection("Package");
module.exports =  Package, User 