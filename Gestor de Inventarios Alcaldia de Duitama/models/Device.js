const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    piso: { type: String, required: true },
    fecha: { type: Date, required: true },
    nombre: { type: String, required: true },
    contrasenaAdmin: { type: String, required: true },
    ubicacion: { type: String, required: true },
    usuario: { type: String, required: true },
    usuarioDominio: { type: String, required: true },
    tipo: { type: String, required: true },
    ipv4: { type: String, required: true },
    dominio: { type: String, required: true },
    numeroMac: { type: String, required: true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    serial: { type: String, required: true },
    placa: { type: String, required: true },
    procesador: { type: String, required: true },
    discoDuro: { type: String, required: true },
    memoriaRam: { type: String, required: true },
    sistemaOperativo: { type: String, required: true },
    antivirus: { type: String, required: true },
    softOfimatico: { type: String, required: true },
    navegador: { type: String, required: true },
    observaciones: { type: String, required: true },
    licencias: { type: String, required: true },
    historialActualizaciones: [
        {
            cambios: { type: Object },
            fecha: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model("Device", deviceSchema);
