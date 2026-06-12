# 🏆 API de Mundiales de la FIFA

Una API RESTful moderna y robusta construida con **Node.js**, **Express** y **SQLite** para consultar información detallada sobre las distintas ediciones de la Copa Mundial de la FIFA.

## 📋 Características

- **Base de datos SQLite**: Almacenamiento local ligero e inicialización con un script integrado.
- **Módulos de ES (ESM)**: Uso de sintaxis moderna de JavaScript (`import`/`export`).
- **Arquitectura limpia**: Separación de responsabilidades en Modelos, Controladores, Rutas, Esquemas y Middlewares.
- **Validación integrada**: Validaciones de esquemas en tiempo de ejecución utilizando **Zod**.
- **Servicio de archivos estáticos**: Despliegue de imágenes locales para cada edición mundialista.
- **Manejo centralizado de errores**: Respuestas y códigos HTTP estandarizados (e.g. errores 404 controlados).

---

## 🛠️ Instalación y Configuración

Sigue estos pasos para clonar el repositorio e instalar las dependencias:

### 1. Clonar el repositorio
```bash
git clone https://github.com/felizondogranados-bot/api-mundiales-fifa.git
cd api-mundiales-fifa
```

### 2. Instalar dependencias
Instala los paquetes necesarios (`express`, `sqlite`, `sqlite3`, `zod`):
```bash
npm install
```

---

## 🗄️ Base de Datos e Inicialización

El proyecto incluye un script de inicialización para crear la base de datos local y cargarla con datos semilla iniciales de las últimas 6 copas mundiales (desde Corea/Japón 2002 hasta Catar 2022).

Para crear y poblar la base de datos `mundiales.db`, ejecuta:
```bash
npm run init-db
```
*Este comando leerá el esquema SQL en `src/database/schema.sql` y creará el archivo binario local de SQLite en `src/database/mundiales.db`.*

---

## 🚀 Servidor de Desarrollo

Inicia la aplicación Express en tu entorno local (por defecto en el puerto `3000`):
```bash
npm run dev
```
El servidor estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 📂 Estructura del Proyecto

El código está organizado siguiendo un diseño modular y limpio:

```text
api-mundiales-fifa/
├── public/                 # Archivos estáticos
│   └── imagenes/           # Imágenes de las ediciones de los mundiales (e.g. qatar-2022.avif)
├── src/
│   ├── database/           # Configuración e inicialización de SQLite
│   │   ├── db.js           # Conexión Singleton a SQLite
│   │   ├── init.js         # Script ejecutable de inicialización
│   │   └── schema.sql      # Definición de tablas y datos semilla SQL
│   ├── models/             # Capa de acceso a datos (Modelos)
│   │   └── mundial.model.js
│   ├── controllers/        # Controladores de peticiones HTTP
│   │   └── mundiales.controller.js
│   ├── routes/             # Definición de endpoints y enrutadores
│   │   └── mundiales.routes.js
│   ├── schemas/            # Esquemas de validación con Zod
│   │   └── mundial.schema.js
│   └── middlewares/        # Middlewares (Validación y errores)
│       ├── validation.js   # Validador genérico de req.params
│       └── errors.js       # Manejo de rutas 404 y errores globales
├── app.js                  # Configuración de la aplicación Express
├── index.js                # Punto de entrada (Inicia el servidor HTTP)
├── package.json            # Script y dependencias del proyecto
└── README.md               # Documentación
```

---

## 🛣️ Rutas Disponibles

| Método | Endpoint | Parámetros | Descripción |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Ninguno | Estado de la API. |
| **GET** | `/mundiales` | `?include=full` *(Opcional)* | Obtiene todos los mundiales. Por defecto retorna un listado ligero. |
| **GET** | `/mundial/:slug` | `:slug` *(e.g. qatar-2022)* | Obtiene la información completa de un mundial por su slug único. |
| **GET** | `/campeon/:pais` | `:pais` *(e.g. argentina)* | Obtiene los mundiales ganados por un país específico (insensible a mayúsculas). |
| **GET** | `/random` | Ninguno | Retorna una edición mundialista seleccionada al azar. |
| **GET** | `/search/:text` | `:text` *(Min. 3 caracteres)* | Busca mundiales coincidentes en múltiples campos. |
| **GET** | `/imagenes/:archivo` | `:archivo` *(e.g. qatar-2022.avif)* | Sirve las imágenes estáticas de los mundiales. |

---

## 💻 Ejemplos de uso con `xh`

[xh](https://github.com/ducaale/xh) es una herramienta de terminal rápida y amigable para enviar solicitudes HTTP. Aquí tienes ejemplos prácticos para interactuar con la API:

### 1. Obtener listado ligero de mundiales
```bash
xh GET http://localhost:3000/mundiales
```

### 2. Obtener listado con información completa (`?include=full`)
```bash
xh GET http://localhost:3000/mundiales include==full
```

### 3. Obtener un mundial por su Slug
```bash
xh GET http://localhost:3000/mundial/qatar-2022
```

### 4. Obtener mundiales ganados por Alemania
```bash
xh GET http://localhost:3000/campeon/alemania
```

### 5. Obtener un mundial aleatorio
```bash
xh GET http://localhost:3000/random
```

### 6. Buscar mundiales que mencionen a "Iniesta" (Validación Exitosa)
```bash
xh GET http://localhost:3000/search/Iniesta
```

### 7. Buscar con texto demasiado corto (Falla de Validación - HTTP 400)
```bash
xh GET http://localhost:3000/search/ca
```
*Respuesta:*
```json
{
  "error": "El texto debe tener al menos 3 caracteres"
}
```

### 8. Solicitar una ruta inexistente (Error 404 - HTTP 404)
```bash
xh GET http://localhost:3000/rutainvalida
```
*Respuesta:*
```json
{
  "error": "No encontrado"
}
```

---

## 📸 Capturas de Pantalla Sugeridas

Al realizar pruebas, se recomienda adjuntar capturas de las siguientes interacciones:
1. **Listado de Mundiales**: Captura de pantalla de la petición `GET /mundiales` y `GET /mundiales?include=full` mostrando la diferencia de campos (ligero vs completo).
2. **Error de Validación de Búsqueda**: Respuesta `HTTP 400` al ingresar menos de 3 caracteres en `/search/:text`.
3. **Manejo de Errores 404**: Respuesta `HTTP 404` con `{ "error": "No encontrado" }` al acceder a una ruta inexistente o un slug inválido.
4. **Servicio Estático de Imágenes**: Petición de un archivo estático a `/imagenes/qatar-2022.avif` renderizándose correctamente en el cliente o navegador.
