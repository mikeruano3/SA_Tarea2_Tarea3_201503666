/** 
 ** Clase Auto
 * Contiene información sobre los autos que se encuentran disponibles en el Uber
 * param 
 * return 
 */
class Auto {
     /** 
    ** Constructor
    * Recibe la información que se seteará a la clase
    * param 
    * @string _ubicacion: la ubicación del auto
    * @integer _idPiloto: el identificador el piloto del auto
    * @String _idAuto: el identificador del auto, placa
    * @String _direccion: la direccion exacta del auto
    * @String _modelo: el modelo del auto
    * return 
    * @class retorna el objeto creado
    */
    constructor(_ubicacion, _idPiloto, _idAuto, _direccion, _modelo) {
        this.ubicacion = _ubicacion;
        this.idPiloto = _idPiloto;
        this.idAuto = _idAuto;
        this.direccion = _direccion;
        this.modelo = _modelo;
    }
}
module.exports = Auto;