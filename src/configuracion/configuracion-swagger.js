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
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'apiKey',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
          name: 'token_acceso' // Nombre del encabezado
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['src/rutas/solicitudes-rutas.js', 'src/rutas/catalogo-apoyos-rutas.js', 'src/rutas/colonias-rutas.js', 'src/rutas/usuarios-rutas.js', 'src/rutas/iniciar-sesion-rutas.js'],
};


const especificaciones = swaggerJsdoc(opciones);

module.exports = {
  swaggerUi,
  especificaciones
};
