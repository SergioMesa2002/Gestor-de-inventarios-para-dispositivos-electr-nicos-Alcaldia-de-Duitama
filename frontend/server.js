const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Ruta principal para el inicio de sesión
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

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor frontend ejecutándose en http://localhost:${PORT}`);
});
