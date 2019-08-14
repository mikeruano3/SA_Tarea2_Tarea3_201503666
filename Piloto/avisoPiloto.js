const express = require("express");
var Piloto = require("./piloto");
const app = express();
const bodyParser = require("body-parser");
// para parseo de application/json
app.use(bodyParser.json()); 
// para parseo de application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

var listaPilotos = [];

/** 
 * RUTA QUE RECIBIRA LA SOLICITUD 
 * param req : se enviará a través de un método POST
 *          la ubicación a la que el cliente quiere ir
 * PARAM QUE RECIBE:
 * ubicacion
 */
app.post('/avisarPiloto', (req, res) => {
    if(req.body.ubicacion == undefined){
        res.status(500);
        res.send("Algo salió mal!");    
    }
    let idAuto = -1, idPiloto = -1, nombrePiloto = "";
    for (let i = 0; i < listaPilotos.length; i++) { 
        if(listaPilotos[i].ubicacion.toString().toLowerCase() == req.body.ubicacion.toLowerCase()){
            idAuto = listaPilotos[i].idAuto;
            idPiloto = listaPilotos[i].idPiloto;
            nombrePiloto = listaPilotos[i].nombrePiloto;
        }
    }
    console.log("Enviando mensaje al piloto!!!!");
    let propiedades = { "idAuto": idAuto, "idPiloto": idPiloto, "nombrePiloto": nombrePiloto };
    res.send(propiedades);
});

function inicializarData() {
    listaPilotos = [];
    listaPilotos.push(new Piloto("Paseo Sexta", 1, 2, "Pedro"));
    listaPilotos.push(new Piloto("Mixco", 2, 3, "Juan"));
    listaPilotos.push(new Piloto("Zona 12", 3, 4, "Jorge"));
    listaPilotos.push(new Piloto("Zona 4", 4, 5, "Augusto"));
}

/*** 
 * Iniciar el servidor en puerto 4545
 */
app.listen(302, () => {
    inicializarData();
    console.log("Corriendo -- Servidor de aviso al piloto");
});