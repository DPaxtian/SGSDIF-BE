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
 * /api/v1/solicitudes/registrar_solicitud:
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
 *                 type: integer
 *               fecha_captura:
 *                 type: string
 *                 format: date
 *               nombre:
 *                 type: string
 *               apellido_paterno:
 *                 type: string
 *               apellido_materno:
 *                 type: string
 *               curp: 
 *                 type: string
 *               direccion:
 *                 type: object
 *                 properties:
 *                   calle:
 *                     type: string
 *                   colonia:
 *                     type: string
 *                   estado:
 *                     type: string
 *                   municipio:
 *                     type: string
 *                   no_exterior:
 *                     type: string
 *                   no_interior:
 *                     type: string
 *                   cp:
 *                     type: string
 *               telefonos:
 *                 type: array
 *                 items:
 *                   type: string
 *               apoyo_solicitado:
 *                 type: string
 *               observaciones:
 *                 type: string
 *             example:
 *               no: 1
 *               fecha_captura: "2024-03-17"
 *               nombre: "John"
 *               apellido_paterno: "Doe"
 *               apellido_materno: "Doe"
 *               curp: "GOMC960630MOCRRS07"
 *               direccion:
 *                 calle: "Avenida Xalapa"
 *                 colonia: "Empleados Municipales"
 *                 estado: "Veracruz"
 *                 municipio: "Xalapa"
 *                 no_exterior: "17a"
 *                 no_interior: "4"
 *                 cp: "91020"
 *               telefono:
 *                 - "9848073000"
 *               apoyo_solicitado: "Laminas"
 *               observaciones: "Es muy pobre"
 *     responses:
 *       201:
 *         description: Solicitud creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 msg:
 *                   type: string
 *             example:
 *               code: 201
 *               msg: "Solicitud creada con éxito :)"
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
 *             example:
 *               code: 400
 *               msg: "Información incompleta o erronea, por favor verifiquela"
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
 *             example:
 *               code: 500
 *               msg: "Solicitud no creada :)"
 */
router.post("/registrar_solicitud", registrarSolicitud)

module.exports = router;