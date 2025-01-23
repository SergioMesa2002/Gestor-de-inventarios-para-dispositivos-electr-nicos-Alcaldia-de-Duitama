const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');

const fonts = {
    Roboto: {
        normal: path.join(__dirname, '../fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../fonts/Roboto-Bold.ttf'),
        italics: path.join(__dirname, '../fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '../fonts/Roboto-BoldItalic.ttf'),
    },
};

const printer = new PdfPrinter(fonts);

/**
 * Genera un archivo PDF con los datos del dispositivo.
 * @param {Object} device - Objeto que contiene los datos del dispositivo.
 * @param {string} filePath - Ruta donde se guardará el archivo PDF.
 */
const generatePDF = (device, filePath) => {
    const docDefinition = {
        content: [
            { text: 'Reporte del Dispositivo', style: 'header' },
            { text: `Generado el: ${new Date().toLocaleString()}`, style: 'subheader' },
            { text: '\n' },
            {
                table: {
                    widths: ['30%', '70%'],
                    body: [
                        [{ text: 'Atributo', style: 'tableHeader' }, { text: 'Valor', style: 'tableHeader' }],
                        ...Object.entries(device).map(([key, value]) => [
                            { text: key.charAt(0).toUpperCase() + key.slice(1), style: 'tableCell' },
                            { text: value || 'N/A', style: 'tableCell' },
                        ]),
                    ],
                },
            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 10],
            },
            subheader: {
                fontSize: 12,
                italics: true,
                alignment: 'right',
                margin: [0, 0, 0, 10],
            },
            tableHeader: {
                bold: true,
                fillColor: '#4CAF50',
                color: 'white',
                alignment: 'center',
            },
            tableCell: {
                margin: [5, 5, 5, 5],
            },
        },
        defaultStyle: {
            font: 'Roboto',
        },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.end();
};

module.exports = { generatePDF };
