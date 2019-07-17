const express = require("express")
require("dotenv").config({"path":"./variables.env"})
const mongo = require("mongoose")
const bodyParser = require("body-parser")

const app = express()

mongo.connect(process.env.DATABASE)

mongo.connection.on("error", function(e){
    console.error(e)
})

app.use(bodyParser())

app.get("/test", function(req,res){
    res.send("Connected.")
})

app.listen(process.env.PORT, function(){
    console.log(`Process started on ${process.env.PORT}`)
})