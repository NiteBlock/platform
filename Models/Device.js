const mongo = require("mongoose")
const Schema = mongo.Schema;

const config = {
    name : {
        type : String,
        required: true
    },
    type : {
        type : String,
        default : "SENSOR"
    },
    status : {
        type : Number,
        default : 0
    },
    colour : {
        type : String,
        required : true
    }
}

const DeviceSchema = new Schema(config)

module.exports = mongo.model("Device", DeviceSchema)