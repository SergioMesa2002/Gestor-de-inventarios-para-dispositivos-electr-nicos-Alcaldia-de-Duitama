const WifiDevice = require("../models/WifiDevice"); // Importar el modelo de Mongoose

const wifiController = {
    // Crear un nuevo dispositivo WiFi
    createDevice: async (req, res) => {
        try {
            const { dispositivo, direccion_ip, ubicacion } = req.body;
            if (!dispositivo || !direccion_ip || !ubicacion) {
                return res.status(400).json({ message: "Todos los campos son obligatorios." });
            }
            const newDevice = new WifiDevice({ dispositivo, direccion_ip, ubicacion });
            const savedDevice = await newDevice.save();
            res.status(201).json({ message: "Dispositivo creado exitosamente.", device: savedDevice });
        } catch (error) {
            console.error("Error al crear dispositivo:", error);
            res.status(500).json({ message: "Error al crear el dispositivo." });
        }
    },

    // Obtener todos los dispositivos WiFi
    getAllDevices: async (req, res) => {
        try {
            const devices = await WifiDevice.find();
            res.status(200).json(devices);
        } catch (error) {
            console.error("Error al obtener dispositivos:", error);
            res.status(500).json({ message: "Error al obtener los dispositivos." });
        }
    },

    // Obtener un dispositivo por ID
    getDeviceById: async (req, res) => {
        try {
            const { id } = req.params;
            const device = await WifiDevice.findById(id);
            if (!device) {
                return res.status(404).json({ message: "Dispositivo no encontrado." });
            }
            res.status(200).json(device);
        } catch (error) {
            console.error("Error al obtener dispositivo:", error);
            res.status(500).json({ message: "Error al obtener el dispositivo." });
        }
    },

    // Actualizar un dispositivo por ID
    updateDevice: async (req, res) => {
        try {
            const { id } = req.params;
            const { dispositivo, direccion_ip, ubicacion } = req.body;
            const updatedDevice = await WifiDevice.findByIdAndUpdate(
                id,
                { dispositivo, direccion_ip, ubicacion },
                { new: true, runValidators: true }
            );
            if (!updatedDevice) {
                return res.status(404).json({ message: "Dispositivo no encontrado." });
            }
            res.status(200).json({ message: "Dispositivo actualizado exitosamente.", device: updatedDevice });
        } catch (error) {
            console.error("Error al actualizar dispositivo:", error);
            res.status(500).json({ message: "Error al actualizar el dispositivo." });
        }
    },

    // Eliminar un dispositivo por ID
    deleteDevice: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedDevice = await WifiDevice.findByIdAndDelete(id);
            if (!deletedDevice) {
                return res.status(404).json({ message: "Dispositivo no encontrado." });
            }
            res.status(200).json({ message: "Dispositivo eliminado exitosamente." });
        } catch (error) {
            console.error("Error al eliminar dispositivo:", error);
            res.status(500).json({ message: "Error al eliminar el dispositivo." });
        }
    },
};

module.exports = wifiController;
