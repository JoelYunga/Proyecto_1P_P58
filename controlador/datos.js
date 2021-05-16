const fs = require('fs')
const estadisticas = require('../controlador/estadistica');

async function datos(path, pais, anio) {
    let datos = estadisticas.consultar(path, pais, anio)
    var respuesta = await datos
    return respuesta;
}

async function publicar(path, pais, anio) {
    datos(path, pais, anio)
        .then((dato) => {
            if (dato.length > 0) {
                console.log("--------------------------------------------------------------------------");
                console.log("|" + `\n` + "|" + "    " + `::::Archivo ${path} cargando correctamente::::`);
                for (let i of dato) {
                    if (i.key == "info") {
                        console.log("| " + `     Codigo pais: ` + `${i.Codigo}`);
                        console.log("| " + `     Año: ` + `${i.Anio}`);
                        console.log("| " + `     Total Suscripciones para  ${i.Codigo}: ` + `${i.Suscripcion}`);
                        console.log("| " + `     La media de suscripciones de todos los países es: ` + `${i.MediaGlobal}`);
                        console.log("| " + `     ${i.Estado}`);
                    }
                }
                console.log(`------ Cinco países por Encima del valor de suscripciones de ${pais} -----`);
                for (let i of dato) {
                    if (i.key == "tp5Max") {
                        console.log("| " + `     Pais: ` + `${i.Pais}`);
                        console.log("| " + `     Cod: ` + `${i.Codigo}`);
                        console.log("| " + `     Suscripciones: ` + `${i.Suscripciones}\n` + "| ");
                    }
                }
                console.log(`------ Cinco países por Debajo del valor de suscripciones de ${pais} -----`);
                for (let i of dato) {
                    if (i.key == "tp5Min") {
                        console.log("| " + `     Pais: ` + `${i.Pais}`);
                        console.log("| " + `     Cod: ` + `${i.Codigo}`);
                        console.log("| " + `     Suscripciones: ` + `${i.Suscripciones}\n` + "| ");
                    }

                }
                console.log(`------ TOP 5 de países con suscripciones mas alta en el año ${anio} ----`);
                for (let i of dato) {
                    if (i.key == "tp5") {
                        console.log("| " + `     Pais: ` + `${i.Pais}`);
                        console.log("| " + `     Suscripciones: ` + `${i.Suscripciones}\n` + "| ");
                    }
                }
                console.log(" -----------------------------------------------------------------------------------------");

            }
        })
}

module.exports = {
    publicar
}