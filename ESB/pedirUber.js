// incluir dependencias
const express = require("express");
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");
// para parseo de application/json
app.use(bodyParser.json()); 
// para parseo de application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

/** 
 ** funcion HACERPOST
 * Recibirá una Url a la cual mandar la petición y los datos a mandar
 * retornará los datos de la petición si los datos son correctos, sino retornará un error
 * param 
 * @string Url : la url a la cual mandar la peticion
 * @String postData : los datos a enviar a la Url
 * return
 * @json datosPeticion : devuelve la información después de ejecutar la petición
 */
function hacerPost(url, postDatos){
    let axiosConfig = {headers: {'Content-Type': 'application/json;charset=UTF-8'}};      
    return axios.post(url, postDatos, axiosConfig)
      .then((response) => {
        return {"estado": "OK", "datos": response.data};
      })
      .catch((err) => {
        // aquí se maneja la excepcióngetDatos
        return {"estado": "ERROR", "causa": "No existe respuesta de la URL: "+url};
    });
}

/** 
 ** funcion HACERGET
 * Recibirá una Url a la cual mandar la petición y los datos a mandar
 * retornará los datos de la petición si los datos son correctos, sino retornará un error
 * param 
 * @string Url : la url a la cual mandar la peticion
 * @String getDatos : los datos a enviar a la Url
 * return
 * @json datosPeticion : devuelve la información después de ejecutar la petición
 */
function hacerGet(url, getDatos){
    return axios.get(url, {params: getDatos})
      .then((response) => {
        return {"estado": "OK", "datos": response.data};
      })
      .catch((err) => {
        // aquí se maneja la excepción
        return {"estado": "ERROR", "causa": "No existe respuesta de la URL: "+url};
    });
}

/** 
 ** funcion ubicarAuto
 * Llamará al servicio RASTREO y obtendrá datos del mismo
 * param 
 * @string nombrePiloto : el nombre del piloto del auto
 * @String idAuto : la placa del auto
 * @integer idPiloto : el id del piloto
 * return
 * @json datosPeticion : devuelve la información después de ejecutar la petición
 */
function ubicarAuto(nombrePiloto, idAuto, idPiloto){
    return hacerGet('http://localhost:303/ubicarAuto/'+ idPiloto, "")
        .then((datosAuto) => {
            if(datosAuto.estado == "ERROR"){
                // si hay un error enviarlo
                return datosAuto;
            }
            // si el estado es OK, enviar los datos
            let salida = {"estado": "OK", 
                       "nombrePiloto": nombrePiloto, 
                       "placaAuto": idAuto, 
                       "ubicacionAuto": datosAuto.datos.direccion,
                       "modelo": datosAuto.datos.modelo};
            console.log(salida);
            return salida;
        })
        .catch((err) => { 
            // aquí se maneja la excepción
            return err;
    });
}
/** 
 ** funcion avisarPiloto
 * Llamará al servicio PILOTO y obtendrá datos del mismo
 * param 
 * @string ubicacion : la ubicación donde puede estar el piloto
 * return
 * @json datosPeticion : devuelve la información después de ejecutar la petición
 */
function avisarPiloto(ubicacion){
    return hacerPost('http://localhost:302/avisarPiloto', {"ubicacion": ubicacion})
        .then((datosPiloto) => {
            if(datosPiloto.estado == "ERROR"){
                // si hay un error enviarlo
                return datosPiloto;
            }
            if(datosPiloto.datos.idPiloto == -1){
                // esta excepción se da cuando no hay pilotos en la zona
                return {"estado": "ERROR", "CAUSA": "No existen pilotos en la ubicación"};
            }
            // si el estado es OK, enviar los datos
            let salida = {"estado": "OK", 
                        "nombrePiloto": datosPiloto.datos.nombrePiloto, 
                        "idAuto": datosPiloto.datos.idAuto,
                         "idPiloto": datosPiloto.datos.idPiloto,
                         "modelo": datosPiloto.datos.modelo};
            console.log(salida);
            return salida;
        })
        .catch((err) => { 
            // aquí se maneja la excepción
            return err;
    });
}
/** 
 ** funcion solicitarViaje
 * Llamará al servicio SOLICITUD y obtendrá datos del mismo
 * param 
 * @string ubicacion : la ubicación donde puede estar el piloto
 * return
 * @json datosPeticion : devuelve la información después de ejecutar la petición
 */
function solicitarViaje(ubicacion){
    return hacerPost('http://localhost:301/solicitarViaje', {"ubicacion": ubicacion})
        .then((datosViaje) => {
            if(datosViaje.estado == "ERROR"){
                // si hay un error enviarlo
                return datosViaje;
            }
            if(datosViaje.datos.cantViajes < 1){
                return {"estado": "ERROR", "CAUSA": "No existen viajes en la ubicación"};
            }
            // si el estado es OK, enviar los datos
            let salida = {"estado": "OK", "cantViajes": datosViaje.datos.cantViajes};
            console.log(salida);
            return salida;
        })
        .catch((err) => { 
            return err;   
    });
}
/** 
** metodo POST - pedirUber. 
* Recibirá una ubicación y se determinará si existen viajes en la ruta.
* Posteriormente se consultará la info de algún piloto y su vehículo
* param 
* @string req : contiene la informacion del request
* @String res : contiene los datos de la petición
* return
* @json propiedades : devuelve la información y la ubicación del vehículo
*/
app.post('/pedirUber', (req, res) => {
    if(req.body.ubicacion == undefined){
        res.status(500);
        res.send("No se recibió la ubicación!");  
        return;  
    }

    // con esto se resuelve la asincronidad de las requests
    solicitarViaje(req.body.ubicacion)
    .then((datosViaje) => {
        if(datosViaje.estado == "ERROR"){
            console.log(datosViaje);
            // se envían los datos con error y se detiene la ejecución
            res.send(datosViaje);
            return;
        }
        // si existe un viaje en la ruta se llama al piloto
        avisarPiloto(req.body.ubicacion)
        .then((datosPiloto) => {
            if(datosPiloto.estado == "ERROR"){
                console.log(datosPiloto);
                // se envían los datos con error y se detiene la ejecución
                res.send(datosPiloto);
                return;
            }
            // si existe un piloto en la ruta se consultan los datos del vehículo
            ubicarAuto(datosPiloto.nombrePiloto, datosPiloto.idAuto, datosPiloto.idPiloto)
            .then((datosAuto) =>{
                // si todo va correcto se devuelven los datos de auto
                res.send(datosAuto);
                return;
            });
        });
    })
    // se atrapa la excepción y se manda un error
    .catch((err) => { 
        return {"estado": "ERROR", "CAUSA": "No existen viajes en la ubicación"};
    });
});
/** 
 ** metodo appListen
 * Inicia el servidor para la recepción de datos
 * Simula una base de datos
 * param 
 * @number es el número de puerto en el que se inicia la aplicación
 * return
 */
app.listen(300, () => {
    console.log("Corriendo -- Servidor ESB");
});