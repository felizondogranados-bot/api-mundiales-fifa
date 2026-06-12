import express from 'express';
import mundialesRouter from './src/routes/mundiales.routes.js';

const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Registrar rutas principales directamente
app.use(mundialesRouter);

// Ruta base opcional para verificar el estado de la API
app.get('/', (req, res) => {
  res.json({
    name: 'API de Mundiales de la FIFA',
    version: '1.0.0',
    status: 'online'
  });
});

// Middleware para manejar endpoints no encontrados (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err.stack);
  res.status(500).json({ error: 'Ocurrió un error interno en el servidor.' });
});

export default app;
