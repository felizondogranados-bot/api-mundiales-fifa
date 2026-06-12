import { Router } from 'express';
import {
  getAllMundiales,
  getMundialBySlug,
  getMundialesByChampion,
  getRandomMundial,
  searchMundiales
} from '../controllers/mundiales.controller.js';
import { validateParams } from '../middlewares/validation.js';
import { searchParamsSchema } from '../schemas/mundial.schema.js';

const router = Router();

// Ruta para obtener todos los mundiales
router.get('/mundiales', getAllMundiales);

// Ruta para obtener un mundial por su slug
router.get('/mundial/:slug', getMundialBySlug);

// Ruta para obtener mundiales por país campeón
router.get('/campeon/:pais', getMundialesByChampion);

// Ruta para obtener un mundial aleatorio
router.get('/random', getRandomMundial);

// Ruta para buscar mundiales por texto en ruta (con validación de al menos 3 caracteres)
router.get('/search/:text', validateParams(searchParamsSchema), searchMundiales);

export default router;
