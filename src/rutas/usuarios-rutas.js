const { Router } = require('express');
const { registrarUsuario, actualizarUsuario, eliminarUsuario, obtenerUsuarios } = require('../controladores/usuarios-controlador')
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
/**
 * @swagger
 * /api/v1/usuarios/actualizar_usuario/{id_usuario}:
 *   patch:
 *     summary: Actualiza los datos de un usuario
 *     description: Actualiza los datos de un usuario ya registrado
 *     tags:
 *      - Usuarios
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         description: Id del usuario a eliminar
 *         required: true
 *         schema:
 *           type: string
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
 *               contrasena: "Administrador1"
 *     responses:
 *       201:
 *         description: Usuario actualizado exitosamente
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
 *               msg: "Usuario actualizado con éxito :)"
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
 *       404:
 *          description: Usuario no encontrado
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      propierties:
 *                          code:
 *                              type: integer
 *                          msg:
 *                              type: string
 *                          data:
 *                              type: string
 *                  example:
 *                      code: 404
 *                      msg: "No se han encontrado al usuario"
 *                      data: null
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
router.patch('/actualizar_usuario/:id_usuario', actualizarUsuario)
/**
 * @swagger
 * /api/v1/usuarios/eliminar_usuario/{id_usuario}:
 *   delete:
 *     summary: Elimina un usuario
 *     description: Elimina un usuario de la base de datos
 *     tags:
 *      - Usuarios
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         description: Id del usuario a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Usuario eliminado exitosamente
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
 *               msg: "Usuario eliminado con éxito :)"
 *       404:
 *          description: Usuario no encontrado
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      propierties:
 *                          code:
 *                              type: integer
 *                          msg:
 *                              type: string
 *                          data:
 *                              type: string
 *                  example:
 *                      code: 404
 *                      msg: "No se han encontrado al usuario"
 *                      data: null
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
router.delete('/eliminar_usuario/:id_usuario', eliminarUsuario )
/**
 * @swagger
 * /api/v1/usuarios/obtener_usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios registrados
 *     description: Obtiene todos los usuarios registrados en la base de datos
 *     tags:
 *      - Usuarios
 *     responses:
 *       201:
 *         description: Usuarios obtenidos exitosamente
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
 *                   type: array
 *             example:
 *               code: 201
 *               msg: "Usuario registrado con éxito :)"
 *               data: []
 *       404:
 *         description: No se han encontrado usuarios
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
 *               code: 404
 *               msg: "No se han encontrado usuarios"
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
router.get('/obtener_usuarios', obtenerUsuarios)

module.exports = router