import { Router } from 'express';
import { apiController } from '../controllers/apiController';
import pool from '../database';

class ApiRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void {
        this.router.get('/newJuego', apiController.newJuego);
        this.router.get('/newMovimiento', apiController.newMovimiento);
        this.router.get('/dataJuegos', apiController.dataJuegos);
        this.router.get('/dataMovimientos', apiController.dataMovimientos);
        this.router.get('/getJuego', apiController.getJuego);
        this.router.get('/finJuego', apiController.finJuego);
    }

}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;