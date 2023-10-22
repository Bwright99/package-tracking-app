const express = require("express")
const app = express()

const cors = require("cors")
const User = require("./config")
const Package = require("./config")

const fake_data = require("./fake_data")

app.use(express.json())
app.use(cors())

app.get("/api", (req, res) => {
    res.json(fake_data);
})

app.post("/addUser", async(req, res) => {
    const data = req.body
    console.log("User added")
    console.log(req.body)
    await User.add(data);
    res.send({msg:"User Added"});
})

app.post("/addShipment", async(req, res) => {
    const packageInfo = req.body;
    console.log("Shipment Added")
    console.log(packageInfo);
    await Package.add(packageInfo);
    res.send({msg:"Shipment Added"});
})

port = 2000
app.listen(port, () => {
    console.log("Server started on port " + port)
})