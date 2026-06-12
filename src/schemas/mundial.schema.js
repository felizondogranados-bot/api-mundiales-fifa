import { z } from 'zod';

// Esquema para validar la búsqueda por texto
export const searchParamsSchema = z.object({
  text: z.string()
    .trim()
    .min(3, { message: 'El texto debe tener al menos 3 caracteres' })
});
