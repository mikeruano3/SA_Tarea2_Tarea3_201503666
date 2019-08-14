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
 * RUTA QUE RECIBIRA LA SOLICITUD 
 * param req : se enviará a través de un método POST
 *          la ubicación a la que el cliente quiere ir
 * 
 * 1- ubicacion
 */
app.post('/solicitarViaje', (req, res) => {
    if(req.body.ubicacion == undefined){
        res.status(500);
        res.send("Algo salió mal!");    
    }
    let cantViajes = -1;
    for (let i = 0; i < listaRutas.length; i++) { 
        if(listaRutas[i].ubicacion.toString().toLowerCase() == req.body.ubicacion.toLowerCase()){
            cantViajes = listaRutas[i].noAutosEnUbicacion;
        }
    }
    var propiedades = { "cantViajes": cantViajes };
    res.send(propiedades);
});

function inicializarData() {
    let rutas = [];
    rutas.push(new Ruta("Paseo Sexta", 20));
    rutas.push(new Ruta("Mixco", 40));
    rutas.push(new Ruta("Zona 12", 4));
    rutas.push(new Ruta("Zona 4", 10));
    return rutas;
}

/*** 
 * Iniciar el servidor en puerto 4545
 */
app.listen(301, () => {
    listaRutas = inicializarData();
    console.log("Corriendo -- Servidor de recepción de solicitudes");
});