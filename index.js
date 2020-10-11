const express =require("express")
const cors  = require('cors')
const bodyparser = require('body-parser')

const MongoClient = require('mongodb').MongoClient;
require("dotenv").config()

const app = express()
const port  =  5000


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vigvf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors())
app.use(bodyparser.json())
app.get("/",(req,res) => {
    res.send("hello")
})


const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const appointmentsCollection = client.db("dportal").collection("appointment");

app.post("/addAppointment",(req,res) =>{
    const appointment = req.body
    appointmentsCollection.insertOne(appointment)
    .then(result => {
        res.send(result.insertedCount > 0)
    })
})

  console.log("db connected");
});


app.listen(process.env.PORT ||  port)