const fs = require('fs');
const colors = require("colors");
const csv = require("csvtojson");

async function obtenerDatos(file) {
    try {
        const datos = await csv().fromFile(file);
        let data = [];
        var codes = JSON.parse(fs.readFileSync('./data/ISO-3166-ALPHA-3.json', 'utf8'));
        for (let dat of datos) {
            dat = Object.values(dat);
            for (let cod of codes) {
                if (dat[1] == cod.countryCode) {
                    data.push(dat);
                }
            }
        }

        return data;
    } catch (e) {
        e = "Error 200"
        return e
    }
}

async function obtenerPais(pais, codigo) {
    for (var i = 0; i < pais.length; i++) {
        let valor = Object.values(pais[i]);
        if (valor[1] == codigo) {
            return true
        }
    }
}

async function obtenerSuscripciones(pais, codigo, anio) {
    for (var i = 0; i < pais.length; i++) {
        let valor = Object.values(pais[i]);
        if (valor[1] == codigo) {
            sucripcion = valor[anio - 1960]
            return sucripcion
        }
    }
}

async function obtenerMedia(pais, anio) {
    let suma = 0;
    let promedio = 0;
    for (var i = 0; i < pais.length; i++) {
        let valor = Object.values(pais[i]);
        let numero = Number(valor[anio - 1960])
        if (numero > 0) {
            promedio++;
            suma = suma + numero;
        }
    }
    if (promedio > 0) {
        promedio = (suma / promedio).toFixed(3)
        return promedio
    } else {
        return 0
    }
}

async function obtenerTop5Max(pais, anio, suscripcionPais) {
    let top = [];
    for (let dato of pais) {
        dato = Object.values(dato);
        suscripcion = Number(dato[anio - 1960]);
        if (suscripcion > suscripcionPais) {
            let datos = {
                Pais: dato[0],
                Codigo: dato[1],
                Suscripciones: suscripcion,
            }
            top.push(datos);
        }
        top.sort(function(a, b) {
            return (a.Suscripciones - b.Suscripciones)
        })
        top = top.slice(0, 5)
    }
    return top
}

async function ObtenerTop5Min(pais, anio, suscripcionPais) {
    let top = [];
    for (let dato of pais) {
        dato = Object.values(dato);
        suscripcion = Number(dato[anio - 1960]);
        if (Number(suscripcion) > 0) {
            if (suscripcion < suscripcionPais) {
                let datos = {
                    Pais: datos[0],
                    Codigo: datos[1],
                    Suscripciones: suscripcion,
                }
                top.push(datos);
            }
            top.sort(function(a, b) {
                return (b.Suscripciones - a.Suscripciones)
            })
            top = top.slice(0, 5)
        }
    }
    return top
}