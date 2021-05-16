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
            sucripcion = valor[anio - 1956]
            return sucripcion
        }
    }
}

async function obtenerMedia(pais, anio) {
    let suma = 0;
    let promedio = 0;
    for (var i = 0; i < pais.length; i++) {
        let valor = Object.values(pais[i]);
        let numero = Number(valor[anio - 1956])
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
        suscripcion = Number(dato[anio - 1956]);
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

async function obtenerTop5Min(pais, anio, suscripcionPais) {
    let top = [];
    for (let dato of pais) {
        dato = Object.values(dato);
        suscripcion = Number(dato[anio - 1956]);
        if (Number(suscripcion) > 0) {
            if (suscripcion < suscripcionPais) {
                let datos = {
                    Pais: dato[0],
                    Codigo: dato[1],
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

async function obtenerTop5(pais, anio) {
    let top = [];
    let num = 0;
    for (let dato of pais) {
        dato = Object.values(dato);
        suscripcion = Number(dato[anio - 1956]);
        if (suscripcion > num) {
            let datos = {
                Pais: dato[0],
                Codigo: dato[1],
                Suscripciones: suscripcion
            }
            top.push(datos);

        }
        num = suscripcion;
        top.sort(function(a, b) {
            return (b.Suscripciones - a.Suscripciones)
        })
        top = top.slice(0, 5)
    }
    return top

}

async function consultar(path, codigo, anio) {
    let informacion = [];
    let pais = await obtenerDatos(path);
    if (pais != "Error 200") {
        let Country = await obtenerPais(pais, codigo);
        if (Country == true) {
            if (anio >= 1964 && anio <= 2019) {
                obtenerSuscripciones(pais, codigo, anio)
                    .then((suscripcionPais) => {
                        obtenerMedia(pais, anio, suscripcionPais)
                            .then((media) => {
                                if (media > 0) {
                                    let estado;
                                    if (Number(media) > suscripcionPais) {
                                        estado = `El valor de las sucripciones de ${codigo} es menor a la media mundial.`

                                    } else {
                                        estado = `El valor de las sucripciones de ${codigo} es mayor a la media mundial.`
                                    }
                                    let medi = {
                                        Codigo: codigo,
                                        Anio: anio,
                                        Suscripcion: Number(suscripcionPais),
                                        MediaGlobal: Number(media),
                                        Estado: estado,
                                        key: "info"
                                    }
                                    informacion.push(medi)
                                    obtenerTop5Max(pais, anio, suscripcionPais)
                                        .then((tp5Max) => {
                                            if (tp5Max.length > 0) {
                                                for (let i of tp5Max) {
                                                    let tp5M = {
                                                        Pais: i.Pais,
                                                        Codigo: i.Codigo,
                                                        Suscripciones: i.Suscripciones,
                                                        Descripcion: `Pais por Encima del valor de suscripcion de ${codigo}`,
                                                        key: "tp5Max"
                                                    }
                                                    informacion.push(tp5M)
                                                }
                                            }
                                        })
                                    obtenerTop5Min(pais, anio, suscripcionPais)
                                        .then((tp5Min) => {
                                            if (tp5Min.length > 0) {
                                                for (let i of tp5Min) {
                                                    let tp5 = {
                                                        Pais: i.Pais,
                                                        Codigo: i.Codigo,
                                                        Suscripciones: i.Suscripciones,
                                                        Descripcion: `Pais por Debajo del valor de suscripcion de ${codigo}`,
                                                        key: "tp5Min"

                                                    }
                                                    informacion.push(tp5)
                                                }
                                            }
                                        })
                                    obtenerTop5(pais, anio)
                                        .then((tp5) => {
                                            for (let i of tp5) {
                                                let tp5 = {
                                                    Pais: i.Pais,
                                                    Suscripciones: i.Suscripciones,
                                                    Descripcion: `Top 5 de paises con sucripciones mas altas en el año ${anio}`,
                                                    key: "tp5"
                                                }
                                                informacion.push(tp5)
                                            }
                                            return informacion;
                                        })
                                }
                            })
                    })


            } else {
                console.log('\n    ' + `Al momento no existe registros para el año: ${anio}`);
            }
        } else {
            console.log('\n    ' + `No existe el codigo del pais ${codigo} en la base de datos.`);
        }

    } else {
        console.log('\n    ' + `:::No existe el archivo ${path} " :::`);
    }
    return await informacion;

}

module.exports = {
    consultar
}