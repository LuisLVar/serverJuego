import { Request, Response } from 'express';
import pool from '../database';

var colaJuegos: any[] = [];
const IP: any = 'http://localhost:8080';
var estadoJuego: any = false;

class ApiController {

    public async newJuego(req: Request, res: Response) {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var dia = d.getDate();
        var hour = d.getHours();
        var minutes = d.getMinutes();
        var seconds = d.getSeconds();

        var fecha = year + "-" + month + "-" + dia + " " + hour + ":" + minutes + ":" + seconds;
        await pool.query(`INSERT INTO Juego (jugador, fecha) VALUES(?, ?)`, [req.body.jugador, fecha]);
        let juego = await pool.query(`SELECT juego from Juego ORDER BY juego desc LIMIT 1`);
        let juegoActual = juego[0].juego;
        
        const axios = require('axios')
        axios.post(IP + "/reiniciar", {
            juego: juegoActual
        })
            .then((resp: any) => {
                console.log(`statusCode: ${res.statusCode}`)
                //console.log(resp)
            })
            .catch((error: any) => {
                console.error(error)
            });
        
        colaJuegos.push({ juego: juegoActual });
        estadoJuego = true;
        res.json({ juego: juegoActual });
    }

    public async newMovimiento(req: Request, res: Response) {
        await pool.query(`INSERT INTO Movimiento (juego_Juego, tipo_Tipo) VALUES(?, ?)`, [req.body.juego, req.body.tipo]);

        const axios = require('axios')
        axios.post(IP + "/moverse", {
            juego: req.body.juego,
            direccion: req.body.tipo
        })
            .then((resp: any) => {
                console.log(`statusCode: ${res.statusCode}`)
                //console.log(resp)
            })
            .catch((error: any) => {
                console.error(error)
            });
        res.json({ estado: estadoJuego });
    }

    public async dataJuegos(req: Request, res: Response) {
        let juegos = await pool.query(`SELECT juego, jugador, tiempo, enemigos, enemigos1, enemigos2, enemigos3, movArriba,
        movAbajo, movDer, movIzq, punteo, date_format(fecha, '%d-%m-%Y %H:%i:%s') as fecha,
         date_format(fecha, '%d-%m-%Y') as fecha2 FROM Juego`);
        res.json(juegos);
    }

    public async dataJuegoOne(req: Request, res: Response) {
        const { id } = req.params;
        const data = await pool.query(`SELECT juego, jugador, tiempo, enemigos, enemigos1, enemigos2, enemigos3, movArriba,
        movAbajo, movDer, movIzq, punteo, date_format(fecha, '%d-%m-%Y %H:%i:%s') as fecha,
         date_format(fecha, '%d-%m-%Y') as fecha2 FROM Juego WHERE juego = ?`, [id]);
        res.json(data);
    }

    public async dataMovimientos(req: Request, res: Response) {
        let movimientos = await pool.query(`SELECT * from Movimiento`);
        res.json(movimientos);
    }

    public async getJuego(req: Request, res: Response) {
        res.json(colaJuegos.shift());
    }

    public async finJuego(req: Request, res: Response) {
        await pool.query(`UPDATE Juego SET
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
            WHERE juego = ?`, [req.body.tiempo, req.body.punteo, req.body.juego, req.body.enemigos, ]);
        estadoJuego = false;
        res.json({ estado: true });
    }


    public async getCola(req: Request, res: Response) {
        res.json(colaJuegos);
    }

}
export const apiController = new ApiController();