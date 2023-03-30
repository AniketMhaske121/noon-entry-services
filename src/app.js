const express = require("express");
const createTables = require("./serverStartup")
const app = express(); //Initialized express
const user = require("./api/routes/user/userRoutes");
const noon = require("./api/routes/noonReportRoutes/noonEntryRoute")
const registerShip = require("./api/routes/ships/shipRoutes")
const cors = require('cors');
require("dotenv").config();
app.use(express.json());
// app.use(cors());


const port = process.env.PORT || 5000;

// create require tables
createTables.createTables()

// handle  cross origin browser error
app.use(cors())

// register routes 
app.use("/", user);
app.use("/", noon);
app.use("/", registerShip);

// for testing 
app.get("/noon", (req, res) => {

  res.status(200).send("Engine Started, Ready to take off!");

})

app.listen(port, () => {

  console.log(`Here we go, Engines started at ${port}.`);

})