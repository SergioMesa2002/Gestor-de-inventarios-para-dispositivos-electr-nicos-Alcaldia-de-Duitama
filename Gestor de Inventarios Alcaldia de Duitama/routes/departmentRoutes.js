// routes/departmentRoutes.js
const express = require("express");
const router = express.Router();
const {
    createDepartment,
    getDepartments,
    updateDepartment,
} = require("../controllers/departmentController");

// Ruta para crear un departamento
router.post("/", createDepartment);

// Ruta para obtener todos los departamentos
router.get("/", getDepartments);

// Ruta para actualizar un departamento por ID
router.put("/:id", updateDepartment);

module.exports = router;
