/** 
 ** Clase Ruta
 * Contiene información sobre las rutas que se encuentran disponibles en el Uber
 * param 
 * return 
 */
class Ruta {
    /** 
    ** Constructor
    * Recibe la información que se seteará a la clase
    * param 
    * @string _ubicacion: la ubicación del auto
    * @String _noAutosEnUbicacion: los autos que se encuentran en las cercanías
    * return 
    * @class retorna el objeto creado
    */
    constructor(_ubicacion, _noAutosEnUbicacion) {
        this.ubicacion = _ubicacion;
        this.noAutosEnUbicacion = _noAutosEnUbicacion;
    }
}

module.exports = Ruta;