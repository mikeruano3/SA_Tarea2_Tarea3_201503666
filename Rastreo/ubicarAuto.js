const express = require("express");
var Auto = require("./auto");
const app = express();
const bodyParser = require("body-parser");
// para parseo de application/json
app.use(bodyParser.json()); 
// para parseo de application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

var listaAutos = [];

/** 
 * RUTA QUE RECIBIRA LA SOLICITUD 
 * param req : se enviará a través de un método POST
 *          la ubicación a la que el cliente quiere ir
 * 
 * 1- idPiloto
 */
app.get('/ubicarAuto/:idPiloto', (req, res) => {
    if(req.params.idPiloto == undefined){
        res.status(500);
        res.send("Algo salió mal!");    
    }
    let idAuto = -1, idPiloto = -1, direccion = "";
    for (let i = 0; i < listaAutos.length; i++) { 
        if(listaAutos[i].idPiloto == req.params.idPiloto){
            idAuto = listaAutos[i].idAuto;
            idPiloto = listaAutos[i].idPiloto;
            direccion = listaAutos[i].direccion;
        }
    }
    let propiedades = { "idAuto": idAuto, "idPiloto": idPiloto, "direccion": direccion};
    res.send(propiedades);
});

function inicializarData() {
    listaAutos = [];
    listaAutos.push(new Auto("Paseo Sexta", 1, 2, "6 av 7 calle"));
    listaAutos.push(new Auto("Mixco", 2, 3, "4 av 7 calle"));
    listaAutos.push(new Auto("Zona 12", 3, 4, "5 av 8 calle"));
    listaAutos.push(new Auto("Zona 4", 4, 5, "7 av 10 calle"));
}

/*** 
 * Iniciar el servidor en puerto 4545
 */
app.listen(303, () => {
    inicializarData();
    console.log("Corriendo -- Servidor de rastreo");
});