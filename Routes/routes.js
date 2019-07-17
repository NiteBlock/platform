const express = require("express");
const router = express.Router();

const deviceController = require("../Controllers/DeviceController")

router.post("/create-device", deviceController.createDevice)
router.get("/list-devices", deviceController.listDevices)
router.get("/find-by-id" ,deviceController.findById)
module.exports = router