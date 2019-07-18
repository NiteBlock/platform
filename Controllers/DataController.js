const mongo = require("mongoose")
const ModelData = mongo.model("Data")

module.exports.saveData = function(req, res){
    const value = req.body.value;
    const deviceId = req.body.deviceId;
    
    
    const data = new ModelData({
        value : value,
        device : deviceId 
    })

    data.save().then(function(d){
        if(d){
            res.status(200)
            res.send("Data Created.")
        } 
        else{
            res.status(400).send("Failed to create.")
        }
    }).catch(function(e){
        res.satus(400).send(e)
        console.error(e)
    })
}


module.exports.getDeviceData = function(req, res){
    const deviceId = req.query.id;

    ModelData.find({
        device : deviceId
    }).then(function(data){
        if(data){
            res.status(200).json(data)
        } else{
            res.status(404).send("No data Found")
        }
    })
}
