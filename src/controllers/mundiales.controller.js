import * as mundialModel from '../models/mundial.model.js';

/**
 * Obtiene todos los mundiales.
 * HTTP 200: Éxito. Retorna la lista de mundiales.
 * HTTP 500: Error interno del servidor.
 */
export async function getAllMundiales(req, res) {
  try {
    const mundiales = await mundialModel.getAll();
    res.status(200).json(mundiales);
  } catch (error) {
    console.error('Error en getAllMundiales:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los mundiales.' });
  }
}

/**
 * Obtiene un mundial por su slug.
 * HTTP 200: Éxito. Retorna el mundial.
 * HTTP 400: Solicitud incorrecta si no se proporciona el slug.
 * HTTP 404: No encontrado.
 * HTTP 500: Error interno del servidor.
 */
export async function getMundialBySlug(req, res) {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ error: 'El parámetro "slug" es requerido.' });
    }

    const mundial = await mundialModel.getBySlug(slug);
    if (!mundial) {
      return res.status(404).json({ error: `No se encontró ningún mundial con el slug "${slug}".` });
    }

    res.status(200).json(mundial);
  } catch (error) {
    console.error(`Error en getMundialBySlug para slug "${req.params.slug}":`, error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el mundial.' });
  }
}

/**
 * Obtiene todos los mundiales ganados por un país en específico.
 * HTTP 200: Éxito. Retorna la lista de mundiales ganados.
 * HTTP 400: Solicitud incorrecta si no se proporciona el país.
 * HTTP 500: Error interno del servidor.
 */
export async function getMundialesByChampion(req, res) {
  try {
    const { pais } = req.params;
    if (!pais) {
      return res.status(400).json({ error: 'El parámetro de ruta "pais" es requerido.' });
    }

    const mundiales = await mundialModel.getByChampion(pais);
    res.status(200).json(mundiales);
  } catch (error) {
    console.error(`Error en getMundialesByChampion para país "${req.params.pais}":`, error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los mundiales por campeón.' });
  }
}

/**
 * Obtiene un mundial aleatorio.
 * HTTP 200: Éxito. Retorna el mundial aleatorio.
 * HTTP 404: No encontrado si la base de datos está vacía.
 * HTTP 500: Error interno del servidor.
 */
export async function getRandomMundial(req, res) {
  try {
    const mundial = await mundialModel.getRandom();
    if (!mundial) {
      return res.status(404).json({ error: 'No se encontró ningún mundial en la base de datos.' });
    }

    res.status(200).json(mundial);
  } catch (error) {
    console.error('Error en getRandomMundial:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener un mundial aleatorio.' });
  }
}

/**
 * Busca mundiales que contengan el texto en sus campos principales.
 * Espera el parámetro de consulta ?q=texto
 * HTTP 200: Éxito. Retorna los resultados.
 * HTTP 400: Solicitud incorrecta si no se proporciona el parámetro de búsqueda "q".
 * HTTP 500: Error interno del servidor.
 */
export async function searchMundiales(req, res) {
  try {
    const { q } = req.query;
    if (q === undefined || q.trim() === '') {
      return res.status(400).json({ error: 'El parámetro de consulta de búsqueda "q" es requerido y no puede estar vacío.' });
    }

    const resultados = await mundialModel.search(q.trim());
    res.status(200).json(resultados);
  } catch (error) {
    console.error(`Error en searchMundiales con query "${req.query.q}":`, error);
    res.status(500).json({ error: 'Ocurrió un error al realizar la búsqueda de mundiales.' });
  }
}
