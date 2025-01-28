const mongoose = require("mongoose");

const wifiDeviceSchema = new mongoose.Schema({
    dispositivo: { type: String, required: true },
    direccion_ip: { type: String, required: true },
    ubicacion: { type: String, required: true },
});

module.exports = mongoose.model("WifiDevice", wifiDeviceSchema);
