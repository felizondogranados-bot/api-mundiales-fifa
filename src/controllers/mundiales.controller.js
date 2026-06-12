import * as mundialModel from '../models/mundial.model.js';
import { NotFoundError } from '../middlewares/errors.js';

/**
 * Obtiene todos los mundiales.
 * HTTP 200: Éxito. Retorna la lista de mundiales.
 * HTTP 500: Error interno del servidor.
 */
export async function getAllMundiales(req, res, next) {
  try {
    const includeFull = req.query.include === 'full';
    const mundiales = await mundialModel.getAll(includeFull);
    res.status(200).json(mundiales);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtiene un mundial por su slug.
 * HTTP 200: Éxito. Retorna el mundial.
 * HTTP 400: Solicitud incorrecta si no se proporciona el slug.
 * HTTP 404: No encontrado.
 * HTTP 500: Error interno del servidor.
 */
export async function getMundialBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ error: 'El parámetro "slug" es requerido.' });
    }

    const mundial = await mundialModel.getBySlug(slug);
    if (!mundial) {
      return next(new NotFoundError());
    }

    res.status(200).json(mundial);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtiene todos los mundiales ganados por un país en específico.
 * HTTP 200: Éxito. Retorna la lista de mundiales ganados.
 * HTTP 400: Solicitud incorrecta si no se proporciona el país.
 * HTTP 500: Error interno del servidor.
 */
export async function getMundialesByChampion(req, res, next) {
  try {
    const { pais } = req.params;
    if (!pais) {
      return res.status(400).json({ error: 'El parámetro de ruta "pais" es requerido.' });
    }

    const mundiales = await mundialModel.getByChampion(pais);
    res.status(200).json(mundiales);
  } catch (error) {
    next(error);
  }
}

/**
 * Obtiene un mundial aleatorio.
 * HTTP 200: Éxito. Retorna el mundial aleatorio.
 * HTTP 404: No encontrado si la base de datos está vacía.
 * HTTP 500: Error interno del servidor.
 */
export async function getRandomMundial(req, res, next) {
  try {
    const mundial = await mundialModel.getRandom();
    if (!mundial) {
      return next(new NotFoundError());
    }

    res.status(200).json(mundial);
  } catch (error) {
    next(error);
  }
}

/**
 * Busca mundiales que contengan el texto en sus campos principales.
 * Espera el parámetro de consulta ?q=texto
 * HTTP 200: Éxito. Retorna los resultados.
 * HTTP 400: Solicitud incorrecta si no se proporciona el parámetro de búsqueda "q".
 * HTTP 500: Error interno del servidor.
 */
export async function searchMundiales(req, res, next) {
  try {
    const q = req.params.text || req.query.q;
    if (q === undefined || q.trim() === '') {
      return res.status(400).json({ error: 'El parámetro de búsqueda es requerido y no puede estar vacío.' });
    }

    const resultados = await mundialModel.search(q.trim());
    res.status(200).json(resultados);
  } catch (error) {
    next(error);
  }
}
