const mongo = require("mongoose")
const ModelDevice = mongo.model("Device")

module.exports.createDevice = function(req, res){
    const name = req.body.name  ;
    const type = req.body.type;
    if(!name){
        res.status(400)
        res.send("No name given.")
        return
    } 
    const device = new ModelDevice({
        name : name,
        type : type
    })

    device.save().then(function(d){
        if(d){
            res.status(200)
            res.send("Device Created.")
        } else{
            res.status(400).send("Failed to create.")
        }
    }).catch(function(e){
        res.satus(400)
        console.error(e)
    })
}

module.exports.listDevices = function(req,res){
    ModelDevice.find(req.query).then(function(d){
        res.status(200).json(d)
    })
}

module.exports.findById = function(req,res){
    ModelDevice.findById(req.query.id).then(function(d){
        if(!(d.json() === {})){
            res.status(200).json(d)
        } else{
            res.send("Invalid Device Id")
            res.status(400)
        }
    }).catch(function(e){
        res.send(e)
        res.status(500)
    })
}