require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan"); // Para logging de solicitudes HTTP
const helmet = require("helmet"); // Para mayor seguridad en cabeceras HTTP
const reportRoutes = require('./routes/reportRoutes');

// Importar rutas
const userRoutes = require("./routes/userRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const wifiRoutes = require("./routes/wifiRoutes");

const app = express();

// Función para conectar a MongoDB Atlas
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conexión a MongoDB Atlas exitosa");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error.message);
        process.exit(1); // Finaliza la ejecución si falla la conexión
    }
};
connectDB();

// Middlewares globales
const corsOptions = {
    origin: ["http://localhost:3000", "https://gestor-de-inventarios-para-dispositivos.onrender.com"], // Permitir frontend local y en Render
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));

app.use(bodyParser.json()); // Parseo de JSON en solicitudes
app.use(express.urlencoded({ extended: true })); // Parseo de datos de formularios
app.use(helmet()); // Mejoras de seguridad con Helmet
app.use(morgan("dev")); // Logging de solicitudes HTTP

// Rutas de API
app.use("/api/users", userRoutes); // Rutas para gestión de usuarios
app.use("/api/devices", deviceRoutes); // Rutas para gestión de dispositivos
app.use("/api/departments", departmentRoutes); // Rutas para gestión de departamentos
app.use('/api', reportRoutes);
app.use("/api", wifiRoutes);

// Ruta principal de prueba
app.get("/", (req, res) => {
    res.send("¡Bienvenido a la API de Gestión de Inventarios!");
});

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error("Error del servidor:", err); // Log detallado del error
    res.status(500).json({
        message: "Error interno del servidor",
        error: process.env.NODE_ENV === "development" ? err.message : "Ocurrió un error inesperado",
    });
});

// Configuración del servidor
const PORT = process.env.PORT || 5000; // Puerto configurable desde las variables de entorno
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

// Opcional: Manejo de señales del sistema para cerrar conexiones limpiamente
process.on("SIGINT", async () => {
    console.log("\nCerrando conexiones...");
    await mongoose.connection.close();
    console.log("Conexión a MongoDB cerrada");
    process.exit(0);
});
