const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const opciones = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SGSDIF-BE',
      version: '1.0.0',
      description: 'API para el sistema SGSDIF',
    },
  },
  apis: ['src/rutas/solicitudes-rutas.js', 'src/rutas/catalogo-apoyos-rutas.js', 'src/rutas/colonias-rutas.js']
};

const especificaciones = swaggerJsdoc(opciones);

module.exports = {
  swaggerUi,
  especificaciones
};
