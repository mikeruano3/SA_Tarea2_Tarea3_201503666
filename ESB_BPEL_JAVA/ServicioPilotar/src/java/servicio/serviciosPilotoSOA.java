/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servicio;

import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;

/**
 *
 * @author miguel
 */
@WebService(serviceName = "serviciosPilotoSOA")
public class serviciosPilotoSOA {

    /**
     * This is a sample web service operation
     * @param texto
     * @return 
     */
    @WebMethod(operationName = "pedirPiloto")
    public String hello(@WebParam(name = "name") String texto) {
        return "Pidiendo piloto desde " + texto + " !";
    }
}
