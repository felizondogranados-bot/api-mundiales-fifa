import { Router } from 'express';
import {
  getAllMundiales,
  getMundialBySlug,
  getMundialesByChampion,
  getRandomMundial,
  searchMundiales
} from '../controllers/mundiales.controller.js';

const router = Router();

// Ruta para obtener todos los mundiales
router.get('/mundiales', getAllMundiales);

// Ruta para obtener un mundial por su slug
router.get('/mundial/:slug', getMundialBySlug);

// Ruta para obtener mundiales por país campeón
router.get('/campeon/:pais', getMundialesByChampion);

// Ruta para obtener un mundial aleatorio
router.get('/random', getRandomMundial);

// Ruta para buscar mundiales por texto en ruta
router.get('/search/:text', searchMundiales);

export default router;
