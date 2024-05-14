const { Router } = require('express');
const { registrarUsuario, iniciarSesion } = require('../controladores/usuarios-controlador')
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 */

/**
 * @swagger
 * /api/v1/usuarios/registrar_usuario:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Registra un nuevo usuario con los datos proporcionados
 *     tags:
 *      - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido_paterno:
 *                 type: string
 *               apellido_materno:
 *                 type: string
 *               correo_electronico: 
 *                 type: string
 *               rol:
 *                 type: string
 *               nombre_usuario:
 *                 type: string
 *               contrasena: 
 *                 type: string
 *             example:
 *               nombre: "John"
 *               apellido_paterno: "Doe"
 *               apellido_materno: "Doe"
 *               correo_electronico: "john_doe@email.com"
 *               rol: "Administrador"
 *               nombre_usuario: "admin"
 *               contrasena: "Administrador"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
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
 *               msg: "Usuario registrado con éxito :)"
 *               data: "id_usuario"
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
router.post('/registrar_usuario', registrarUsuario)

module.exports = router