require('dotenv').config();
const Server = require('./src/modelos/server');
const initDataBase = require('./src/configuracion/db-config');
const ActualizacionToken = require('./src/configuracion/actualizar-token-google')
const server = new Server();

server.listen();
initDataBase();
//ActualizacionToken.verificarExpiracionToken();
