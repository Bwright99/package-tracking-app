var { initializeApp, cert } = require("firebase-admin/app");

const firebase = require('firebase/app');
const { getFirestore } = require("firebase/firestore");
require('firebase/firestore');

initializeApp({
  credential: cert({
    "type": process.env.TYPE,
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
    "universe_domain": process.env.UNIVERSE_DOMAIN
  })
});

const firebaseConfig = {
  apiKey: "AIzaSyDpk1YzZmxoFVjOalrQvADYK6rigFV1ke0",
  authDomain: "track-it-99392.firebaseapp.com",
  projectId: "track-it-99392",
  storageBucket: "track-it-99392.appspot.com",
  messagingSenderId: "80192568162",
  appId: "1:80192568162:web:2525865b07d9e8fec84a3b",
  measurementId: "G-6TMC0CW4MJ"
};

const FirebaseApp = firebase.initializeApp(firebaseConfig);

const db = getFirestore(FirebaseApp)
module.exports = FirebaseApp, db