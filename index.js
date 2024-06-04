require('dotenv').config();
const Server = require('./src/modelos/server');
const initDataBase = require('./src/configuracion/db-config');
const server = new Server();

server.listen();
initDataBase();

