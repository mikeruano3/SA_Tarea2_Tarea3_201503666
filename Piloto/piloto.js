
/** 
 ** Clase Piloto
 * Contiene información sobre los pilotos que usan Uber
 * param 
 * return 
 */
class Piloto {
    /** 
     ** Constructor
    * Recibe la información que se seteará a la clase
    * param 
    * @string _ubicacion: la ubicación del auto
    * @integer _idPiloto: el identificador el piloto del auto
    * @String _idAuto: el identificador del auto, placa
    * @String _nombrePiloto: el nombre del piloto
    * return 
    * @class retorna el objeto creado
    */
    constructor(_ubicacion, _idPiloto, _idAuto, _nombrePiloto) {
        this.ubicacion = _ubicacion;
        this.idPiloto = _idPiloto;
        this.idAuto = _idAuto;
        this.nombrePiloto = _nombrePiloto
    }
}

module.exports = Piloto;