import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del directorio actual (__dirname en ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo de la base de datos mundiales.db dentro de src/database/
const dbPath = path.join(__dirname, 'mundiales.db');

let db = null;

/**
 * Obtiene la conexión activa a la base de datos (Patrón Singleton).
 * Abre la conexión si aún no ha sido abierta.
 * 
 * @returns {Promise<import('sqlite').Database>} Instancia de la conexión de la base de datos.
 */
export async function getDb() {
  if (!db) {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
  }
  return db;
}

export default getDb;
