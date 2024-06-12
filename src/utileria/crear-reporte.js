const puppeteer = require('puppeteer');
const fs = require('fs')
const path = require('path');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas')
const Logger = require("../configuracion/logger")
const ServicioApoyo = require('../servicios/catalogo-apoyos-servicios')
const ServicioSolicitudes = require('../servicios/solicitudes-servicios')
const ServicioColonia = require('../servicios/colonias_servicios')
const ReporteUtileria = require('../utileria/crear-reporte');
const { HttpError, BadRequestError, NotFoundError, InternalServerError } = require("../utileria/excepciones")

const tempDir = path.resolve(__dirname, '..', '..', 'temp');

async function generarGrafica(datos, idReporte, titulo) {
    const width = 500; // Ancho del gráfico
    const height = 500; // Alto del gráfico
    const backgroundColour = 'white'
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour });
    const labels = Object.keys(datos);
    const data = Object.values(datos);

    const configuration = {
        type: 'bar', // Tipo de gráfico
        data: {
            labels: labels,
            datasets: [{
                label: titulo,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
                hoverBorderColor: 'rgba(255, 99, 132, 1)',
                data: data,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            if (Number.isInteger(value)) {
                                return value;
                            }
                        }
                    }
                }
            }
        }
    };

    const image = await chartJSNodeCanvas.renderToBuffer(configuration);


    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }
    const imagePath = path.join(tempDir, `${idReporte}.png`);

    fs.writeFileSync(imagePath, image);
    return imagePath;
};



async function generarReportePDF(reporte_parametros) {
    try {
        let filename = "";
        let titulo_documento = "";
        let fecha_actual = new Date().toJSON().slice(0, 10);

        if (reporte_parametros.tipo_reporte === "1" || reporte_parametros.tipo_reporte === "2") {
            filename = `Reporte_Solicitudes_${fecha_actual}.pdf`;
            titulo_documento = "Reporte de Solicitudes de Apoyos";
        } else {
            filename = `Reporte_Apoyos_${fecha_actual}.pdf`;
            titulo_documento = "Reporte de Catalogo de Apoyos";
        }

        // Lee y convierte las imágenes a base64
        const logoPath = path.join(__dirname, '..', 'img', 'dif_logo.png');
        const headerImagePath = path.join(__dirname, '..', 'img', 'xalapa_logo.png');
        const logoBase64 = fs.readFileSync(logoPath, 'base64');
        const headerImageBase64 = fs.readFileSync(headerImagePath, 'base64');

        let htmlSections = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${titulo_documento}</title>
            <style>
              body { font-family: 'Courier'; }
              .header { display: flex; justify-content: space-between; align-items: center; }
              .title { text-align: center; margin-top: 20px; font-size: 18px; }
              .table { width: 100%; margin-top: 20px; border-collapse: collapse; }
              .table th, .table td { border: 1px solid #000; padding: 8px; text-align: left; font-size: 12px; }
              .table th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <div class="header">
              <img src="data:image/png;base64,${logoBase64}" width="50">
              <img src="data:image/png;base64,${headerImageBase64}" width="150">
            </div>
            <div class="title">${titulo_documento}</div>
        `;

        // Agregar secciones condicionalmente
        if (reporte_parametros.tipo_apoyo !== null) {
            const datos_apoyo = await generarTipoApoyo(reporte_parametros.tipo_apoyo);
    
            const graficaBase64 = fs.readFileSync(datos_apoyo.url, 'base64');

            htmlSections += `
            <div style="text-align: center; font-size: 14px; margin-top: 20px;">Solicitudes por apoyo</div>
              <img src="data:image/png;base64,${graficaBase64}" style="display: block; margin: 20px auto; width: 500px; height: auto;">
              <table class="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nombre Completo</th>
                    <th>CURP</th>
                    <th>Teléfonos</th>
                    <th>Dirección</th>
                    <th>Fecha Captura</th>
                    <th>Apoyo Solicitado</th>
                    <th>Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${datos_apoyo.datos_tabla.map(solicitud => `
                    <tr>
                      <td>${solicitud.no}</td>
                      <td>${solicitud.nombreCompleto}</td>
                      <td>${solicitud.curp}</td>
                      <td>${solicitud.telefonos}</td>
                      <td>${solicitud.direccion}</td>
                      <td>${solicitud.fechaCaptura}</td>
                      <td>${solicitud.apoyoSolicitado}</td>
                      <td>${solicitud.observaciones}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            `;

            fs.unlinkSync(datos_apoyo.url);
        }

        if (reporte_parametros.periodo !== null) {
            const periodo_datos = await generarPeriodo(reporte_parametros.periodo);
            htmlSections += `
            <div style="text-align: center; font-size: 14px; margin-top: 20px;">Solicitudes por periodo</div>
            <div style="text-align: center; font-size: 14px; margin-top: 20px;">Periodo: ${reporte_parametros.periodo.fecha1} a ${reporte_parametros.periodo.fecha2}</div>
              <table class="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nombre Completo</th>
                    <th>CURP</th>
                    <th>Teléfonos</th>
                    <th>Dirección</th>
                    <th>Fecha Captura</th>
                    <th>Apoyo Solicitado</th>
                    <th>Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${periodo_datos.map(solicitud => `
                    <tr>
                      <td>${solicitud.no}</td>
                      <td>${solicitud.nombreCompleto}</td>
                      <td>${solicitud.curp}</td>
                      <td>${solicitud.telefonos}</td>
                      <td>${solicitud.direccion}</td>
                      <td>${solicitud.fechaCaptura}</td>
                      <td>${solicitud.apoyoSolicitado}</td>
                      <td>${solicitud.observaciones}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            `;
        }

        if (reporte_parametros.colonia !== null) {
            const colonia_datos = await generarColonias(reporte_parametros.colonia);
            htmlSections += 
            `
            <div style="text-align: center; font-size: 14px; margin-top: 20px;">Solicitudes por colonia</div>
              <table class="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nombre Completo</th>
                    <th>CURP</th>
                    <th>Teléfonos</th>
                    <th>Dirección</th>
                    <th>Fecha Captura</th>
                    <th>Apoyo Solicitado</th>
                    <th>Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${colonia_datos.map(solicitud => `
                    <tr>
                      <td>${solicitud.no}</td>
                      <td>${solicitud.nombreCompleto}</td>
                      <td>${solicitud.curp}</td>
                      <td>${solicitud.telefonos}</td>
                      <td>${solicitud.direccion}</td>
                      <td>${solicitud.fechaCaptura}</td>
                      <td>${solicitud.apoyoSolicitado}</td>
                      <td>${solicitud.observaciones}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            `;
        }

        if (reporte_parametros.curp !== null) {
            const curp_datos = await generarCurp(reporte_parametros.curp);
            htmlSections += `
            <div style="text-align: center; font-size: 14px; margin-top: 20px;">Solicitudes por curp</div>
            <div style="text-align: center; font-size: 14px; margin-top: 20px;">CURP: ${reporte_parametros.curp}</div>
              <table class="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nombre Completo</th>
                    <th>CURP</th>
                    <th>Teléfonos</th>
                    <th>Dirección</th>
                    <th>Fecha Captura</th>
                    <th>Apoyo Solicitado</th>
                    <th>Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${curp_datos.map(solicitud => `
                    <tr>
                      <td>${solicitud.no}</td>
                      <td>${solicitud.nombreCompleto}</td>
                      <td>${solicitud.curp}</td>
                      <td>${solicitud.telefonos}</td>
                      <td>${solicitud.direccion}</td>
                      <td>${solicitud.fechaCaptura}</td>
                      <td>${solicitud.apoyoSolicitado}</td>
                      <td>${solicitud.observaciones}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            `;
        }

        htmlSections += `
          </body>
          </html>
        `;

        // Genera el PDF con Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlSections, { waitUntil: 'networkidle0' });

        const pdfPath = path.join(tempDir, filename);
        await page.pdf({ path: pdfPath, format: 'A4' });

        await browser.close();

        console.log('PDF generado correctamente.');

        return pdfPath;

    } catch (error) {
        console.error("Error en generarReporte", { error });
        throw new Error("Ha ocurrido un error generando el reporte");
    }
}



async function generarTipoApoyo(tipo_apoyo) {
    try {
        let resultado_consulta;

        if (tipo_apoyo === "Todos") {
            resultado_consulta = await ServicioApoyo.buscarApoyoPorTipo();
        } else {
            const query = { identificador: tipo_apoyo };
            resultado_consulta = await ServicioApoyo.buscarApoyoPersonalizado(query);
        }

        if (!resultado_consulta || resultado_consulta.length === 0) {
            throw new NotFoundError("No se encontraron apoyos para el tipo especificado");
        }

        const ids = resultado_consulta.map(apoyo => apoyo._id);

        const resultado_solicitudes = await ServicioSolicitudes.obtenerSolicitudesPersonalizada({ apoyo_solicitado: { $in: ids } });

        if (!resultado_solicitudes || resultado_solicitudes.length === 0) {
            throw new NotFoundError("No se encontraron solicitudes para los apoyos especificados");
        }

        const idToNameMap = {};
        resultado_consulta.forEach(apoyo => {
            idToNameMap[apoyo._id] = apoyo.nombre;
        });

        const conteo = {};
        resultado_solicitudes.forEach(solicitud => {
            const idApoyo = solicitud.apoyo_solicitado;
            if (conteo[idToNameMap[idApoyo]]) {
                conteo[idToNameMap[idApoyo]]++;
            } else {
                conteo[idToNameMap[idApoyo]] = 1;
            }
        });

        resultado_colonias = await ServicioColonia.obtenerColonias()
        const coloniasDiccionario = resultado_colonias.reduce((diccionario, colonia) => {
            diccionario[colonia._id] = colonia.nombre_colonia
            return diccionario
        }, {})


        const solicitudesTransformadas = resultado_solicitudes.map(solicitud => ({
            no: solicitud.no,
            nombreCompleto: `${solicitud.nombre} ${solicitud.apellido_paterno} ${solicitud.apellido_materno}`,
            curp: solicitud.curp,
            telefonos: solicitud.telefonos.join(', '),
            direccion: `${solicitud.direccion.calle}, ${solicitud.direccion.no_exterior} ${solicitud.direccion.no_interior}, ${coloniasDiccionario[solicitud.direccion.colonia]}, ${solicitud.direccion.municipio}, ${solicitud.direccion.estado}`,
            fechaCaptura: solicitud.fecha_captura.toISOString().split('T')[0], // Formato YYYY-MM-DD
            apoyoSolicitado: idToNameMap[solicitud.apoyo_solicitado] || 'Desconocido',
            observaciones: solicitud.observaciones
        }));

        const url_grafica = await generarGrafica(conteo, "solicitudesapoyo", "Solicitudes recibidas por apoyo");
        return {
            url: url_grafica,
            datos_tabla: solicitudesTransformadas
        }
    } catch (error) {
        Logger.error("Error en generarTipoApoyo", { error });
        throw new InternalServerError("Ha ocurrido un error interno generando el tipo de apoyo");
    }
}



async function generarPeriodo(periodo) {
    try {
        let resultado_solicitudes;
        let resultado_apoyos;
        let resultado_colonias;

        const query = {
            fecha_captura: {
                $gte: new Date(periodo.fecha1),
                $lte: new Date(periodo.fecha2)
            }
        };
        resultado_solicitudes = await ServicioSolicitudes.obtenerSolicitudesPersonalizada(query)
        resultado_apoyos = await ServicioApoyo.buscarApoyoPorTipo()
        resultado_colonias = await ServicioColonia.obtenerColonias()

        // Crear un diccionario para los apoyos por id para facilitar el join
        const apoyosDiccionario = resultado_apoyos.reduce((diccionario, apoyo) => {
            diccionario[apoyo._id] = apoyo.nombre;
            return diccionario;
        }, {});

        const coloniasDiccionario = resultado_colonias.reduce((diccionario, colonia) => {
            diccionario[colonia._id] = colonia.nombre_colonia
            return diccionario
        }, {})

        // Transformar el resultado de la consulta
        const solicitudesTransformadas = resultado_solicitudes.map(solicitud => ({
            no: solicitud.no,
            nombreCompleto: `${solicitud.nombre} ${solicitud.apellido_paterno} ${solicitud.apellido_materno}`,
            curp: solicitud.curp,
            telefonos: solicitud.telefonos.join(', '),
            direccion: `${solicitud.direccion.calle}, ${solicitud.direccion.no_exterior} ${solicitud.direccion.no_interior}, ${coloniasDiccionario[solicitud.direccion.colonia]}, ${solicitud.direccion.municipio}, ${solicitud.direccion.estado}`,
            fechaCaptura: solicitud.fecha_captura.toISOString().split('T')[0], // Formato YYYY-MM-DD
            apoyoSolicitado: apoyosDiccionario[solicitud.apoyo_solicitado] || 'Desconocido',
            observaciones: solicitud.observaciones
        }));

        return solicitudesTransformadas

    } catch (error) {
        throw error
    }
}


async function generarColonias(colonia) {
    try {
        let resultado_solicitudes;
        let resultado_colonias;
        let resultado_apoyos;

        if (colonia === "Todas") {
            resultado_colonias = await ServicioColonia.obtenerColonias()
        } else {
            query = { _id: colonia }
            resultado_colonias = await ServicioColonia.obtenerColoniasPersonalizado(query)
        }

        resultado_solicitudes = await ServicioSolicitudes.obtenerSolicitudes()
        resultado_apoyos = await ServicioApoyo.buscarApoyoPorTipo()

        const conteoColonias = {};
        resultado_colonias.forEach(col => {
            conteoColonias[col._id] = {
                nombre: col.nombre_colonia,
                conteo: 0
            };
        });

        const apoyosDiccionario = resultado_apoyos.reduce((diccionario, apoyo) => {
            diccionario[apoyo._id] = apoyo.nombre;
            return diccionario;
        }, {});

        const coloniasDiccionario = resultado_colonias.reduce((diccionario, colonia) => {
            diccionario[colonia._id] = colonia.nombre_colonia
            return diccionario
        }, {})

        resultado_solicitudes.forEach(solicitud => {
            const coloniaId = solicitud.direccion.colonia.toString();
            if (conteoColonias[coloniaId]) {
                conteoColonias[coloniaId].conteo += 1;
            }
        });

        const solicitudesFiltradas = resultado_solicitudes.filter(solicitud => {
            const coloniaId = solicitud.direccion.colonia.toString();
            return conteoColonias[coloniaId] && conteoColonias[coloniaId].conteo > 0;
        });

        //este es para las graficas
        const coloniasTransformadas = Object.keys(conteoColonias).map(coloniaId => ({
            nombre: conteoColonias[coloniaId].nombre,
            conteo: conteoColonias[coloniaId].conteo
        }));

        const solicitudesTransformadas = solicitudesFiltradas.map(solicitud => ({
            no: solicitud.no,
            nombreCompleto: `${solicitud.nombre} ${solicitud.apellido_paterno} ${solicitud.apellido_materno}`,
            curp: solicitud.curp,
            telefonos: solicitud.telefonos.join(', '),
            direccion: `${solicitud.direccion.calle}, ${solicitud.direccion.no_exterior} ${solicitud.direccion.no_interior}, ${coloniasDiccionario[solicitud.direccion.colonia]}, ${solicitud.direccion.municipio}, ${solicitud.direccion.estado}`,
            fechaCaptura: solicitud.fecha_captura.toISOString().split('T')[0], // Formato YYYY-MM-DD
            apoyoSolicitado: apoyosDiccionario[solicitud.apoyo_solicitado] || 'Desconocido',
            observaciones: solicitud.observaciones
        }));

        return solicitudesTransformadas
    } catch (error) {
        throw error
    }
}


async function generarCurp(curp) {
    try {
        let resultado_solicitudes;
        let resultado_colonias;
        let resultado_apoyos;

        query = { curp: curp }
        resultado_solicitudes = await ServicioSolicitudes.obtenerSolicitudesPersonalizada(query)
        resultado_apoyos = await ServicioApoyo.buscarApoyoPorTipo()
        resultado_colonias = await ServicioColonia.obtenerColonias()


        const apoyosDiccionario = resultado_apoyos.reduce((diccionario, apoyo) => {
            diccionario[apoyo._id] = apoyo.nombre;
            return diccionario;
        }, {});

        const coloniasDiccionario = resultado_colonias.reduce((diccionario, colonia) => {
            diccionario[colonia._id] = colonia.nombre_colonia
            return diccionario
        }, {})

        const solicitudesTransformadas = resultado_solicitudes.map(solicitud => ({
            no: solicitud.no,
            nombreCompleto: `${solicitud.nombre} ${solicitud.apellido_paterno} ${solicitud.apellido_materno}`,
            curp: solicitud.curp,
            telefonos: solicitud.telefonos.join(', '),
            direccion: `${solicitud.direccion.calle}, ${solicitud.direccion.no_exterior} ${solicitud.direccion.no_interior}, ${coloniasDiccionario[solicitud.direccion.colonia]}, ${solicitud.direccion.municipio}, ${solicitud.direccion.estado}`,
            fechaCaptura: solicitud.fecha_captura.toISOString().split('T')[0], // Formato YYYY-MM-DD
            apoyoSolicitado: apoyosDiccionario[solicitud.apoyo_solicitado] || 'Desconocido',
            observaciones: solicitud.observaciones
        }));

        return solicitudesTransformadas
    } catch (error) {
        throw error
    }
}



module.exports = {
    generarGrafica,
    generarReportePDF
};
