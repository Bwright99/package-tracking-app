const express = require("express")
const app = express()

const fake_data = require("./fake_data")

app.get("/api", (req, res) => {
    res.json(fake_data);
})

port = 2000
app.listen(port, () => {
    console.log("Server started on port " + port)
})