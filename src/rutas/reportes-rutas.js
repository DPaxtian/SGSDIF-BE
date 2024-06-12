const { Router } = require('express');
const {generarReporteSolicitudes} = require('../controladores/reportes-controlador')
const router = Router();


/**
 * @swagger
 * tags:
 *   name: Reportes
 */

/**
 * @swagger
 * /api/v1/reportes/generar_reporte_solicitudes:
 *   post:
 *     summary: Generar reporte de solicitudes
 *     produces:
 *      - application/pdf
 *     description: Genera un reporte de solicitudes basado en los parámetros proporcionados
 *     tags:
 *      - Reportes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo_reporte:
 *                 type: string
 *                 description: Tipo de reporte a generar
 *                 example: "1"
 *               tipo_apoyo:
 *                 type: string
 *                 description: Tipo de apoyo
 *                 example: "Todos"
 *               periodo:
 *                 type: object
 *                 properties:
 *                   fecha1:
 *                     type: string
 *                     format: date
 *                     description: Fecha de inicio del periodo
 *                     example: "2024-01-01"
 *                   fecha2:
 *                     type: string
 *                     format: date
 *                     description: Fecha de fin del periodo
 *                     example: "2024-12-31"
 *               colonia:
 *                 type: string
 *                 description: ID de la colonia
 *                 example: "6653d999992122cbfd84a638"
 *               curp:
 *                 type: string
 *                 description: CURP del solicitante
 *                 example: "GOMC960630MOCRRS07"
 *     responses:
 *       200:
 *         description: El reporte se generó exitosamente y se envió como archivo PDF.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: file
 *       500:
 *         description: Error interno del servidor
 */
router.post('/generar_reporte_solicitudes', generarReporteSolicitudes)

module.exports = router;