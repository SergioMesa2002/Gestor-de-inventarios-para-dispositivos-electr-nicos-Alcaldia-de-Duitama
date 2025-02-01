const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

async function generatePDFWithTemplate(device, outputPath) {
    // Cargar la plantilla PDF
    const templateBytes = fs.readFileSync('Plantilla_Informe.pdf');
    const pdfDoc = await PDFDocument.load(templateBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Definir posiciones para los datos (ajustar según la plantilla)
    const startX = 50; // Posición X donde inicia la primera columna
    const startY = 600; // Posición inicial en Y
    const lineHeight = 20; // Espaciado entre líneas

    const attributes = [
        'id', 'Piso', 'Fecha', 'Nombre', 'ContrasenaAdmin', 'Ubicacion', 'Usuario',
        'UsuarioDominio', 'Tipo', 'Ipv4', 'Dominio', 'NumeroMac', 'Marca', 'Modelo',
        'Serial', 'Placa', 'Procesador', 'DiscoDuro', 'MemoriaRam', 'SistemaOperativo',
        'Antivirus', 'SoftOfimatico', 'Navegador', 'Observaciones', 'Licencias', 'HistorialActualizaciones'
    ];

    attributes.forEach((attr, index) => {
        const value = device[attr] || 'N/A';

        // Escribir el nombre del atributo
        firstPage.drawText(attr + ':', {
            x: startX,
            y: startY - index * lineHeight,
            size: 12,
            color: rgb(0, 0, 0),
        });

        // Escribir el valor del atributo
        firstPage.drawText(value, {
            x: startX + 150, // Segunda columna
            y: startY - index * lineHeight,
            size: 12,
            color: rgb(0.2, 0.2, 0.2),
        });
    });

    // Guardar el nuevo PDF
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
}

module.exports = { generatePDFWithTemplate };
