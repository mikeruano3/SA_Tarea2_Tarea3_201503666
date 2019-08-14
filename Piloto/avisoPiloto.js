// incluir dependencias
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
 ** metodo POST - AvisarPiloto. 
 * Recibirá una ubicación y devolverá un número de piloto al
 * que se llamará posteriormente para iniciar el viaje
 * param 
 * @string req : contiene la informacion del request
 * @String res : contiene los datos de la petición
 * return
 * @json propiedades : devuelve el id y el nombre del piloto
 * para proseguir con el viaje
 */
app.post('/avisarPiloto', (req, res) => {
    if(req.body.ubicacion == undefined){
        res.status(500);
        res.send("Algo salió mal!");    
    }
    // se itera hasta encontrar un piloto que coincida con la ubicación dada
    let idAuto = -1, idPiloto = -1, nombrePiloto = "";
    for (let i = 0; i < listaPilotos.length; i++) { 
        if(listaPilotos[i].ubicacion.toString().toLowerCase() == req.body.ubicacion.toLowerCase()){
            idAuto = listaPilotos[i].idAuto;
            idPiloto = listaPilotos[i].idPiloto;
            nombrePiloto = listaPilotos[i].nombrePiloto;
        }
    }
    // Devuelve las propiedades encontradas
    console.log("Enviando mensaje al piloto!!!!");
    let propiedades = { "idAuto": idAuto, "idPiloto": idPiloto, "nombrePiloto": nombrePiloto };
    res.send(propiedades);
});

/** 
 ** metodo inicializarData
 * Crea una lista con los datos que se manejarán
 * Simula una base de datos
 * param 
 * return
 */
function inicializarData() {
    listaPilotos = [];
    // ubicacion, idPiloto, idAuto, NombrePiloto
    listaPilotos.push(new Piloto("Paseo Sexta", 1, 2, "Pedro"));
    listaPilotos.push(new Piloto("Mixco", 2, 3, "Juan"));
    listaPilotos.push(new Piloto("Zona 12", 3, 4, "Jorge"));
    listaPilotos.push(new Piloto("Zona 4", 4, 5, "Augusto"));
}

/** 
 ** metodo appListen
 * Inicia el servidor para la recepción de datos
 * Simula una base de datos
 * param 
 * @number es el número de puerto en el que se inicia la aplicación
 * return
 */
app.listen(302, () => {
    inicializarData();
    console.log("Corriendo -- Servidor de aviso al piloto");
});