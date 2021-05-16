const { argv } = require('./config/yargs');
const datos = require('./controlador/datos');

let comando = argv._[0];

switch (comando) {
    case 'publicar':
        console.log('Publicando los datos estadisticos...');
        let pub = publicar(argv.file, argv.country, argv.years);
        console.log(pub);
        break;
    case 'guardar':
        console.log('Guardando los datos estadisticos...');
        let guar = guardar(argv.file, argv.country, argv.years, argv.out);
        console.log(guar)
        break;
    default:
        console.log('Comando no valido');

}