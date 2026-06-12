import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mundialesRouter from './src/routes/mundiales.routes.js';
import { notFoundRouteHandler, errorHandler } from './src/middlewares/errors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Servir imágenes estáticas
app.use('/imagenes', express.static(path.join(__dirname, 'public/imagenes')));

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
