

// Crear un nuevo dispositivo
const Device = require("../models/Device");

// Crear un nuevo dispositivo
exports.createDevice = async (req, res) => {
    try {
        const deviceData = req.body;

        const newDevice = new Device(deviceData);
        await newDevice.save();

        res.status(201).json({
            message: "Dispositivo creado exitosamente",
            device: newDevice,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error al crear el dispositivo",
            error: error.message,
        });
    }
};


// Obtener todos los dispositivos
exports.getAllDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Buscar dispositivos por nombre, tipo o ubicación
exports.searchDevices = async (req, res) => {
    try {
        const { query } = req.query;
        const devices = await Device.find({
            $or: [
                { nombre: new RegExp(query, "i") },
                { tipo: new RegExp(query, "i") },
                { ubicacion: new RegExp(query, "i") },
            ],
        });
        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un dispositivo
exports.updateDevice = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDevice = await Device.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedDevice) return res.status(404).json({ message: "Dispositivo no encontrado" });
        res.json({ message: "Dispositivo actualizado exitosamente", updatedDevice });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Generar archivo TXT con información del dispositivo
exports.generateDeviceReport = async (req, res) => {
    const fs = require("fs");
    try {
        const { id } = req.params;
        const device = await Device.findById(id);
        if (!device) return res.status(404).json({ message: "Dispositivo no encontrado" });

        const reportContent = JSON.stringify(device, null, 2);
        const filePath = `reports/device_${device._id}_${Date.now()}.txt`;

        fs.writeFileSync(filePath, reportContent);
        res.download(filePath, () => fs.unlinkSync(filePath));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
