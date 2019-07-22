const mongo = require("mongoose")
const ModelDevice = mongo.model("Device")

module.exports.createDevice = function (req, res) {
    const name = req.body.name;
    const type = req.body.type;
    const colour = req.body.colour
    if (!name || !colour) {
        res.status(400)
        res.send("No name or colour given.")
        return
    }
    const device = new ModelDevice({
        name: name,
        type: type,
        colour: colour
    })

    device.save().then(function (d) {
        if (d) {
            res.status(200)
            res.send("Device Created.")
        } else {
            res.status(400).send("Failed to create.")
        }
    }).catch(function (e) {
        res.satus(400)
        console.error(e)
    })
}

module.exports.listDevices = function (req, res) {
    ModelDevice.find(req.query).then(function (d) {
        res.status(200).json(d)
    })
}

module.exports.findById = function (req, res) {
    ModelDevice.findById(req.query.id).then(function (d) {
        if (d) {
            res.status(200).json(d)
        } else {
            res.send("Invalid Device Id")
            res.status(400)
        }
    }).catch(function (e) {
        res.send(e)
        res.status(500)
    })
}

module.exports.updateDeviceStatus = function (req, res) {
    const deviceId = req.body.id
    const deviceStatus = req.body.status
    if (!deviceId || !deviceStatus) {
        return res.status(400).send("Bad Request")
    }
    ModelDevice.findByIdAndUpdate(deviceId, { status: deviceStatus }).then(function (d) {
        if (d) {
            res.status(200).send("Done")
        }
        else {
            res.status(500).send("Couldn't update.")
        }

    })
}

module.exports.updateDeviceColour = function (req, res) {
    const deviceId = req.body.id
    const deviceColour = req.body.colour
    if (!deviceId || !deviceColour) {
        return res.status(400).send("Bad Request")
    }
    ModelDevice.findByIdAndUpdate(deviceId, { colour: deviceColour }).then(function (d) {
        if (d) {
            res.status(200).send("Done")
        }
        else {
            res.status(500).send("Couldn't update.")
        }

    })
}