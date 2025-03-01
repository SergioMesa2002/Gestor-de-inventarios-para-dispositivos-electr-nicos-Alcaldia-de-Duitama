const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Render asigna un puerto automáticamente

// Middleware para servir archivos estáticos desde la raíz
app.use(express.static(__dirname));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para registro de usuarios
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

// Ruta para gestión de computadores
app.get('/computers', (req, res) => {
    res.sendFile(path.join(__dirname, 'computers.html'));
});

// Ruta para gestión de departamentos
app.get('/departments', (req, res) => {
    res.sendFile(path.join(__dirname, 'departments.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor frontend ejecutándose en el puerto ${PORT}`);
});
