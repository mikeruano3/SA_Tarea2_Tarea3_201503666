// incluir dependencias
const express = require("express");
var Ruta = require("./ruta");
const app = express();
const bodyParser = require("body-parser");
// para parseo de application/json
app.use(bodyParser.json()); 
// para parseo de application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

var listaRutas = [];

/** 
 ** metodo POST - SolicitarViaje. 
 * Recibirá la ubicación a la cual mandar el nuevo UBER
 * param 
 * @string req : contiene la informacion del request
 * @String res : contiene los datos de la petición
 * return
 * @json propiedades : devuelve la cantidad de viajes para la ubicación
 */
app.get('/solicitarViaje', (req, res) => {
    if(req.query.ubicacion == undefined){
        res.status(500);
        res.send("Algo salió mal!");    
    }
    let cantViajes = -1;
    // se itera hasta encontrar un viaje en la ruta indicada
    for (let i = 0; i < listaRutas.length; i++) { 
        // Compara para saber si existe algún viaje en la ruta indicada
        if(listaRutas[i].ubicacion.toString().toLowerCase() == req.query.ubicacion.toLowerCase()){
            cantViajes = listaRutas[i].noAutosEnUbicacion;
        }
    }
    console.log("Viaje Solicitado "+req.query.ubicacion);
    // Se devuelve el numero de viajes
    var propiedades = { "cantViajes": cantViajes };
    res.send(propiedades);
});

/** 
 ** metodo inicializarData
 * Crea una lista con los datos que se manejarán
 * Simula una base de datos
 * param 
 * return
 * @array rutas : devuelve una lista con los objetos Ruta generados.
 */
function inicializarData() {
    let rutas = [];
    rutas.push(new Ruta("Paseo Sexta", 20));
    rutas.push(new Ruta("Mixco", 40));
    rutas.push(new Ruta("Zona 12", 4));
    rutas.push(new Ruta("Zona 4", 10));
    return rutas;
}

/** 
 ** metodo appListen
 * Inicia el servidor para la recepción de datos
 * Simula una base de datos
 * param 
 * @number es el número de puerto en el que se inicia la aplicación
 * return
 */
app.listen(301, () => {
    listaRutas = inicializarData(); // se simula la bases de datos
    console.log("Corriendo -- Servidor de recepción de solicitudes");
});