"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiController_1 = require("../controllers/apiController");
class ApiRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/newJuego', apiController_1.apiController.newJuego);
        this.router.post('/newMovimiento', apiController_1.apiController.newMovimiento);
        this.router.get('/dataJuegos', apiController_1.apiController.dataJuegos);
        this.router.get('/dataMovimientos', apiController_1.apiController.dataMovimientos);
        this.router.get('/getJuego', apiController_1.apiController.getJuego);
        this.router.post('/finJuego', apiController_1.apiController.finJuego);
    }
}
const apiRoutes = new ApiRoutes();
exports.default = apiRoutes.router;
