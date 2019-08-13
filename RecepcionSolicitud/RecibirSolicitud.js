const express = require("express");
const app = express();

app.get('/', (req, res) => {

});

app.listen(4545, () => {
    console.log("Corriendo -- Servidor de recepción de solicitudes");
});