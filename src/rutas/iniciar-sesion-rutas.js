const { Router } = require('express');
const { iniciarSesion } = require('../controladores/usuarios-controlador')
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 */

/**
 * @swagger
 * /api/v1/login/iniciar_sesion:
 *   post:
 *     summary: Inicio de sesion
 *     description: Inicio de sesion proporcionando el nombre de usuario y la contraseña
 *     tags:
 *      - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *               contrasena:
 *                 type: string
 *             example:
 *               nombre_usuario: "dpaxtian"
 *               contrasena: "Daniel98"
 *     responses:
 *       201:
 *         description: Inicio de sesion exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: string
 *             example:
 *               code: 201
 *               msg: "Inicio de sesion exitoso :)"
 *               data: "token_acceso"
 *       400:
 *         description: Datos faltantes o incorrectos enviados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 msg:
 *                   type: string
 *                 data: 
 *                   type: string
 *             example:
 *               code: 400
 *               msg: "Información incompleta o erronea, por favor verifiquela"
 *               data: null
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: string
 *             example:
 *               code: 500
 *               msg: "Solicitud no creada :)"
 *               data: null
 */
router.post('/iniciar_sesion', iniciarSesion)

module.exports = router