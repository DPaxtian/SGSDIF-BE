const { Router } = require('express');
const { crearApoyo, buscarApoyosPorTipo } = require("../controladores/catalogo-apoyos-controlador")
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Catalogo Apoyos
 */

/**
 * @swagger
 * /api/v1/catalogo_apoyos/crear_apoyo:
 *   post:
 *     summary: Crea un nuevo apoyo en el catalogo
 *     description: Registra un nuevo apoyo con los datos proporcionados
 *     tags:
 *      - Catalogo Apoyos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identificador:
 *                  type: string
 *               nombre:
 *                  type: string
 *               tipo:
 *                  type: string
 *                  enum: [Municipal, Estatal]
 *               cantidad:
 *                  type: number
 *               descripcion:
 *                  type: string
 *             example:
 *               identificador: "L1"
 *               nombre: "Laminas"
 *               tipo: "Municipal"
 *               cantidad: 5
 *               descripcion: "Laminas de metal de 2x1 m."
 *     responses:
 *       201:
 *         description: Apoyo creado exitosamente
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
 *               msg: "Apoyo creado con éxito :)"
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
 *               msg: "Apoyo no creado :("
 */
router.post("/crear_apoyo", crearApoyo)
/**
 * @swagger
 * /api/v1/catalogo_apoyos/buscar_apoyo/{tipo_apoyo}:
 *   get:
 *     summary: Buscar apoyos por tipo
 *     description: Busca apoyos por el tipo especificado
 *     tags:
 *       - Catalogo Apoyos
 *     parameters:
 *       - in: path
 *         name: tipo_apoyo
 *         description: Tipo de apoyo a buscar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Apoyos encontrados exitosamente
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
 *               msg: "Apoyos de tipo tipo_apoyo encontrados"
 *               data: [
 *                      {
 *                      _id: "661c6e8257f25b8df4bbc154",
 *                      identificador: "L1",
 *                      nombre: "Laminas",
 *                      tipo: "Estatal",
 *                      cantidad: 5,
 *                      descripcion: "Laminas de metal de 2x1 m."
 *                      }
 *                     ]
 *       404:
 *         description: Apoyos no encontrados
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
 *               msg: "No se han encontrado apoyos"
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
router.get("/buscar_apoyo/:tipo_apoyo", buscarApoyosPorTipo)

module.exports = router;