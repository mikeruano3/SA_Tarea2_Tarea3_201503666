const express = require("express");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");
// para parseo de application/json
app.use(bodyParser.json()); 
// para parseo de application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 
/** 
 * RUTA QUE RECIBIRA LA SOLICITUD 
 * param req : se enviará a través de un método POST
 *          la ubicación a la que el cliente quiere ir
 * 
 * 1- ubicacion
 */

function hacerPost(url, postDatos){
    let axiosConfig = {headers: {'Content-Type': 'application/json;charset=UTF-8'}};      
    return axios.post(url, postDatos, axiosConfig)
      .then((response) => {
        return {"estado": "OK", "datos": response.data};
      })
      .catch((err) => {
        return {"estado": "ERROR", "causa": "No existe respuesta de la URL: "+url};
    });
}

function hacerGet(url, getDatos){
    return axios.get(url, {params: getDatos})
      .then((response) => {
        return {"estado": "OK", "datos": response.data};
      })
      .catch((err) => {
        return {"estado": "ERROR", "causa": "No existe respuesta de la URL: "+url};
    });
}

function ubicarAuto(nombrePiloto, idAuto, idPiloto){
    return hacerGet('http://localhost:303/ubicarAuto/'+ idPiloto, "")
        .then((datosAuto) => {
            if(datosAuto.estado == "ERROR"){
                return datosAuto;
            }
            let salida = {"estado": "OK", 
                "nombrePiloto": nombrePiloto, "placaAuto": idAuto, "ubicacionAuto": datosAuto.datos.direccion};
            console.log(salida);
            return salida;
        })
        .catch((err) => { 
            return err;
    });
}

function avisarPiloto(ubicacion){
    return hacerPost('http://localhost:302/avisarPiloto', {"ubicacion": ubicacion})
        .then((datosPiloto) => {
            if(datosPiloto.estado == "ERROR"){
                return datosPiloto;
            }
            if(datosPiloto.datos.idPiloto == -1){
                return {"estado": "ERROR", "CAUSA": "No existen pilotos en la ubicación"};
            }

            let salida = {"estado": "OK", 
                        "nombrePiloto": datosPiloto.datos.nombrePiloto, 
                        "idAuto": datosPiloto.datos.idAuto,
                         "idPiloto": datosPiloto.datos.idPiloto};
            console.log(salida);
            return salida;
        })
        .catch((err) => { 
            return err;
    });
}

function solicitarViaje(ubicacion){
    return hacerPost('http://localhost:301/solicitarViaje', {"ubicacion": ubicacion})
        .then((datosViaje) => {
            if(datosViaje.estado == "ERROR"){
                return datosViaje;
            }
            if(datosViaje.datos.cantViajes < 1){
                return {"estado": "ERROR", "CAUSA": "No existen viajes en la ubicación"};
            }
            let salida = {"estado": "OK", "cantViajes": datosViaje.datos.cantViajes};
            console.log(salida);
            return salida;
        })
        .catch((err) => { 
            return err;   
    });
}

app.post('/pedirUber', (req, res) => {
    if(req.body.ubicacion == undefined){
        res.status(500);
        res.send("No se recibió la ubicación!");  
        return;  
    }

    solicitarViaje(req.body.ubicacion)
    .then((datosViaje) => {
        if(datosViaje.estado == "ERROR"){
            console.log(datosViaje);
            res.send(datosViaje);
            return;
        }
        avisarPiloto(req.body.ubicacion)
        .then((datosPiloto) => {
            if(datosPiloto.estado == "ERROR"){
                console.log(datosPiloto);
                res.send(datosPiloto);
                return;
            }
            ubicarAuto(datosPiloto.nombrePiloto, datosPiloto.idAuto, datosPiloto.idPiloto)
            .then((datosAuto) =>{
                res.send(datosAuto);
                return;
            });
        });
    })
    .catch((err) => { 
        return {"estado": "ERROR", "CAUSA": "No existen viajes en la ubicación"};
    });
});
/*** 
 * Iniciar el servidor en puerto 4545
 */
app.listen(80, () => {
    console.log("Corriendo -- Servidor ESB");
});