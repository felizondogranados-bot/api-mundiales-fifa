/**
 * Clase de error personalizada para recursos no encontrados.
 */
export class NotFoundError extends Error {
  constructor(message = 'No encontrado') {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

/**
 * Middleware para rutas inexistentes.
 * Se monta al final de las rutas para capturar cualquier petición a endpoints no definidos.
 */
export function notFoundRouteHandler(req, res, next) {
  next(new NotFoundError());
}

/**
 * Middleware global para el manejo de errores en Express.
 * Captura NotFoundError y otros errores con estado 404 y responde con JSON formateado.
 */
export function errorHandler(err, req, res, next) {
  const statusCode = err.status || 500;
  
  if (statusCode === 404 || err.name === 'NotFoundError') {
    return res.status(404).json({ error: err.message || 'No encontrado' });
  }

  console.error('Error interno del servidor:', err.stack);
  res.status(500).json({ error: 'Ocurrió un error interno en el servidor.' });
}
