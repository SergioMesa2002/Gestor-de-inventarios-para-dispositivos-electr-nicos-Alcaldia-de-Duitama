// models/Department.js
const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    numPrinters: { type: Number, required: true },
    numScanners: { type: Number, required: true },
});

module.exports = mongoose.model("Department", departmentSchema);


