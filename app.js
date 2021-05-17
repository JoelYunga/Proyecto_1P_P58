const argv = require('./config/yargs').argv;
const datos = require('./controlador/datos');
const estadistica = require('./controlador/estadistica');
const csv = require("csvtojson");

let comando = argv._[0];

switch (comando) {
    case 'publicar':
        console.log('Publicando los datos estadisticos...');
        let pub = datos.publicar(argv.file, argv.country, argv.years);
        console.log(pub);
        break;
    case 'guardar':
        console.log('Guardando los datos estadisticos...');
        let guar = datos.guardar(argv.file, argv.country, argv.years, argv.out);
        console.log(guar);
        break;
    default:
        console.log('Comando no valido');

}