const { generatePDF } = require('../utils/generatePDF');
const path = require('path');
const fs = require('fs');

exports.generateDeviceReport = async (req, res) => {
    const deviceId = req.params.id;

    try {
        // Aquí reemplaza con la lógica para obtener el dispositivo
        const device = await getDeviceById(deviceId);

        if (!device) {
            return res.status(404).send('Dispositivo no encontrado');
        }

        // Crear la carpeta "reports" si no existe
        const reportsDir = path.join(__dirname, '../reports');
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir);
        }

        const filePath = path.join(reportsDir, `device_${deviceId}_${Date.now()}.pdf`);
        generatePDF(device, filePath);

        res.download(filePath, `Reporte_${deviceId}.pdf`, err => {
            if (err) {
                console.error('Error al enviar el archivo:', err);
                res.status(500).send('Error al generar el informe');
            }
            fs.unlinkSync(filePath); // Elimina el archivo después de enviarlo
        });
    } catch (error) {
        console.error('Error al generar el informe:', error);
        res.status(500).send('Error interno del servidor');
    }
};
