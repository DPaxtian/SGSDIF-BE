const express = require("express")
const cors = require('cors');
const { swaggerUi, especificaciones } = require('../configuracion/configuracion-swagger');
const validarToken = require('../middleware/autorizar_token')
const multer = require('multer')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.upload = multer({dest: 'uploads/'});
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
        this.app.use('/api/v1/solicitudes', validarToken, require('../rutas/solicitudes-rutas'));
        this.app.use('/api/v1/catalogo_apoyos', validarToken, require('../rutas/catalogo-apoyos-rutas'));
        this.app.use('/api/v1/colonias', validarToken, require('../rutas/colonias-rutas'));
        this.app.use('/api/v1/usuarios', validarToken, require('../rutas/usuarios-rutas'));
        this.app.use('/api/v1/entregas_apoyos', validarToken, require('../rutas/entrega-apoyo-rutas'));
        this.app.use('/api/v1/login', require('../rutas/iniciar-sesion-rutas'));
        this.app.use('/api/v1/reportes', validarToken, require('../rutas/reportes-rutas'))
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