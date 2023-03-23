const  express  =  require("express");
const createTables=require("./api/serverStartup")
const app = express(); //Initialized express
const  user  =  require("./api/routes/user/userRoutes");
require("dotenv").config();
app.use(express.json());
// app.use(cors());


const port = process.env.PORT || 5000;

// create require tables
  createTables.createTables()

// register routes 
app.use("/user",  user);

// for testing 
app.get("/", (req, res) => {

res.status(200).send("Engine Started, Ready to take off!");

})

app.listen(port, () => {

console.log(`Here we go, Engines started at ${port}.`);

})