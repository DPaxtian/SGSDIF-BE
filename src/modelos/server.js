const express = require("express")
const cors = require('cors');
const { swaggerUi, especificaciones } = require('../configuracion/configuracion-swagger');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();
        this.setupSwagger();
    }


    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }


    routes() {
        this.app.use('/api/v1/solicitudes', require('../rutas/solicitudes-rutas'));
    }

    
    setupSwagger() {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(especificaciones));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto: ${this.port}`)
        })
    }
}
module.exports = Server;