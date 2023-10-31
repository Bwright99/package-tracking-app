var firebase = require("firebase-admin");

// var serviceAccount = require("./firestore_credentials.json");


firebase.initializeApp({
  // credential: firebase.credential.cert(serviceAccount)
  credential: firebase.credential.cert({
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

const db = firebase.firestore();
const User = db.collection("Users");
const Package = db.collection("Packages");
module.exports =  Package, User 