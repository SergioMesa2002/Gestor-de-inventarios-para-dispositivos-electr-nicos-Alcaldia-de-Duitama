// controllers/departmentController.js
const Department = require("../models/Department");

// Crear un nuevo departamento
const createDepartment = async (req, res) => {
    try {
        const { nombre, numPrinters, numScanners } = req.body;

        // Crear y guardar el departamento
        const newDepartment = new Department({ nombre, numPrinters, numScanners });
        await newDepartment.save();

        res.status(201).json({ message: "Departamento creado exitosamente", department: newDepartment });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el departamento", error: error.message });
    }
};

// Obtener todos los departamentos
const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los departamentos", error: error.message });
    }
};

// Actualizar un departamento por ID
const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, numPrinters, numScanners } = req.body;

        // Buscar y actualizar el departamento
        const updatedDepartment = await Department.findByIdAndUpdate(
            id,
            { nombre, numPrinters, numScanners },
            { new: true } // Devuelve el documento actualizado
        );

        if (!updatedDepartment) {
            return res.status(404).json({ message: "Departamento no encontrado" });
        }

        res.status(200).json({ message: "Departamento actualizado exitosamente", department: updatedDepartment });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el departamento", error: error.message });
    }
};

module.exports = { createDepartment, getDepartments, updateDepartment };
