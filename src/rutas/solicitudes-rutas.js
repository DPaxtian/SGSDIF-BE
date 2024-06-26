const { Router } = require('express');
const { registrarSolicitud, obtenerSolicitudes, actualizarSolicitud, subirArchivoSolicitud, obtenerSolicitudesPorCurp } = require("../controladores/solicitudes-controlador")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
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
 *               estado:
 *                  type: string
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
 *                     type: ObjectId
 *                   estado:
 *                     type: string
 *                   municipio:
 *                     type: string
 *                   no_exterior:
 *                     type: string
 *                   no_interior:
 *                     type: string
 *               telefonos:
 *                 type: array
 *                 items:
 *                   type: string
 *               apoyo_solicitado:
 *                 type: ObjectId
 *               observaciones:
 *                 type: string
 *             example:
 *               no: 1
 *               estado: "Solicitado"
 *               fecha_captura: "2024-03-17"
 *               nombre: "John"
 *               apellido_paterno: "Doe"
 *               apellido_materno: "Doe"
 *               curp: "GOMC960630MOCRRS07"
 *               direccion:
 *                 calle: "Avenida Xalapa"
 *                 colonia: "65fa28d3075b23c34b602e81"
 *                 estado: "Veracruz"
 *                 municipio: "Xalapa"
 *                 no_exterior: "17a"
 *                 no_interior: "4"
 *               telefonos:
 *                 - "9848073000"
 *               apoyo_solicitado: "65fa28d3075b23c34b602e81"
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
 *                 data:
 *                   type: string
 *             example:
 *               code: 201
 *               msg: "Solicitud creada con éxito :)"
 *               data: "id_solicitud"
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
/**
 * @swagger
 * /api/v1/solicitudes/obtener_solicitudes:
 *   get:
 *     summary: Obtiene las solicitudes registradas
 *     description: Obtiene todas las solicitudes registradas en la base de datos
 *     tags:
 *      - Solicitudes
 *     responses:
 *       201:
 *         description: Solicitudes obtenidas exitosamente
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
 *               msg: "Solicitudes obtenidas con éxito :)"
 *               data: [     
 *                          {
                            "direccion": {
                                "calle": "Valentin Gomez Farias",
                                "colonia": "65fa28d3075b23c34b602e81",
                                "ciudad": "Xalapa",
                                "estado": "Veracruz",
                                "municipio": "Xalapa",
                                "no_casa": "17a",
                            },
                            "_id": "65fa28d3075b23c34b602e81",
                            "no": 1,
                            "fecha_captura": "2024-03-17T00:00:00.000Z",
                            "nombre": "Daniel Eduardo",
                            "apellido_paterno": "Anota",
                            "apellido_materno": "Paxtian",
                            "curp": "AOPD980906HVZNXN05",
                            "telefonos": [
                                "8948073097",
                                "9848073099"
                            ],
                            "apoyo_solicitado": "65fa28d3075b23c34b602e81",
                            "observaciones": "Es muy pobre"
                            }
 *                     ]
 *       404:
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
 *                   type: array
 *             example:
 *               code: 404
 *               msg: "Información incompleta o erronea, por favor verifiquela"
 *               data: []
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
router.get("/obtener_solicitudes", obtenerSolicitudes)
/**
 * @swagger
 * /api/v1/solicitudes/actualizar_solicitud/{id_solicitud}:
 *   put:
 *     summary: Actualizar una solicitud
 *     description: Actualizad una solicitud con los datos proporcionados
 *     tags:
 *      - Solicitudes
 *     parameters:
 *       - in: path
 *         name: id_solicitud
 *         description: Id de la solicitud a actualizar
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
 *                     type: ObjectId
 *                   estado:
 *                     type: string
 *                   municipio:
 *                     type: string
 *                   no_exterior:
 *                     type: string
 *                   no_interior:
 *                     type: string
 *               telefonos:
 *                 type: array
 *                 items:
 *                   type: string
 *               apoyo_solicitado:
 *                 type: ObjectId
 *               observaciones:
 *                 type: string
 *               archivos:
 *                 type: array
 *                 items:
 *                  type: string
 *             example:
 *               no: 1
 *               fecha_captura: "2024-03-17"
 *               nombre: "John"
 *               apellido_paterno: "Doe"
 *               apellido_materno: "Doe"
 *               curp: "GOMC960630MOCRRS07"
 *               direccion:
 *                 calle: "Avenida Xalapa"
 *                 colonia: "65fa28d3075b23c34b602e81"
 *                 estado: "Veracruz"
 *                 municipio: "Xalapa"
 *                 no_exterior: "17a"
 *                 no_interior: "4"
 *               telefonos:
 *                 - "9848073000"
 *               apoyo_solicitado: "65fa28d3075b23c34b602e81"
 *               observaciones: "Es muy pobre"
 *               archivos:
 *                 - "adfasf3232ksadfa"
 *     responses:
 *       201:
 *         description: Solicitud actualizada exitosamente
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
 *               msg: "Solicitud actualizada con éxito :)"
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
router.put("/actualizar_solicitud/:id_solicitud", actualizarSolicitud)
/**
 * @swagger
 * /api/v1/solicitudes/obtener_solicitudes_curp/{curp}:
 *   get:
 *     summary: Obtiene las solicitudes registradas con el curp proporcionado
 *     description: Obtiene todas las solicitudes registradas con el curp proporcionado
 *     tags:
 *      - Solicitudes
 *     parameters:
 *      - in: path
 *        name: curp
 *        description: curp del solicitante
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       201:
 *         description: Solicitudes obtenidas exitosamente
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
 *               msg: "Solicitudes obtenidas con éxito :)"
 *               data: [     
 *                          {
                            "direccion": {
                                "calle": "Valentin Gomez Farias",
                                "colonia": "65fa28d3075b23c34b602e81",
                                "ciudad": "Xalapa",
                                "estado": "Veracruz",
                                "municipio": "Xalapa",
                                "no_casa": "17a",
                            },
                            "_id": "65fa28d3075b23c34b602e81",
                            "no": 1,
                            "fecha_captura": "2024-03-17T00:00:00.000Z",
                            "nombre": "Daniel Eduardo",
                            "apellido_paterno": "Anota",
                            "apellido_materno": "Paxtian",
                            "curp": "AOPD980906HVZNXN05",
                            "telefonos": [
                                "8948073097",
                                "9848073099"
                            ],
                            "apoyo_solicitado": "65fa28d3075b23c34b602e81",
                            "observaciones": "Es muy pobre"
                            }
 *                     ]
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
 *                   type: array
 *             example:
 *               code: 400
 *               msg: "Información incompleta o erronea, por favor verifiquela"
 *               data: []
 *       404:
 *          descripction: Solicitudes no encontradas
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          code:
 *                             type: integer
 *                          msg:
 *                             type: string
 *                          data:
 *                              type: array
 *                  example:
 *                      code: 404
 *                      msg: "No se han encontrado solicitudes con este curp"
 *                      data: []
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
router.get("/obtener_solicitudes_curp/:curp", obtenerSolicitudesPorCurp)
/**
 * @swagger
 * /api/v1/solicitudes/subir_archivo/{id_solicitud}:
 *   post:
 *     summary: Subir un archivo para una solicitud
 *     description: Permite subir un archivo asociado a una solicitud
 *     tags:
 *      - Solicitudes
 *     parameters:
 *       - in: path
 *         name: id_solicitud
 *         description: ID de la solicitud a la cual se asociará el archivo
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               archivo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Archivo subido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 msg:
 *                   type: string
 *                 archivo:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *       400:
 *         description: No se ha proporcionado ningún archivo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 msg:
 *                   type: string
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
 */
router.post("/subir_archivo/:id_solicitud", upload.single('archivo'), subirArchivoSolicitud);



module.exports = router;