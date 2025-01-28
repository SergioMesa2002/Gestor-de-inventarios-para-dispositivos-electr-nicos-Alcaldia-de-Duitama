const express = require("express");
const wifiController = require("../controllers/wifiController");

const router = express.Router();

// Ruta para crear un nuevo dispositivo WiFi
router.post("/wifi-devices", wifiController.createDevice);

// Ruta para obtener todos los dispositivos WiFi
router.get("/wifi-devices", wifiController.getAllDevices);

// Ruta para obtener un dispositivo WiFi por ID
router.get("/wifi-devices/:id", wifiController.getDeviceById);

// Ruta para actualizar un dispositivo WiFi por ID
router.put("/wifi-devices/:id", wifiController.updateDevice);

// Ruta para eliminar un dispositivo WiFi por ID
router.delete("/wifi-devices/:id", wifiController.deleteDevice);

module.exports = router;
