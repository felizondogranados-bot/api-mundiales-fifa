-- Eliminar tablas existentes para recrear con la nueva estructura
DROP TABLE IF EXISTS mundiales;
DROP TABLE IF EXISTS selecciones;

-- Tabla de Mundiales
CREATE TABLE mundiales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  anio INTEGER NOT NULL UNIQUE,
  sede TEXT NOT NULL,
  campeon TEXT NOT NULL,
  subcampeon TEXT NOT NULL,
  goleador TEXT NOT NULL,
  equipos INTEGER NOT NULL,
  imagen TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  resumen TEXT NOT NULL,
  descripcion TEXT NOT NULL
);

-- Insertar los registros solicitados
INSERT INTO mundiales (nombre, anio, sede, campeon, subcampeon, goleador, equipos, imagen, slug, resumen, descripcion) VALUES
(
  'Copa Mundial de la FIFA Catar 2022',
  2022,
  'Catar',
  'Argentina',
  'Francia',
  'Kylian Mbappé',
  32,
  'qatar_2022.jpg',
  'qatar-2022',
  'La primera Copa del Mundo en territorio árabe, destacada por la coronación de Lionel Messi y Argentina en una final histórica.',
  'La Copa Mundial de la FIFA Catar 2022 se disputó del 20 de noviembre al 18 de diciembre de 2022. Argentina se proclamó campeona por tercera vez en su historia tras vencer a Francia en una emocionante tanda de penaltis (4-2) después de empatar 3-3 en la prórroga.'
),
(
  'Copa Mundial de la FIFA Rusia 2018',
  2018,
  'Rusia',
  'Francia',
  'Croacia',
  'Harry Kane',
  32,
  'rusia_2018.jpg',
  'rusia-2018',
  'Un torneo lleno de sorpresas donde Francia conquistó su segundo título mundial con un fútbol dinámico y contundente.',
  'La Copa Mundial de la FIFA Rusia 2018 se celebró del 14 de junio al 15 de julio de 2018. Francia obtuvo su segunda estrella mundialista al derrotar a una de las revelaciones del torneo, Croacia, por 4-2 en el tiempo regular.'
),
(
  'Copa Mundial de la FIFA Brasil 2014',
  2014,
  'Brasil',
  'Alemania',
  'Argentina',
  'James Rodríguez',
  32,
  'brasil_2014.jpg',
  'brasil-2014',
  'Recordado por el impactante 7-1 de Alemania a Brasil y la consagración alemana en el Estadio Maracaná.',
  'La Copa Mundial de la FIFA Brasil 2014 se desarrolló del 12 de junio al 13 de julio de 2014. Alemania se coronó campeona por cuarta vez al ganarle a Argentina 1-0 con un gol en tiempo extra de Mario Götze.'
),
(
  'Copa Mundial de la FIFA Sudáfrica 2010',
  2010,
  'Sudáfrica',
  'España',
  'Países Bajos',
  'Thomas Müller',
  32,
  'sudafrica_2010.jpg',
  'sudafrica-2010',
  'El primer mundial en el continente africano y la consagración histórica del estilo "tiki-taka" de la selección española.',
  'La Copa Mundial de la FIFA Sudáfrica 2010 tuvo lugar del 11 de junio al 11 de julio de 2010. España se unió al exclusivo club de campeones mundiales tras vencer en la final a Países Bajos por 1-0 con un agónico gol de Andrés Iniesta en el minuto 116.'
),
(
  'Copa Mundial de la FIFA Alemania 2006',
  2006,
  'Alemania',
  'Italia',
  'Francia',
  'Miroslav Klose',
  32,
  'alemania_2006.jpg',
  'alemania-2006',
  'Una final dramática marcada por el cabezazo de Zidane y la definición por penales donde Italia alzó su cuarta copa.',
  'La Copa Mundial de la FIFA Alemania 2006 se jugó del 9 de junio al 9 de julio de 2006. Italia superó a Francia en los penaltis (5-3) tras empatar 1-1 en el tiempo reglamentario, logrando su cuarto título mundial.'
),
(
  'Copa Mundial de la FIFA Corea/Japón 2002',
  2002,
  'Corea del Sur y Japón',
  'Brasil',
  'Alemania',
  'Ronaldo',
  32,
  'corea_japon_2002.jpg',
  'corea-japon-2002',
  'El primer mundial coorganizado por dos países y celebrado en Asia, dominado por el "Fenómeno" Ronaldo y la pentacampeona Brasil.',
  'La Copa Mundial de la FIFA Corea/Japón 2002 se celebró del 31 de mayo al 30 de junio de 2002. Brasil venció a Alemania por 2-0 en la final con dos goles de Ronaldo Nazário, consagrándose pentacampeón.'
);
