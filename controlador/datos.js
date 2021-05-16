const fs = require('fs')
const http = require('http');
const estadisticas = require('../controlador/estadistica');
const hostname = '127.0.0.1';
const port = 3000;

async function datos(path, pais, anio) {
    let datos = estadisticas.consultar(path, pais, anio)
    var respuesta = await datos
    return respuesta;
}