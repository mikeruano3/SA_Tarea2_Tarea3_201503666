const axios = require("axios");
const bodyParser = require("body-parser");
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
        return {"estado": "ERROR", "causa": "No existe respuesta de la URL: "+url+ " " +err};
    });
}
/** 
 ** funcion ejecutar HACERPOST
 * Se indicará una Url a la cual mandar la petición y los datos a mandar
 * imprimirá los datos de la petición si los datos son correctos, sino retornará un error
 */
const Url = 'http://localhost:300/pedirUber/';
const body = {"ubicacion": "Mixco"};
hacerPost(Url, body)
    .then((datosUber) => {
        if(datosUber.estado == "ERROR"){
            // imprimir los datos del UBER pedido
            console.log(datosUber.causa);
            return;
        }
        console.log(datosUber.datos);
        return;
    })
    .catch((err) => { 
        return err;
    }
);