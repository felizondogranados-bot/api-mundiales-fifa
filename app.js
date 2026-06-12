import express from 'express';
import mundialesRouter from './src/routes/mundiales.routes.js';
import { notFoundRouteHandler, errorHandler } from './src/middlewares/errors.js';

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
app.use(notFoundRouteHandler);

// Middleware global para manejo de errores
app.use(errorHandler);

export default app;
