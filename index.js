import app from './app.js';

const PORT = process.env.PORT || 4321;

app.listen(PORT, () => {
  console.log(`Servidor de la API corriendo en http://localhost:${PORT}`);
});