import { Request, Response } from 'express';
import pool from '../database';

var colaJuegos: any[] = [];
const IP: any = 'http://localhost:8080';
var estadoJuego: any = false;

class ApiController {

    public async newJuego(req: Request, res: Response) {
        await pool.query(`INSERT INTO Juego (jugador) VALUES(?)`, [req.body.jugador]);
        let juego = await pool.query(`SELECT juego from Juego ORDER BY juego desc LIMIT 1`);
        let juegoActual = juego[0].juego;
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
        let juegos = await pool.query(`SELECT * from Juego`);
        res.json(juegos);
    }

    public async dataJuegoOne(req: Request, res: Response) {
        const { id } = req.params;
        const data = await pool.query(`SELECT * from Juego WHERE juego = ?`, [id]);
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
            punteo = ?
            WHERE juego = ?`, [req.body.tiempo, req.body.punteo, req.body.juego]);
        estadoJuego = false;
        res.json({ estado: true });
    }

    public async getCola(req: Request, res: Response) {
        res.json(colaJuegos);
    }

}
export const apiController = new ApiController();