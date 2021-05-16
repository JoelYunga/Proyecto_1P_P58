const fs = require('fs')
const colors = require("colors");
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
                console.log(`******************************************************************************`.green);
                console.log();
                console.log(`*************************  `.green + `RESULTADOS ESTADISTICOS`.red + `  **************************`.green);
                console.log();
                console.log(`******************************************************************************`.green);
                console.log("| ".bgGreen + "    " + `::::Archivo ${path} cargando correctamente::::`.red);
                for (let i of dato) {
                    if (i.key == "info") {
                        console.log("| ".bgGreen + `     Codigo pais: `.brightCyan + `${i.Codigo}`.brightYellow);
                        console.log("| ".bgGreen + `     Año: `.brightCyan + `${i.Anio}`.brightYellow);
                        console.log("| ".bgGreen + `     Total Suscripciones para  ${i.Codigo}: `.brightCyan + `${i.Suscripcion}`.brightYellow);
                        console.log("| ".bgGreen + `     La media de suscripciones de todos los países es: `.brightYellow + `${i.MediaGlobal}`.brightYellow);
                        console.log("| ".bgGreen + `     ${i.Estado}`.brightCyan);
                    }
                }
                console.log();
                console.log(`**************************************************************************`.green);
                console.log();
                console.log(`******   `.green + `Cinco países por Encima del valor de suscripciones de ${pais}`.red + `   *****`.green);
                console.log();
                console.log(`**************************************************************************`.green);
                console.log();
                for (let i of dato) {
                    if (i.key == "tp5Max") {
                        console.log("| ".bgGreen + `     Pais: `.brightCyan + `${i.Pais}`.brightYellow);
                        console.log("| ".bgGreen + `     Cod: `.brightCyan + `${i.Codigo}`.brightYellow);
                        console.log("| ".bgGreen + `     Suscripciones: `.brightCyan + `${i.Suscripciones}\n`.brightYellow);
                        console.log(`**************************************************************************`.green);
                    }
                }
                console.log();
                console.log(`******  `.green + `Cinco países por Debajo del valor de suscripciones de ${pais}`.red + `  *******`.green);
                console.log();
                console.log(`**************************************************************************`.green);
                console.log();
                for (let i of dato) {
                    if (i.key == "tp5Min") {
                        console.log("| ".bgGreen + `     Pais: `.brightCyan + `${i.Pais}`.brightYellow);
                        console.log("| ".bgGreen + `     Cod: `.brightCyan + `${i.Codigo}`.brightYellow);
                        console.log("| ".bgGreen + `     Suscripciones: `.brightCyan + `${i.Suscripciones}\n`.brightYellow);
                        console.log(`**************************************************************************`.green);
                    }

                }
                console.log();
                console.log(`******  `.green + `TOP 5 de países con suscripciones mas alta en el año ${anio}`.red + `  *******`.green);
                console.log();
                console.log(`**************************************************************************`.green);
                console.log();
                for (let i of dato) {
                    if (i.key == "tp5") {
                        console.log("| ".bgGreen + `     Pais: `.brightCyan + `${i.Pais}`.brightYellow);
                        console.log("| ".bgGreen + `     Suscripciones: `.brightCyan + `${i.Suscripciones}\n`.brightYellow);
                        console.log(`**************************************************************************`.green);
                    }
                }
                console.log();

            }
        })
}

module.exports = {
    publicar
}