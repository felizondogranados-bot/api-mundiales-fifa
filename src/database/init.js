import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import getDb from './db.js';

// Obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDatabase() {
  try {
    console.log('Inicializando la base de datos SQLite...');
    
    // Obtener la conexión
    const db = await getDb();
    
    // Leer el archivo de esquema SQL
    const schemaPath = path.join(__dirname, 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');
    
    // Ejecutar todas las declaraciones SQL
    await db.exec(sql);
    
    console.log('¡Base de datos "mundiales.db" inicializada con éxito!');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    // Cerrar el proceso
    process.exit(0);
  }
}

initDatabase();
