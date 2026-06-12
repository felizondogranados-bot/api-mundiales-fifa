/**
 * Middleware para validar los parámetros de ruta (req.params) usando un esquema Zod.
 * En caso de error de validación, retorna HTTP 400 con un formato de error específico.
 * 
 * @param {import('zod').ZodSchema} schema - El esquema Zod para validar req.params.
 * @returns {import('express').RequestHandler} Middleware de Express.
 */
export const validateParams = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.params);

  if (!result.success) {
    // Tomar el mensaje de error definido en Zod
    const errorMessage = result.error.issues[0]?.message || 'Parámetros inválidos.';
    return res.status(400).json({ error: errorMessage });
  }

  // Si pasa la validación, sobrescribimos req.params con los datos saneados (e.g. trim)
  req.params = result.data;
  next();
};
