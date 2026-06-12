-- Tabla de Mundiales (Ediciones de la Copa del Mundo)
CREATE TABLE IF NOT EXISTS mundiales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  year INTEGER NOT NULL UNIQUE,
  host TEXT NOT NULL,
  champion TEXT NOT NULL,
  runner_up TEXT NOT NULL,
  third_place TEXT,
  teams_count INTEGER,
  matches_count INTEGER,
  goals_scored INTEGER
);

-- Tabla de Selecciones Nacionales (opcional pero recomendada para normalización)
CREATE TABLE IF NOT EXISTS selecciones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE, -- Código FIFA (e.g. ARG, BRA, GER)
  confederation TEXT -- CAF, AFC, UEFA, CONCACAF, CONMEBOL, OFC
);

-- Insertar datos semilla (seed data) iniciales para pruebas
INSERT OR IGNORE INTO selecciones (name, code, confederation) VALUES
('Argentina', 'ARG', 'CONMEBOL'),
('Brasil', 'BRA', 'CONMEBOL'),
('Alemania', 'GER', 'UEFA'),
('Francia', 'FRA', 'UEFA'),
('Uruguay', 'URU', 'CONMEBOL'),
('Italia', 'ITA', 'UEFA'),
('España', 'ESP', 'UEFA'),
('Inglaterra', 'ENG', 'UEFA');

INSERT OR IGNORE INTO mundiales (year, host, champion, runner_up, third_place, teams_count, matches_count, goals_scored) VALUES
(1930, 'Uruguay', 'Uruguay', 'Argentina', 'Estados Unidos', 13, 18, 70),
(1934, 'Italia', 'Italia', 'Checoslovaquia', 'Alemania', 16, 17, 70),
(1938, 'Francia', 'Italia', 'Hungría', 'Brasil', 15, 18, 84),
(1950, 'Brasil', 'Uruguay', 'Brasil', 'Suecia', 13, 22, 88),
(1954, 'Suiza', 'Alemania Federal', 'Hungría', 'Austria', 16, 26, 140),
(1958, 'Suecia', 'Brasil', 'Suecia', 'Francia', 16, 35, 126),
(2018, 'Rusia', 'Francia', 'Croacia', 'Bélgica', 32, 64, 169),
(2022, 'Catar', 'Argentina', 'Francia', 'Croacia', 32, 64, 172);
