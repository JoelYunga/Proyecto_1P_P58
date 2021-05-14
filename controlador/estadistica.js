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