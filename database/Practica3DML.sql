INSERT INTO Tipo (nombre) VALUES('Derecha');
INSERT INTO Tipo (nombre) VALUES('Izquierda');
INSERT INTO Tipo (nombre) VALUES('Arriba');
INSERT INTO Tipo (nombre) VALUES('Abajo');

SELECT * FROM Tipo;

SELECT * FROM Movimiento;

INSERT INTO Juego (jugador) VALUES('Luis');

SELECT * FROM Juego;

INSERT INTO Movimiento (juego_Juego, tipo_Tipo) VALUES(1, 1);

SELECT * FROM Movimiento
WHERE juego_Juego = 1;

