const express = require("express");
const {
    createDevice,
    getAllDevices,
    searchDevices,
    updateDevice,
    generateDeviceReport,
} = require("../controllers/deviceController");

const router = express.Router();

// Ruta para crear un nuevo dispositivo
// Método: POST /api/devices
router.post("/", createDevice);

// Ruta para obtener todos los dispositivos
// Método: GET /api/devices
router.get("/", getAllDevices);

// Ruta para buscar dispositivos por criterios específicos
// Método: GET /api/devices/search
router.get("/search", searchDevices);

// Ruta para actualizar un dispositivo por su ID
// Método: PUT /api/devices/:id
router.put("/:id", updateDevice);

// Ruta para generar un informe de un dispositivo por su ID
// Método: GET /api/devices/:id/report
router.get("/:id/report", generateDeviceReport);

module.exports = router;

