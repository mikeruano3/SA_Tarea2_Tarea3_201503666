// incluir dependencias
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
 ** metodo GET - UbicarAuto. 
 * Recibirá el id del piloto dueño del vehículo y se enviará
 * información sobre la ubicación del mismo
 * param 
 * @string req : contiene la informacion del request
 * @String res : contiene los datos de la petición
 * return
 * @json propiedades : devuelve la información y la ubicación del vehículo
 */
app.get('/ubicarAuto/', (req, res) => {
    if(req.query.id == undefined){
        res.status(500);
        res.send("Algo salió mal!");    
    }
    let datosAuto = new Auto("", 0, "", "", "");
    // se itera hasta encontrar un piloto que coincida con el numero dado
    for (let i = 0; i < listaAutos.length; i++) { 
        if(listaAutos[i].idPiloto == req.query.id){
            datosAuto = listaAutos[i];
        }
    }
    console.log("Auto Ubicado!!!! "+datosAuto.modelo);
    // Devuelve las propiedades encontradas
    let propiedades = { salida: 
                        {"placaAuto": datosAuto.idAuto, 
                        "idPiloto": datosAuto.idPiloto, 
                        "direccion": datosAuto.direccion,
                        "modelo": datosAuto.modelo
                        }
                    };
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
    listaAutos = [];
    listaAutos.push(new Auto("Paseo Sexta", 1, "523123", "6 av 7 calle", "Toyota"));
    listaAutos.push(new Auto("Mixco", 2, "123123", "4 av 7 calle", "Hyunday"));
    listaAutos.push(new Auto("Zona 12", 3, "12321", "5 av 8 calle", "Mercedez"));
    listaAutos.push(new Auto("Zona 4", 4, "23122", "7 av 10 calle", "Ford"));
}

/** 
 ** metodo appListen
 * Inicia el servidor para la recepción de datos
 * Simula una base de datos
 * param 
 * @number es el número de puerto en el que se inicia la aplicación
 * return
 */
app.listen(303, () => {
    inicializarData();
    console.log("Corriendo -- Servidor de rastreo");
});