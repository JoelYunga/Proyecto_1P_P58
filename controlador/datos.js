const fs = require('fs')
const colors = require("colors");
const estadisticas = require('../controlador/estadistica');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;


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
                        console.log("| ".bgGreen + `     Suscripcion de ${i.Codigo} en ${i.Anio}: `.brightCyan + `${i.Suscripcion}`.brightYellow);
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
                let joel = JSON.stringify(dato);
                const server = http.createServer((req, res) => {
                    res.statusCode = 200;
                    res.end(`<html>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
                    <head>
                    <meta charset="UTF-8">
                    <title>Estadisticas</title>
                    <style type="text/css">
                        .tg  {margin: 0 auto; border-collapse:collapse;border-color:#aaa;border-spacing:0;border-style:solid;border-width:1px;}
                        .tg td{background-color:#fff;border-color:#aaa;border-style:solid;border-width:0px;color:#333;
                        font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;}
                        .tg th{background-color:#f38630;border-color:#aaa;border-style:solid;border-width:0px;color:#fff;
                        font-family:Arial, sans-serif;font-size:14px;font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
                        .tg .tg-201p{background-color:#61D061;font-size:14px;font-weight:bold;text-align:left;vertical-align:top}
                        .tg .tg-scrz{background-color:#001B4F;color:#FFFFFF;font-weight:bold;text-align:center;vertical-align:top}
                        .tg .tg-dg7a{background-color:#CCC16E;text-align:left;vertical-align:top}
                        .tg .tg-na3a{font-size:14px;font-weight:bold;text-align:left;vertical-align:top}
                        .tg .tg-0lax{text-align:left;vertical-align:top}
                        .tg .tg-2e0g{background-color:#001B4F;border-color:#000000;color:#FFFFFF;font-weight:bold;text-align:center;vertical-align:top}
                    </style>
                    </head>
                    <body style="background-color:#03074C; color:#FFFFFF;">
                    <h1 style="text-align: center;">PROYECTO PRIMER PARCIAL</h1>
                    <h1 style="text-align: center;">PROGRAMACION WEB</h1>
                    <h3 style="text-align: center;">AUTOR: YUNGA JOEL</h3>
                    <h2 style="text-align: center;">Estadisticas de suscripciones a telefonía celular móvil</h2>
                    <div id="datosPersona" style="text-align:center;">
                    <table class="tg"></table>
                    </div>
                    
                    <script>
                    function cargarDatos(){
                        var Datos = JSON.parse(${JSON.stringify(joel)});
                        $(".tg").append(
                            '<thead>'+
                                '<tr>'+
                                    '<th class="tg-scrz" colspan="2">Datos</th>'+
                                '</tr>'+
                            '</thead>'
                        );
                        $(".tg").append('<tbody>');
                        for(let i of Datos){
                            if (i.key == "info") {
                                $(".tg").append(
                                    '<tr>' +
                                        '<td class="tg-201p">Codigo pais:</td>'+
                                        '<td class="tg-dg7a">' + i.Codigo + '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td class="tg-201p">Año:</td>'+
                                        '<td class="tg-dg7a">' + i.Anio +
                                    '</tr>'+
                                    '<tr>' +
                                        '<td class="tg-201p">'+'Suscripcion de '+i.Codigo+' en ' + i.Anio+'</td>'+
                                        '<td class="tg-dg7a">' + i.Suscripcion + '</td>'+
                                    '</tr>'+
                                    '<tr>'+
                                        '<td class="tg-201p">La media de suscripciones de todos los países es: </td>'+
                                        '<td class="tg-dg7a">' + i.MediaGlobal+
                                    '</tr>'+
                                    '<td class="tg-201p">Estado: </td>'+
                                    '<td class="tg-dg7a">' + i.Estado+
                                '</tr>'
                                );
                            }     
                        }
                        $(".tg").append(
                            '<tr>'+
                                '<td class="tg-2e0g" colspan="2">'+'Cinco países por encima del valor de suscripciones de '+Datos[0].Cod+'</td>'+
                            '</tr>'
                        );
                                    for(let i of Datos){
                                        if (i.key =="tp5Max") {
                                            $(".tg").append(
                                                '<tr>' +
                                                    '<td class="tg-201p">Pais:</td>'+
                                                    '<td class="tg-dg7a">' + i.Pais + '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td class="tg-201p">Suscripciones:</td>'+
                                                    '<td class="tg-dg7a">' + i.Suscripciones +
                                                '</tr>'
                                            );
                                        }
                                    }
                                    $(".tg").append(
                                        '<tr>'+
                                            '<td class="tg-2e0g" colspan="2">'+'Cinco países por DEBAJO del valor de suscripciones de '+Datos[0].Cod+'</td>'+
                                        '</tr>'
                                    );
                                    for(let i of Datos){
                                        if (i.key =="tp5Min") {
                                            if(i.Suscripciones>0){
                                                console.log(i)
                                            }
                                            $(".tg").append(
                                                '<tr>' +
                                                    '<td class="tg-201p">Pais:</td>'+
                                                    '<td class="tg-dg7a">' + i.Pais + '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td class="tg-201p">Suscripciones:</td>'+
                                                    '<td class="tg-dg7a">' + i.Suscripciones +
                                                '</tr>'
                                            );
                                        }
                                    }
                                    $(".tg").append(
                                        '<tr>'+
                                            '<td class="tg-2e0g" colspan="2">'+'TOP 5 de países con suscripciones mas alta en el año '+Datos[0].Anio+'</td>'+
                                        '</tr>'
                                    );
                                    for(let i of Datos){
                                        if (i.key =="tp5") {
                                            $(".tg").append(
                                                '<tr>' +
                                                    '<td class="tg-201p">Pais:</td>'+
                                                    '<td class="tg-dg7a">' + i.Pais + '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td class="tg-201p">Suscripciones:</td>'+
                                                    '<td class="tg-dg7a">' + i.Suscripciones +
                                                '</tr>'
                                            );
                                        } 
                                    }
                        $(".tg").append('</tbody>');
                    }                    
                    </script>
                    <button type="button" onclick="cargarDatos()">
                    Visualizar
                    </button>
                    
                    </body>
                    </html>
                


                    `);
                });
                server.listen(port, hostname, () => {
                    console.log(`Server running at http://${hostname}:${port}`.red);
                });

            } else if (dato.length == 0) {
                console.log(`     No existe paises con suscripcion mayor a cero para el año ${anio}`.red);
            }
        })
}

async function guardar(path, codigo, anio, out) {
    let informacion = [];
    datos(path, codigo, anio)
        .then((dato) => {
            for (let i of dato) {
                if (i.key == "info") {
                    let medi = {
                        Codigo: codigo,
                        Anio: anio,
                        Suscripcion: Number(i.Suscripcion),
                        MediaGlobal: Number(i.MediaGlobal),
                        Estado: i.Estado,
                        key: "info"
                    }
                    informacion.push(medi);
                }
            }
            for (let i of dato) {
                if (i.key == "tp5Max") {
                    let tp5M = {
                        Pais: i.Pais,
                        Codigo: i.Codigo,
                        Suscripciones: i.Suscripciones,
                        Descripcion: `Pais por Encima del valor de suscripcion de ${i.Codigo}`,
                    }
                    informacion.push(tp5M)
                }
            }
            for (let i of dato) {
                if (i.key == "tp5Min") {
                    let tp5min = {
                        Pais: i.Pais,
                        Codigo: i.Codigo,
                        Suscripciones: i.Suscripciones,
                        Descripcion: `País por Debajo del valor de suscripciones de ${i.Codigo}`,
                    }
                    informacion.push(tp5min)
                }
            }
            for (let i of dato) {
                if (i.key == "tp5") {
                    let tp5 = {
                        Pais: i.Pais,
                        Suscripciones: i.Suscripciones,
                        Descripcion: `TOP 5 de países con suscripciones mas alta en el año ${anio}`,
                    }
                    informacion.push(tp5)
                }
            }
            fs.writeFileSync(`./data/${out}.json`, JSON.stringify(informacion));
            console.log("Informacion guardada".bgGreen);
        })
}

module.exports = {
    publicar,
    guardar
}