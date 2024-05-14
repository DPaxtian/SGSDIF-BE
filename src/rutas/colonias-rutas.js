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
 *               clave:
 *                 type: string
 *               nombre_colonia:
 *                 type: string
 *               cp:
 *                 type: string
 *               grado_marginacion:
 *                 type: string
 *               clasificacion:
 *                 type: string
 *               habitantes:
 *                 type: number
 *               viviendas_habitadas:
 *                 type: number
 *               familias:
 *                 type: number
 *               tipo:
 *                 type: string
 *             example:
 *               clave: 029A
 *               nombre_colonia: Revolucion
 *               cp: XXXXX
 *               grado_marginacion: Muy alto
 *               clasificacion: COLONIA
 *               habitantes: 34098
 *               viviendas_habitadas: 1
 *               familias: 1
 *               tipo: AGEB URBANA
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
 *               clave:
 *                 type: string
 *               nombre_colonia:
 *                 type: string
 *               cp:
 *                 type: string
 *               grado_marginacion:
 *                 type: string
 *               clasificacion:
 *                 type: string
 *               habitantes:
 *                 type: number
 *               viviendas_habitadas:
 *                 type: number
 *               familias:
 *                 type: number
 *               tipo:
 *                 type: string
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