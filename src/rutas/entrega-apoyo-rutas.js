const { Router } = require('express');
const { crearEntrega } = require("../controladores/entrega-apoyo-controlador")
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Entregas Apoyos
 */

/**
 * @swagger
 * /api/v1/entregas_apoyos/crear_entrega:
 *   post:
 *     summary: Crea una nueva entrega de apoyo
 *     description: Registra una nueva entrega con los datos proporcionados
 *     tags:
 *      - Entregas Apoyos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha_de_entrega:
 *                  type: string
 *                  format: date-time
 *               identificador_de_apoyo:
 *                  type: string
 *               cantidad:
 *                  type: number
 *               direccion:
 *                  type: string
 *               identificador_de_solicitud:
 *                  type: string
 *             example:
 *               fecha_de_entrega: "2024-06-10T10:30:00.000Z"
 *               identificador_de_apoyo: "L1"
 *               cantidad: 5
 *               direccion: "123 Calle Principal, Ciudad, Estado"
 *               identificador_de_solicitud: "S123"
 *     responses:
 *       201:
 *         description: Entrega creada exitosamente
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
 *               msg: "Entrega creada con éxito :)"
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
 *               msg: "Entrega no creada :("
 */
router.post("/crear_entrega", crearEntrega)

module.exports = router;
