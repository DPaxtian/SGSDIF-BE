const { Router } = require('express');
const { registrarSolicitud } = require("../controladores/solicitudes-controlador")
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Solicitudes
 */

/**
 * @swagger
 * /api/v1/solicitudes/registrarSolicitud:
 *   post:
 *     summary: Registrar una nueva solicitud
 *     description: Registra una nueva solicitud con los datos proporcionados
 *     tags:
 *      - Solicitudes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               no:
 *                 type: Number
 *               fecha_captura:
 *                 type: Date
 *               nombre:
 *                 type: string
 *               apellido_paterno:
 *                 type: string
 *               apellido_materno:
 *                 type: string
 *               curp: 
 *                 type: string
 *               direccion:
 *                 type: string
 *               colonia:
 *                 type: string
 *               cp:
 *                 type: string
 *               telefono:
 *                 type: string
 *               apoyo_solicitado:
 *                 type: string
 *               observaciones:
 *                 type: string
 *             example:
 *               no: 1
 *               fecha_captura: 2024-03-17
 *               nombre: John
 *               apellido_paterno: Doe
 *               apellido_materno: Doe
 *               curp: GOMC960630MOCRRS07
 *               direccion: Avenida Xalapa
 *               colonia: Empleados Municipales
 *               cp: 91020
 *               telefono: 9848073000
 *               apoyo_solicitado: Laminas
 *               observaciones: Es muy pobre
 *     responses:
 *       201:
 *         description: Solicitud creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: Number
 *                 msg:
 *                   type: string
 *             example:
 *               code: 201
 *               nombre: Solicitud creada con éxito :)
 *       400:
 *         description: Datos faltantes o incorrectos enviados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: Number
 *                 msg:
 *                   type: string
 *             example:
 *               code: 400
 *               nombre: Información incompleta o erronea, por favor verifiquela
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: Number
 *                 msg:
 *                   type: string
 *             example:
 *               code: 500
 *               nombre: Solicitud no creada :)
 */
router.post("/registrarSolicitud", registrarSolicitud)

module.exports = router;