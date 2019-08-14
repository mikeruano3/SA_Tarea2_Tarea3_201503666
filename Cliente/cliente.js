const axios = require("axios");
const bodyParser = require("body-parser");

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

