const express = require("express")
const app = express()
const cors = require("cors")
require('dotenv').config();
const FirebaseApp = require("./config")

var admin = require("firebase-admin/auth");

const { getAuth, signInWithEmailAndPassword } = require("firebase/auth")
const { getFirestore, doc, addDoc, getDoc, getDocs, collection } = require("firebase/firestore")
const fetch = require('node-fetch');


const fake_data = require("./fake_data");

app.use(express.json())
app.use(cors())

const db = getFirestore(FirebaseApp)

app.post('/trackers/track', async(req, res) => {
    console.log("hit")
    const trackingNumber = req.body.trackingNumber;
    let url = 'https://api.ship24.com/public/v1/trackers/track';

    let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + process.env.SHIP24_API_KEY
        },
        body: JSON.stringify({
            "trackingNumber":trackingNumber
        })
      };

    fetch(url, options)
        .then(res => res.json())
        .then((json) => {
            console.log(json)
            res.status(200).send(json)
        })
        .catch((err) => {
            console.error('error:' + err)
        });
})

app.post('/trackers/search/results', async(req, res) => {
    const trackingNumber = req.body.trackingNumber;
    let url = `https://api.ship24.com/public/v1/trackers/search/${trackingNumber}/results`;

    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.SHIP24_API_KEY
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then((json) => {
            console.log(json)
            res.status(200).send(json)
        })
        .catch((err) => {
            console.error('error:' + err)
        });

})

app.get('/trackers', async(req, res) => {
    let url = 'https://api.ship24.com/public/v1/trackers?page=1&limit=40';

    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.SHIP24_API_KEY
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            res.status(200).send(json);
        })
        .catch(err => {
            console.error('error:' + err);
            res.status(400).send(err);

        });
})

app.post('/trackers', async(req, res) => {
    const url = 'https://api.ship24.com/public/v1/trackers'
    
    const trackingNumber = req.body.trackingNumber
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + process.env.SHIP24_API_KEY
        },
        body: JSON.stringify({
            "trackingNumber": trackingNumber
        })
    };

    fetch(url, options)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            res.status(200).send(json)

        })
        .catch((err) => {
            console.error('error:' + err);
            res.status(400).send(err);
        });
})

app.get('/packages', async(req, res) => {
    const fb_packages = await getDocs(collection(db, "Packages"))
    if (!fb_packages.empty) {
        const packages = [];
        console.log("Document found");
        // to see full package data
        // console.log(fb_packages);
        fb_packages.forEach((doc) => {
            const data = doc.data();
            data["id"] = doc.id;
            packages.push(data);
        })
        res.status(200).send(packages);
    } else {
        res.status(204).send("No Documents is found");
    }
})

app.post("/packages", async(req, res) => {
    const packageInfo = req.body;
    
    
    try {
        // check entered values
        if ( packageInfo.shipperId === undefined || packageInfo.shipperId.length == 0 ) {
            throw new Error("shipperId not provided");
        } else if ( packageInfo.trackingNumber === undefined || packageInfo.trackingNumber.length == 0 ) {
            throw new Error("trackingNumber not provided");
        } else if ( packageInfo.departure === undefined || packageInfo.departure.length === 0 ) {
            throw new Error("departure not provided");
        } else if ( packageInfo.destination === undefined || packageInfo.destination.length === 0  ) {
            throw new Error("destination not provided");
        }
        await addDoc(collection(db, "Packages"), {
            shipperId: packageInfo.shipper_id,
            trackingNumber: packageInfo.tracking_number,
            departure: packageInfo.departure,
            destination: packageInfo.destination
        });
        console.log(packageInfo);
        res.send({msg:"Shipment Added"});
    } catch (e) {
        console.error(e);
        res.status(400).send({"error": e.message})
    }
})

app.post('/signIn', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // console.log(email + " " + password);
    signInWithEmailAndPassword(getAuth(FirebaseApp), email, password)
        .then((userCredentials) => {

            const tokens = userCredentials._tokenResponse
            // to look at tokens
            // console.log(userCredentials._tokenResponse);
            const resTokens = {
                idToken: tokens.idToken,
                refreshToken: tokens.refreshToken
            }
            res.status(200).send(resTokens);
        })
        .catch((err) => {
            console.log(err.code);
            console.log(err.message);
            // set up a better error handler for now just send 409 error
            res.status(409).send(err.code);
        })
})

app.post("/signUp", async(req, res) => {
    const userData = {
        displayName: req.body.displayName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password
    }
    admin.getAuth().createUser(userData)
        .then((userCredentials) => {
            console.log("A new user has signed up " + userCredentials.uid);
            res.status(200).send({"msg": "Successfully Created Account"})
        })
        .catch((err) => {
            console.log(err.code);
            console.log(err.message);
            res.sendStatus(err.code);
        })
})

app.post("/addUser", async(req, res) => {
    const newUserData = req.body
    try {
        await addDoc(collection(db, "Users"), {
            newUserData,
            "test": 1
        })

        console.log(req.body)
        res.send({msg:"User Added"});
    } catch (e) {
        console.error(e)
    }
})



app.get("/fake-data", (req, res) => {
    res.json(fake_data);
})

port = 2000
app.listen(port, () => {
    console.log("Server started on port " + port)
})