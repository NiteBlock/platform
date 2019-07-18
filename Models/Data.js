const mongo = require("mongoose")
const Schema = mongo.Schema;

const config = {
    value : {
        type: Number,
        default: 0,
        required: true
    },
    timeStamp : {
        type: Date,
        default: Date.now
    },
    device: {
        type: mongo.Schema.ObjectId,
        ref: "Device",
        required : true
    }
}


const DataSchema = new Schema(config)

module.exports = mongo.model("Data", DataSchema)