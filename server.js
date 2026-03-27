// server.js - ACTUALIZAR CONFIGURACIÓN CORS
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const appointmentRoutes = require('./routes/appointmentRoutes');

dotenv.config();

const app = express();

connectDB();

// 👇 CONFIGURACIÓN CORS CON LA URL DE NETLIFY
const corsOptions = {
    origin: [
        'https://royalcut1.netlify.app/',  // 👈 TU URL DE NETLIFY
        'http://localhost:5500',
        'http://127.0.0.1:5500'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});