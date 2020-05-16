CREATE DATABASE juego;
use juego;

-- object: Juego | type: TABLE --
-- DROP TABLE IF EXISTS Juego CASCADE;
CREATE TABLE Juego(
	juego INTEGER AUTO_INCREMENT NOT NULL,
	jugador varchar(20),
	tiempo integer,
	punteo integer,
	CONSTRAINT Juego_pk PRIMARY KEY (juego)

);

-- object: Movimiento | type: TABLE --
-- DROP TABLE IF EXISTS Movimiento CASCADE;
CREATE TABLE Movimiento(
	Movimiento INTEGER AUTO_INCREMENT NOT NULL,
	juego_Juego integer,
	tipo_Tipo integer,
	CONSTRAINT Movimiento_pk PRIMARY KEY (Movimiento)

);

-- object: Tipo | type: TABLE --
-- DROP TABLE IF EXISTS Tipo CASCADE;
CREATE TABLE Tipo(
	tipo INTEGER AUTO_INCREMENT NOT NULL,
	nombre varchar(20),
	CONSTRAINT Tipo_pk PRIMARY KEY (tipo)

);

-- object: Juego_fk | type: CONSTRAINT --
-- ALTER TABLE Movimiento DROP CONSTRAINT IF EXISTS Juego_fk CASCADE;
ALTER TABLE Movimiento ADD CONSTRAINT Juego_fk FOREIGN KEY (juego_Juego)
REFERENCES Juego (juego);
-- ddl-end --

-- object: Tipo_fk | type: CONSTRAINT --
-- ALTER TABLE Movimiento DROP CONSTRAINT IF EXISTS Tipo_fk CASCADE;
ALTER TABLE Movimiento ADD CONSTRAINT Tipo_fk FOREIGN KEY (tipo_Tipo)
REFERENCES Tipo (tipo);
-- ddl-end --


