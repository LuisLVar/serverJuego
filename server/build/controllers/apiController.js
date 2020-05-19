"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
var colaJuegos = [];
const IP = 'http://localhost:8080';
var estadoJuego = 0;
class ApiController {
    newJuego(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var dia = d.getDate();
            var hour = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            var fecha = year + "-" + month + "-" + dia + " " + hour + ":" + minutes + ":" + seconds;
            yield database_1.default.query(`INSERT INTO Juego (jugador, fecha) VALUES(?, ?)`, [req.body.jugador, fecha]);
            let juego = yield database_1.default.query(`SELECT juego from Juego ORDER BY juego desc LIMIT 1`);
            let juegoActual = juego[0].juego;
            const axios = require('axios');
            axios.post(IP + "/reiniciar", {
                juego: juegoActual
            })
                .then((resp) => {
                console.log(`statusCode: ${res.statusCode}`);
                //console.log(resp)
            })
                .catch((error) => {
                console.error(error);
            });
            colaJuegos.push({ juego: juegoActual });
            estadoJuego = 1;
            res.json({ juego: juegoActual });
        });
    }
    newMovimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`INSERT INTO Movimiento (juego_Juego, tipo_Tipo) VALUES(?, ?)`, [req.body.juego, req.body.tipo]);
            const axios = require('axios');
            axios.post(IP + "/moverse", {
                juego: req.body.juego,
                direccion: req.body.tipo
            })
                .then((resp) => {
                console.log(`statusCode: ${res.statusCode}`);
                //console.log(resp)
            })
                .catch((error) => {
                console.error(error);
            });
            res.json({ estado: estadoJuego });
        });
    }
    dataJuegos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let juegos = yield database_1.default.query(`SELECT juego, jugador, tiempo, enemigos, enemigos1, enemigos2, enemigos3, movArriba,
        movAbajo, movDer, movIzq, punteo, date_format(fecha, '%d-%m-%Y %H:%i:%s') as fecha,
         date_format(fecha, '%d-%m-%Y') as fecha2 FROM Juego`);
            res.json(juegos);
        });
    }
    dataJuegoOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield database_1.default.query(`SELECT juego, jugador, tiempo, enemigos, enemigos1, enemigos2, enemigos3, movArriba,
        movAbajo, movDer, movIzq, punteo, date_format(fecha, '%d-%m-%Y %H:%i:%s') as fecha,
         date_format(fecha, '%d-%m-%Y') as fecha2 FROM Juego WHERE juego = ?`, [id]);
            res.json(data);
        });
    }
    dataMovimientos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let movimientos = yield database_1.default.query(`SELECT * from Movimiento`);
            res.json(movimientos);
        });
    }
    getJuego(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(colaJuegos.shift());
        });
    }
    finJuego(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`UPDATE Juego SET
            tiempo = ?,
            punteo = ?,
            enemigos = ?,
            enemigos1 = ?,
            enemigos2 = ?,
            enemigos3 = ?,
            movArriba = ?,
            movAbajo = ?,
            movDer = ?,
            movIzq = ?
            WHERE juego = ?`, [req.body.tiempo, req.body.punteo, req.body.juego, req.body.enemigos,]);
            estadoJuego = 0;
            res.json({ estado: true });
        });
    }
    getCola(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(colaJuegos);
        });
    }
}
exports.apiController = new ApiController();
