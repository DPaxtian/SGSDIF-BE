const { Router } = require('express');
const { crearColonia, obtenerColonias } = require("../controladores/colonias-controlador")
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Colonias
 */

/**
 * @swagger
 * /api/v1/colonias/registrar_colonia:
 *   post:
 *     summary: Registrar una nueva colonia
 *     description: Registra una nueva colonia con los datos proporcionados
 *     tags:
 *      - Colonias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_colonia:
 *                 type: string
 *               nivel_marginacion:
 *                 type: string
 *               codigo_postal:
 *                 type: string
 *             example:
 *               nombre_colonia: Revolucion
 *               nivel_marginacion: Muy alto
 *               codigo_postal: XXXXX
 *     responses:
 *       201:
 *         description: Colonia creada exitosamente
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
 *               msg: "Colonia creada con éxito :)"
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
router.post("/registrar_colonia", crearColonia)
/**
 * @swagger
 * /api/v1/colonias/obtener_colonias:
 *   get:
 *     summary: Obtiene todas las colonias
 *     description: Obtiene todas las colonias de la base de datos
 *     tags:
 *       - Colonias
 *     responses:
 *       200:
 *         description: Colonias encontradas exitosamente
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
 *               msg: "Colonias encontradas correctamente"
 *               data: [
 *                      {
 *                      _id: "661c6e8257f25b8df4bbc154",
 *                      nombre_colonia: "REVOLUCION",
 *                      nivel_marginacion: "MUY ALTO",
 *                      codigo_postal: "XXXXX"
 *                      }
 *                     ]
 *       404:
 *         description: Colonias no encontradas
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
 *               code: 404
 *               msg: "No se han encontrado colonias"
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
 *               msg: "Ocurrio un error :("
 */
router.get("/obtener_colonias", obtenerColonias)

module.exports = router;