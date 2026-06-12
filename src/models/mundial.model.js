import getDb from '../database/db.js';

/**
 * Obtiene todos los mundiales de la base de datos.
 * @returns {Promise<Array<Object>>} Lista de todos los mundiales.
 */
export async function getAll() {
  const db = await getDb();
  return db.all('SELECT * FROM mundiales ORDER BY anio DESC');
}

/**
 * Obtiene un mundial por su slug único.
 * @param {string} slug - El slug identificador (e.g. 'qatar-2022').
 * @returns {Promise<Object|undefined>} El mundial encontrado o undefined si no existe.
 */
export async function getBySlug(slug) {
  const db = await getDb();
  return db.get('SELECT * FROM mundiales WHERE slug = ?', [slug]);
}

/**
 * Obtiene los mundiales ganados por un país en específico.
 * @param {string} pais - Nombre del país campeón (búsqueda insensible a mayúsculas/minúsculas).
 * @returns {Promise<Array<Object>>} Lista de mundiales donde el país fue campeón.
 */
export async function getByChampion(pais) {
  const db = await getDb();
  return db.all('SELECT * FROM mundiales WHERE LOWER(campeon) = LOWER(?) ORDER BY anio DESC', [pais]);
}

/**
 * Obtiene un mundial de forma aleatoria.
 * @returns {Promise<Object|undefined>} Un mundial aleatorio.
 */
export async function getRandom() {
  const db = await getDb();
  return db.get('SELECT * FROM mundiales ORDER BY RANDOM() LIMIT 1');
}

/**
 * Realiza una búsqueda de texto en varios campos del mundial (nombre, sede, campeón, subcampeón, goleador, resumen, descripción).
 * @param {string} text - El texto a buscar.
 * @returns {Promise<Array<Object>>} Lista de mundiales que coinciden con el texto de búsqueda.
 */
export async function search(text) {
  const db = await getDb();
  const queryPattern = `%${text}%`;
  return db.all(
    `SELECT * FROM mundiales 
     WHERE nombre LIKE ? 
        OR sede LIKE ? 
        OR campeon LIKE ? 
        OR subcampeon LIKE ? 
        OR goleador LIKE ? 
        OR resumen LIKE ? 
        OR descripcion LIKE ? 
     ORDER BY anio DESC`,
    [
      queryPattern,
      queryPattern,
      queryPattern,
      queryPattern,
      queryPattern,
      queryPattern,
      queryPattern
    ]
  );
}
