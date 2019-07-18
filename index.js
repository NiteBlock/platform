const express = require("express")
require("dotenv").config({"path":"./variables.env"})
const mongo = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
require("./Models/Device")
require("./Models/Data")

mongo.connect(process.env.DATABASE)

mongo.connection.on("error", function(e){
    console.error(e)
})

app.use(bodyParser())
app.use(cors())

app.get("/test", function(req,res){
    res.send("Connected.")
})

const routes = require("./Routes/routes")
app.use("/", routes)

app.listen(process.env.PORT, function(){
    console.log(`Process started on ${process.env.PORT}`)
})