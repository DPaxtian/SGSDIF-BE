const CodigosEstado = require("../utileria/codigos-estado")
const Logger = require("../configuracion/logger")
const { HttpError, BadRequestError, NotFoundError } = require("../utileria/excepciones")
const ReporteUtileria = require("../utileria/crear-reporte")
const fs = require('fs')

const fs = require('fs');
const path = require('path');
const CodigosEstado = require('./path/to/CodigosEstado'); // Asegúrate de ajustar la ruta correcta
const ReporteUtileria = require('./path/to/ReporteUtileria'); // Asegúrate de ajustar la ruta correcta

async function generarReporteSolicitudes(req, res) {
    let codigoResultado = CodigosEstado.INTERNAL_SERVER_ERROR;
    let mensajeRespuesta = "Ocurrió un error :(";

    try {
        const reporte_parametros = req.body;
        let pdfPath = "";
        let nombreArchivo = "reporte.pdf"; // Puedes ajustar esto según el tipo de reporte

        // 1 o 2: Reporte de solicitudes
        // 3 o 4: Reporte de apoyos
        if (reporte_parametros.tipo_reporte === "1" || reporte_parametros.tipo_reporte === "2") {
            pdfPath = await ReporteUtileria.generarReportePDF(reporte_parametros);
            codigoResultado = CodigosEstado.OK;
            mensajeRespuesta = "Reporte generado exitosamente";
        } else if (reporte_parametros.tipo_reporte === "3" || reporte_parametros.tipo_reporte === "4") {
            // Implementar lógica para generar reporte de apoyos si es necesario
        }

        res.setHeader('Content-Disposition', `attachment; filename="${nombreArchivo}"`);
        res.setHeader('Content-Type', 'application/pdf');
        
        return res.status(codigoResultado).sendFile(pdfPath, err => {
            if (err) {
                console.error('Error enviando el archivo:', err);
                return res.status(CodigosEstado.INTERNAL_SERVER_ERROR).json({
                    code: CodigosEstado.INTERNAL_SERVER_ERROR,
                    msg: 'Error enviando el archivo'
                });
            }

            // Eliminar el archivo PDF después de enviarlo
            fs.unlinkSync(pdfPath);
        });
    } catch (error) {
        let exceptionMessage = "Ha ocurrido un error interno";
        let exceptionCode = CodigosEstado.INTERNAL_SERVER_ERROR;

        if (error instanceof HttpError) {
            exceptionCode = error.codigoEstado;
            exceptionMessage = error.message;
        } else {
            console.error(`Error generando el reporte: ${error}`);
        }

        return res.status(exceptionCode).json({
            code: exceptionCode,
            msg: exceptionMessage
        });
    }
}

module.exports = { generarReporteSolicitudes };





module.exports = {
    generarReporteSolicitudes
}