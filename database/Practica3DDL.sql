CREATE DATABASE juego;
use juego;

-- object: Juego | type: TABLE --
-- DROP TABLE IF EXISTS Juego CASCADE;
CREATE TABLE Juego(
	juego INTEGER AUTO_INCREMENT NOT NULL,
	jugador varchar(20),
	tiempo integer,
	punteo integer,
    enemigos integer,
    enemigos1 integer,
    enemigos2 integer,
    enemigos3 integer,
    movArriba integer,
    movAbajo integer,
    movDer integer,
    movIzq integer,
    fecha timestamp,
	CONSTRAINT Juego_pk PRIMARY KEY (juego)
);

-- ALTER TABLE Juego ADD COLUMN movIzq integer after tiempo;
-- ALTER TABLE Juego ADD COLUMN movDer integer after tiempo;
-- ALTER TABLE Juego ADD COLUMN movAbajo integer after tiempo;
-- ALTER TABLE Juego ADD COLUMN movArriba integer after tiempo;
-- ALTER TABLE Juego ADD COLUMN enemigos integer after tiempo;
-- ALTER TABLE Juego ADD COLUMN enemigos1 integer after enemigos;
-- ALTER TABLE Juego ADD COLUMN enemigos2 integer after enemigos;
-- ALTER TABLE Juego ADD COLUMN enemigos3 integer after enemigos;
-- ALTER TABLE Juego add COLUMN fecha timestamp after movIzq;

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

-- DROP DATABASE juego;
-- 